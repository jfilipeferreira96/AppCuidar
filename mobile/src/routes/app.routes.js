import React, {useContext} from 'react';
import UserHomeScreen from '../pages/UserHomeScreen';
import CareTakerHomeScreen from '../pages/CareTakerHomeScreen';
import AdminHomeScreen from '../pages/AdminHomeScreen';
import ListUsers from '../pages/ListUsers';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AuthContext from '../contexts/auth';
import {useNavigation} from '@react-navigation/native';

const Drawer = createDrawerNavigator();
const AppStack = createNativeStackNavigator();

const CustomDrawerContent = props => {
  const {user, signOut} = useContext(AuthContext);
  const userType = user?.type;
  const navigation = useNavigation();

  const HomeString = () => {
    if (userType === 'user') return 'UserHomeScreen';
    if (userType === 'caretaker') return 'CareTakerHomeScreen';
    if (userType === 'admin') return 'AdminHomeScreen';
  };

  return (
    <DrawerContentScrollView {...props}>
      {/* <DrawerItemList {...props} /> */}
      <DrawerItem
        label="Home"
        onPress={() => navigation.navigate(HomeString())}
      />
      <DrawerItem label="Logout" onPress={signOut} />
    </DrawerContentScrollView>
  );
};

const AppRoutes = () => {
  const {user} = useContext(AuthContext);
  const userType = user?.type;

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}>
      {userType === 'user' ? (
        <Drawer.Screen
          name="UserHomeScreen"
          component={UserHomeScreen}
          options={{headerShown: false}}
        />
      ) : userType === 'caretaker' ? (
        <Drawer.Screen
          name="CareTakerHomeScreen"
          component={CareTakerHomeScreen}
          options={{headerShown: false}}
        />
      ) : userType === 'admin' ? (
        <Drawer.Screen
          name="AdminHomeScreen"
          component={AdminHomeScreen}
          options={{headerShown: false}}
        />
      ) : (
        <></>
      )}
      <AppStack.Screen
        name="ListUsers"
        component={ListUsers}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

export default AppRoutes;
