const VAPID_PUBLIC_KEY =
  "BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk";

export async function requestPermissionAndSubscribe(token) {
  if (!("serviceWorker" in navigator)) {
    console.error("Service Worker tidak didukung");
    return;
  }

  const registration = await navigator.serviceWorker.register(
    "/service-worker.js"
  );
  const permission = await Notification.requestPermission();

  if (permission !== "granted") {
    throw new Error("Izin notifikasi ditolak");
  }

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
  });

  const payload = {
    endpoint: subscription.endpoint,
    keys: {
      p256dh: subscription.toJSON().keys.p256dh,
      auth: subscription.toJSON().keys.auth,
    },
  };

  await fetch("https://story-api.dicoding.dev/v1/notifications/subscribe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
}

export async function unsubscribePush() {
  if (!("serviceWorker" in navigator)) {
    console.error("Service Worker tidak didukung");
    return;
  }

  const registration = await navigator.serviceWorker.getRegistration();
  if (!registration) {
    console.error("Service Worker belum terdaftar");
    return;
  }

  const subscription = await registration.pushManager.getSubscription();
  if (subscription) {
    await subscription.unsubscribe();
    console.log("Berhasil berhenti berlangganan notifikasi");
  } else {
    console.log("Belum ada langganan notifikasi yang aktif");
  }
}

export async function checkPushSubscription() {
  if (!("serviceWorker" in navigator)) return false;

  const registration = await navigator.serviceWorker.getRegistration();
  if (!registration) return false;

  const subscription = await registration.pushManager.getSubscription();
  return !!subscription;
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i)
    outputArray[i] = rawData.charCodeAt(i);

  return outputArray;
}
