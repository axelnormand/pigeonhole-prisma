import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { Login } from '../screens/Login';
import { TopicStack } from './TopicStack';

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
    <Stack.Screen name="Home" component={TopicStack} />
  </Stack.Navigator>
);
