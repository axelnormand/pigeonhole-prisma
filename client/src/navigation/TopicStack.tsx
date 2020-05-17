import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { Topic } from '../screens/Topic';
import { ForumsTabs } from './ForumTabs';

type TopicStackParams = {
  Tabs: undefined;
  Topic: { topicId: number };
};

export type TabsScreenProps = StackNavigationProp<TopicStackParams, 'Tabs'>;
export type TopicScreenProps = StackNavigationProp<TopicStackParams, 'Topic'>;

type Props = {};

const Stack = createStackNavigator<TopicStackParams>();

export const TopicStack: React.FC<Props> = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Tabs" component={ForumsTabs} />
    <Stack.Screen name="Topic" component={Topic} />
  </Stack.Navigator>
);
