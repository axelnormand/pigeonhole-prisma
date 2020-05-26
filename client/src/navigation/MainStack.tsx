import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Posts } from '../screens/Posts';
import { Topics } from '../screens/Topics';
import { ForumsTabs } from './ForumTabs';

export type MainStackParams = {
  ForumTabs: undefined;
  Topics: { forumId: number };
  Posts: { topicId: number };
};

type Props = {};

const Stack = createStackNavigator<MainStackParams>();

export const MainStack: React.FC<Props> = () => (
  <Stack.Navigator>
    <Stack.Screen name="ForumTabs" component={ForumsTabs} />
    <Stack.Screen name="Topics" component={Topics} />
    <Stack.Screen name="Posts" component={Posts} />
  </Stack.Navigator>
);
