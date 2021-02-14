import React, { useContext, useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { observer } from 'mobx-react';
import { StoreContext } from '../models';
import { Login } from '../screens/Login';
import { CentreLoadingPage } from '../comps/CentreLoadingPage';
import { MainDrawer } from './MainDrawer';
import { usePushToken } from '../hooks/usePushToken';

export type AppStackParams = {
  Login: undefined;
  Home: undefined;
};

const Stack = createStackNavigator<AppStackParams>();

export const AppStack = observer(() => {
  const [isLoading, setIsLoading] = useState(true);
  const { loading: pushLoading } = usePushToken();
  const store = useContext(StoreContext);

  useEffect(() => {
    (async () => {
      await store.loadToken();
      setIsLoading(false);
    })();
  }, []);

  console.log(
    `Render AppStack isLoading: ${isLoading}, store.isAuthorized ${store.isAuthorized}`,
  );

  if (isLoading || pushLoading) {
    return <CentreLoadingPage />;
  }

  return (
    <Stack.Navigator headerMode="none">
      {store.isAuthorized ? (
        <Stack.Screen name="Home" component={MainDrawer} />
      ) : (
        <Stack.Screen name="Login" component={Login} />
      )}
    </Stack.Navigator>
  );
});
