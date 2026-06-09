function urlBase64ToUint8Array(base64: string) {
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  
  const safe = (base64 + padding).replace(/\-/g, "+").replace(/_/g, "/");
  
  const raw = window.atob(safe);
  
  return Uint8Array.from([...raw].map((char) => char.charCodeAt(0)));
}

export async function subscribePush(employeeId: string) {
  if (!("serviceWorker" in navigator)) return;
  
  const permission = await Notification.requestPermission();
  
  if (permission !== "granted") return;
  
  await navigator.serviceWorker.register("/sw.js");
  
  const registration = await navigator.serviceWorker.ready;
  
  const existing = await registration.pushManager.getSubscription();
  
  if (existing) {
    return existing;
  }
  
 
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    
    applicationServerKey: urlBase64ToUint8Array(
      process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
    ),
  });

  await fetch("/api/push/subscribe", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      employeeId,

      endpoint: subscription.endpoint,

      keys: subscription.toJSON().keys,
    }),
  });

  return subscription;
}
