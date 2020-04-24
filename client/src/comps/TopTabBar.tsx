import React from 'react';
import { TabBar, Tab, IconProps, Layout } from '@ui-kitten/components';
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import { useSafeArea } from 'react-native-safe-area-context';
import { Toolbar } from './Toolbar';

export const TopTabBar: React.FC<MaterialTopTabBarProps> = ({
  navigation,
  state,
  descriptors,
}) => {
  const insets = useSafeArea();
  return (
    <Layout style={{ paddingTop: insets.top }}>
      <Toolbar />
      <TabBar
        selectedIndex={state.index}
        onSelect={(index) => navigation.navigate(state.routeNames[index])}
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
    </Layout>
  );
};
