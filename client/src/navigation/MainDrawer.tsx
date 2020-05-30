import React from 'react';
import { Icon } from '@ui-kitten/components';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MainStack } from './MainStack';
import { DrawerContent } from './DrawerContent';

export type MainDrawerParams = {
  MainStack: undefined;
};

type Props = {};

const Drawer = createDrawerNavigator<MainDrawerParams>();

export const MainDrawer: React.FC<Props> = () => (
  <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
    <Drawer.Screen
      name="MainStack"
      component={MainStack}
      options={{
        title: 'Home',
        drawerIcon: (props) => <Icon name="star" {...props} />,
      }}
    />
  </Drawer.Navigator>
);
