self.addEventListener(
  "push",
  event => {

    let data = {
      title:"Notification",
      body:"Bạn có thông báo mới"
    };

    try{

      data =
      event.data.json();

    }

    catch{

      data.body =
      event.data?.text?.() ??
      data.body;

    }

    event.waitUntil(

      self.registration
      .showNotification(
        data.title,
        {
          body:data.body,
          icon:"/logo.png"
        }
      )

    );

  }
);