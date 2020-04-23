import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from '../screens/Login';
import { ForumsTabs } from './ForumTabs';

type Params = {
  Login: undefined;
  Home: undefined;
};

type Props = {
  initialRouteName: keyof Params;
};

const Stack = createStackNavigator<Params>();

export const AppStack: React.FC<Props> = ({ initialRouteName }) => (
  <Stack.Navigator headerMode="none" initialRouteName={initialRouteName}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Home" component={ForumsTabs} />
  </Stack.Navigator>
);