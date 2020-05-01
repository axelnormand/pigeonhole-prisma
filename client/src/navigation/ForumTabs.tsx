import React from 'react';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationProp,
} from '@react-navigation/material-top-tabs';
import { Icon } from '@ui-kitten/components';
import { CompositeNavigationProp } from '@react-navigation/native';
import { Forums } from '../screens/Forums';
import { RecentThreads } from '../screens/RecentThreads';
import { TopTabBar } from '../comps/TopTabBar';
import { HomeScreenProps } from './AppStack';

type TopTabParams = {
  Forums: undefined;
  RecentThreads: undefined;
};

const TopTab = createMaterialTopTabNavigator<TopTabParams>();

export type ForumTabProps = CompositeNavigationProp<
  MaterialTopTabNavigationProp<TopTabParams, 'Forums'>,
  HomeScreenProps
>;

export type RecentThreadsTabProps = CompositeNavigationProp<
  MaterialTopTabNavigationProp<TopTabParams, 'RecentThreads'>,
  HomeScreenProps
>;

export const ForumsTabs = (): React.ReactElement => (
  <TopTab.Navigator tabBar={(props) => <TopTabBar {...props} />}>
    <TopTab.Screen
      name="Forums"
      component={Forums}
      options={{
        title: 'FORUMS',
        tabBarIcon: (props) => <Icon name="star" {...props} />,
      }}
    />
    <TopTab.Screen
      name="RecentThreads"
      component={RecentThreads}
      options={{
        title: 'RECENT',
        tabBarIcon: (props) => <Icon name="heart" {...props} />,
      }}
    />
  </TopTab.Navigator>
);
