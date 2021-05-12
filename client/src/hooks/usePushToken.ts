import * as Notifications from 'expo-notifications';
import { useContext, useEffect, useRef, useState } from 'react';
import { registerForPushNotifications } from '../services/push';
import { Subscription } from '@unimodules/core';
import { StoreContext } from '../models';

/** registers for push notifications */
export const usePushToken = () => {
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | undefined>();
  const store = useContext(StoreContext);

  useEffect(() => {
    (async () => {
      const token = await registerForPushNotifications();
      setLoading(false);
      setToken(token);

      if (token) {
        console.log(`calling mutateUpdatePushToken ${token}`);
        await store.mutateUpdatePushToken({ token });

        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(
          (notification) => {
            console.log(`Push notification in foreground`, { notification });
          },
        );

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(
          (response) => {
            console.log(`Push notification tapped`, { response });
          },
        );
      }
    })();

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current,
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);
  return { loading, token };
};
