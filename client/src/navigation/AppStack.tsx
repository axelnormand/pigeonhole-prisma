import React, { useState, useContext, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from '../screens/Login';
import { MainStack } from './MainStack';
import { observer } from 'mobx-react';
import { StoreContext } from '../models';
import { getBearerToken } from '../graphql/init';
import { setTokenInHeader } from '../graphql/client';
import { CentreScreen } from '../comps/CentreScreen';
import { Spinner } from '@ui-kitten/components';

export type AppStackParams = {
  Login: undefined;
  Home: undefined;
};

const Stack = createStackNavigator<AppStackParams>();

export const AppStack = observer(() => {
  const store = useContext(StoreContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      store.
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    return (
      <CentreScreen>
        <Spinner size="giant" />
      </CentreScreen>
    );
  }

  return (
    <Stack.Navigator headerMode="none">
      {isAuthorized ? (
        <Stack.Screen name="Home" component={MainStack} />
      ) : (
        <Stack.Screen name="Login" component={Login} />
      )}
    </Stack.Navigator>
  );
});
