// src/lib/server.ts
var json = (data, status = 200) => Response.json(data, { status });
var handle = (fn) => async (ctx) => {
  try {
    return await fn(ctx);
  } catch (e) {
    console.error(e);
    return json({ message: "\uC11C\uBC84 \uC624\uB958\uB85C \uCC98\uB9AC\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4. \uC7A0\uC2DC \uD6C4 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694." }, 500);
  }
};
var ORDER_ID = /^[A-Za-z0-9_-]{6,64}$/;
var identity = (env, action, body) => fetch(`https://identitytoolkit.googleapis.com/v1/accounts:${action}?key=${env.FIREBASE_API_KEY}`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) }).then((r) => r.json());
async function serverToken(env) {
  const r = await identity(env, "signInWithPassword", { email: env.LW_SERVER_EMAIL, password: env.LW_SERVER_PASSWORD, returnSecureToken: true });
  if (typeof r.idToken !== "string") throw new Error("\uC11C\uBC84 \uACC4\uC815 \uB85C\uADF8\uC778 \uC2E4\uD328");
  return r.idToken;
}
async function callerUid(env, request) {
  const token = request.headers.get("authorization")?.replace(/^Bearer /, "");
  if (!token) return null;
  const r = await identity(env, "lookup", { idToken: token });
  return r.users?.[0]?.localId ?? null;
}
function toValue(v) {
  if (v === null || v === void 0) return { nullValue: null };
  if (v instanceof Date) return { timestampValue: v.toISOString() };
  if (typeof v === "string") return { stringValue: v };
  if (typeof v === "boolean") return { booleanValue: v };
  if (typeof v === "number") return Number.isInteger(v) ? { integerValue: String(v) } : { doubleValue: v };
  if (Array.isArray(v)) return { arrayValue: { values: v.map(toValue) } };
  return { mapValue: { fields: toFields(v) } };
}
var toFields = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, toValue(v)]));
function fromValue(v) {
  if ("integerValue" in v) return Number(v.integerValue);
  if ("doubleValue" in v) return v.doubleValue;
  if ("arrayValue" in v) return (v.arrayValue.values ?? []).map(fromValue);
  if ("mapValue" in v) return fromFields(v.mapValue.fields ?? {});
  return Object.values(v)[0];
}
var fromFields = (f) => Object.fromEntries(Object.entries(f).map(([k, v]) => [k, fromValue(v)]));
var docUrl = (env, path) => `https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents/${path}`;
async function getDoc(env, token, path) {
  const r = await fetch(docUrl(env, path), { headers: { authorization: `Bearer ${token}` } });
  if (r.status === 404) return null;
  if (!r.ok) throw new Error(`Firestore \uC77D\uAE30 \uC2E4\uD328 ${r.status}`);
  return fromFields((await r.json()).fields);
}
async function patchDoc(env, token, path, data) {
  const mask = Object.keys(data).map((k) => `updateMask.fieldPaths=${k}`).join("&");
  const r = await fetch(`${docUrl(env, path)}?${mask}&currentDocument.exists=true`, {
    method: "PATCH",
    headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
    body: JSON.stringify({ fields: toFields(data) })
  });
  if (!r.ok) throw new Error(`Firestore \uC4F0\uAE30 \uC2E4\uD328 ${r.status}`);
}
async function toss(env, path, body) {
  const r = await fetch(`https://api.tosspayments.com${path}`, {
    method: "POST",
    headers: { authorization: `Basic ${btoa(env.TOSS_SECRET_KEY + ":")}`, "content-type": "application/json" },
    body: JSON.stringify(body)
  });
  return { ok: r.ok, status: r.status, data: await r.json() };
}

// functions/api/cancel.ts
var onRequestPost = handle(async ({ request, env }) => {
  const uid = await callerUid(env, request);
  if (!uid || !env.ADMIN_UIDS.split(",").includes(uid)) return json({ message: "\uAD00\uB9AC\uC790\uB9CC \uD658\uBD88\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4." }, 403);
  const body = await request.json().catch(() => null);
  const { orderId, reason } = body ?? {};
  if (typeof orderId !== "string" || !ORDER_ID.test(orderId) || typeof reason !== "string" || !reason.trim() || reason.length > 200) {
    return json({ message: "\uC8FC\uBB38\uBC88\uD638\uC640 \uCDE8\uC18C \uC0AC\uC720\uB97C \uD655\uC778\uD574 \uC8FC\uC138\uC694." }, 400);
  }
  const token = await serverToken(env);
  const path = `lwOrders/${orderId}`;
  const order = await getDoc(env, token, path);
  const paymentKey = order?.payment?.paymentKey;
  if (!order || !paymentKey) return json({ message: "\uACB0\uC81C\uB41C \uC8FC\uBB38\uC774 \uC544\uB2D9\uB2C8\uB2E4." }, 404);
  if (!["paid", "preparing", "shipping", "delivered"].includes(order.status)) return json({ message: "\uC774\uBBF8 \uCDE8\uC18C\uB41C \uC8FC\uBB38\uC785\uB2C8\uB2E4." }, 409);
  const res = await toss(env, `/v1/payments/${encodeURIComponent(paymentKey)}/cancel`, { cancelReason: reason.trim() });
  if (!res.ok && res.data.code !== "ALREADY_CANCELED_PAYMENT") return json({ message: res.data.message ?? "\uD658\uBD88\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.", code: res.data.code }, res.status);
  await patchDoc(env, token, path, { status: "cancelled", cancel: { reason: reason.trim(), at: (/* @__PURE__ */ new Date()).toISOString() }, updatedAt: /* @__PURE__ */ new Date() });
  return json({ ok: true });
});
export {
  onRequestPost
};
