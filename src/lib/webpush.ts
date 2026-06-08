import webpush from "web-push";

console.log({

 email:
 process.env.VAPID_EMAIL,

 public:
 process.env.VAPID_PUBLIC_KEY,

 private:
 process.env.VAPID_PRIVATE_KEY

});

webpush.setVapidDetails(

 process.env.VAPID_EMAIL!,

 process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,

 process.env.VAPID_PRIVATE_KEY!

);

export default webpush;