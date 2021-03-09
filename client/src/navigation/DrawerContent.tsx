import React, { useCallback, useContext } from "react";
import {
  Drawer as KittenDrawer,
  IndexPath,
  Layout,
  DrawerItem,
} from "@ui-kitten/components";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StoreContext } from "../models";

export const DrawerContent: React.FC<DrawerContentComponentProps> = ({
  navigation,
  state,
}) => {
  const insets = useSafeAreaInsets();
  const store = useContext(StoreContext);
  const onSelect = useCallback((index: IndexPath) => {
    if (index.row !== 1) {
      navigation.navigate(state.routeNames[index.row]);
    } else if (index.row === 1) {
      store.logout();
    }
  }, []);

  return (
    <Layout style={{ paddingTop: insets.top, flex: 1 }}>
      <KittenDrawer
        selectedIndex={new IndexPath(state.index)}
        onSelect={onSelect}
      >
        <DrawerItem title="Home" />
        <DrawerItem title="Logout" />
      </KittenDrawer>
    </Layout>
  );
};
