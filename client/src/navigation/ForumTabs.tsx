import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Icon } from '@ui-kitten/components';
import { Forums } from '../screens/Forums';
import { RecentThreads } from '../screens/RecentThreads';
import { TopTabBar } from '../comps/TopTabBar';

type Params = {
  Forums: undefined;
  RecentThreads: undefined;
};

const TopTab = createMaterialTopTabNavigator<Params>();

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
