export type PushMessage = {
  pushToken: string;
  title: string;
  body: string;
  data?: object;
};

/**  Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/notifications */
export const sendPushNotification = async ({ pushToken,title,body,data }: PushMessage) => {
  const message = {
    to: pushToken,
    sound: "default",
    title,
    body,
    data,
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
};
