import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Spinner } from '@ui-kitten/components';
import { MainStack } from './MainStack';
import { observer } from 'mobx-react';
import { useQuery } from '../models';
import { CentreScreen } from '../comps/CentreScreen';
import { Login } from '../screens/Login';

export type AppStackParams = {
  Login: undefined;
  Home: undefined;
};

const Stack = createStackNavigator<AppStackParams>();

export const AppStack = observer(() => {
  //@ts-ignore PromiseLike in Query doesnt match Promise https://github.com/mobxjs/mst-gql/issues/227
  const { store, loading, error } = useQuery((store) => store.loadToken());

  if (loading) {
    return (
      <CentreScreen>
        <Spinner size="giant" />
      </CentreScreen>
    );
  }

  if (error) {
    throw error;
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
