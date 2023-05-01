//Rotas que o Utilizador pode navegar enquanto está autenticado!
import React, {useContext} from 'react';
import UserHomeScreen from '../pages/UserHomeScreen';
import CareTakerHomeScreen from '../pages/CareTakerHomeScreen';
import AdminHomeScreen from '../pages/AdminHomeScreen';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthContext from '../contexts/auth';

const AppStack = createNativeStackNavigator();

const AppRoutes = () => {
  const {user} = useContext(AuthContext);
  const userType = user?.type;

  return (
    <AppStack.Navigator>
      {userType === 'user' ? (
        <AppStack.Screen
          name="UserHomeScreen"
          component={UserHomeScreen}
          options={{headerShown: false}}
        />
      ) : userType === 'caretaker' ? (
        <AppStack.Screen
          name="CareTakerHomeScreen"
          component={CareTakerHomeScreen}
          options={{headerShown: false}}
        />
      ) : (
        <AppStack.Screen
          name="UserHomeScreen"
          component={UserHomeScreen}
          options={{headerShown: false}}
        />
      )}
    </AppStack.Navigator>
  );
};

export default AppRoutes;
