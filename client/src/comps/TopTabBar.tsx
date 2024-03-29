import React from 'react';
import { TabBar, Tab, IconProps } from '@ui-kitten/components';
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';

export const TopTabBar: React.FC<MaterialTopTabBarProps> = ({
  navigation,
  state,
  descriptors,
}) => (
  <TabBar
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
    style={{ paddingTop: 8 }}
  >
    {state.routes.map((route) => {
      const { options } = descriptors[route.key];
      return (
        <Tab
          key={route.key}
          title={options.title}
          icon={options.tabBarIcon as IconProps}
        />
      );
    })}
  </TabBar>
);
