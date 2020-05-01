import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { Login } from '../screens/Login/Login';
import { ForumsTabs } from './ForumTabs';

type AppStackParams = {
  Login: undefined;
  Home: undefined;
};

export type LoginScreenProps = StackNavigationProp<AppStackParams, 'Login'>;
export type HomeScreenProps = StackNavigationProp<AppStackParams, 'Home'>;

type Props = {
  initialRouteName: keyof AppStackParams;
};

const Stack = createStackNavigator<AppStackParams>();

export const AppStack: React.FC<Props> = ({ initialRouteName }) => (
  <Stack.Navigator headerMode="none" initialRouteName={initialRouteName}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Home" component={ForumsTabs} />
  </Stack.Navigator>
);
