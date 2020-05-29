import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Posts } from '../screens/Posts';
import { Topics } from '../screens/Topics';
import { ForumsTabs } from './ForumTabs';
import { useTheme } from '@ui-kitten/components';

export type MainStackParams = {
  ForumTabs: undefined;
  Topics: { forumId: number; forumName: string };
  Posts: { topicId: number; topicName: string };
};

type Props = {};

const Stack = createStackNavigator<MainStackParams>();

export const MainStack: React.FC<Props> = () => {
  const theme = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitle: ' ',
        headerStyle: {
          backgroundColor: theme['background-basic-color-1'],
        },
        headerTitleStyle: {
          textAlign: 'center',
        },
      }}
    >
      <Stack.Screen
        name="ForumTabs"
        component={ForumsTabs}
        options={{ title: 'Pigeon Hole 🐦' }}
      />
      <Stack.Screen name="Topics" component={Topics} />
      <Stack.Screen name="Posts" component={Posts} />
    </Stack.Navigator>
  );
};
