import React, {useContext} from 'react';
import UserHomeScreen from '../pages/UserHomeScreen';
import CareTakerHomeScreen from '../pages/CareTakerHomeScreen';
import AdminHomeScreen from '../pages/AdminHomeScreen';
import ListUsers from '../pages/ListUsers';
import ListRegistos from '../pages/ListRegistos';
import ListUtentes from '../pages/ListUtentes';
import EditUser from '../pages/EditUser';
import EditUtente from '../pages/EditUtente';
import AddUtente from '../pages/AddUtente';
import AddRegisto from '../pages/AddRegisto';

import {View, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

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
      <View style={styles.header}>
        <Icon name="home" size={50} color="#fff" />
        <Text style={styles.headerText}>AppCuidar</Text>
      </View>
      <DrawerItem
        label="Home"
        onPress={() => navigation.navigate(HomeString())}
        icon={() => <Icon name="home" size={20} color="#555" />}
        style={styles.drawerItem}
        labelStyle={styles.drawerLabel}
      />
      <DrawerItem
        label="Logout"
        onPress={signOut}
        icon={() => <Icon name="sign-out" size={20} color="#555" />}
        style={styles.drawerItem}
        labelStyle={styles.drawerLabel}
      />
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
      <AppStack.Screen
        name="ListUtentes"
        component={ListUtentes}
        options={{headerShown: false}}
      />
      <AppStack.Screen
        name="ListRegistos"
        component={ListRegistos}
        options={{headerShown: false}}
      />
      <AppStack.Screen
        name="AddUtente"
        component={AddUtente}
        options={{headerShown: false}}
      />
      <AppStack.Screen
        name="AddRegisto"
        component={AddRegisto}
        options={{headerShown: false}}
      />
      <AppStack.Screen
        name="EditUtente"
        component={EditUtente}
        options={{headerShown: false}}
      />
      <AppStack.Screen
        name="EditUser"
        component={EditUser}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#333',
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 30,
    marginLeft: 10,
  },
  drawerItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginHorizontal: 0,
    paddingVertical: 10,
    paddingLeft: 20,
  },
  drawerLabel: {
    color: '#555',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: -16,
  },
});

export default AppRoutes;
