import React, { useContext } from 'react';
import { Drawer as KittenDrawer, Layout } from '@ui-kitten/components';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StoreContext } from '../models';

export const DrawerContent: React.FC<DrawerContentComponentProps> = ({
  navigation,
  state,
}) => {
  const insets = useSafeAreaInsets();
  const store = useContext(StoreContext);
  const onSelect = (index: number) => {
    if (index === 0) {
      navigation.navigate(state.routeNames[index]);
    } else if (index === 1) {
      store.logout();
    }
  };

  return (
    <Layout style={{ paddingTop: insets.top, flex: 1 }}>
      <KittenDrawer
        data={[
          {
            title: 'Home',
          },
          { title: 'Logout' },
        ]}
        selectedIndex={state.index}
        onSelect={onSelect}
      />
    </Layout>
  );
};
