import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Posts } from '../screens/Posts';
import { Topics } from '../screens/Topics';
import { ForumsTabs } from './ForumTabs';
import { useTheme, Icon, Button } from '@ui-kitten/components';
import { useNavigation, DrawerActions } from '@react-navigation/core';
import { Platform } from 'react-native';

export type MainStackParams = {
  ForumTabs: undefined;
  Topics: { forumId: number; forumName: string };
  Posts: { topicId: number; topicName: string };
};

type Props = {};

const Stack = createStackNavigator<MainStackParams>();

export const MainStack: React.FC<Props> = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      headerMode="float"
      screenOptions={{
        headerBackTitle: ' ',
        headerStyle: {
          backgroundColor: theme['background-basic-color-1'],
        },
        headerTitleStyle: {
          textAlign: Platform.OS == 'android' ? undefined : 'center',
        },
      }}
    >
      <Stack.Screen
        name="ForumTabs"
        component={ForumsTabs}
        options={{
          title: 'Pigeon Hole 🐦',
          headerLeft: () => (
            <Button
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              appearance="ghost"
              accessoryLeft={() => (
                <Icon name="menu-outline" fill={theme['color-primary-300']} />
              )}
            />
          ),
        }}
      />
      <Stack.Screen name="Topics" component={Topics} />
      <Stack.Screen name="Posts" component={Posts} />
    </Stack.Navigator>
  );
};
