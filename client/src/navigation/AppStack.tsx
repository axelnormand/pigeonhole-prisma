import React, { useContext, useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MainStack } from './MainStack';
import { observer } from 'mobx-react';
import { StoreContext } from '../models';
import { Login } from '../screens/Login';
import { CentreLoadingPage } from '../comps/CentreLoadingPage';

export type AppStackParams = {
  Login: undefined;
  Home: undefined;
};

const Stack = createStackNavigator<AppStackParams>();

export const AppStack = observer(() => {
  const [isLoading, setIsLoading] = useState(true);
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

  if (isLoading) {
    return <CentreLoadingPage />;
  }

  return (
    <Stack.Navigator headerMode="none">
      {store.isAuthorized ? (
        <Stack.Screen name="Home" component={MainStack} />
      ) : (
        <Stack.Screen name="Login" component={Login} />
      )}
    </Stack.Navigator>
  );
});
