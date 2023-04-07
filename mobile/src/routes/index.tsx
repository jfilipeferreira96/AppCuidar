import React from 'react';
import {View, ActivityIndicator} from 'react-native';
/* import {useAuth} from '../contexts/auth';
 */
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

//este componente controla as rotas, caso esta logged in são apresentadas as AppRoutes.
const Routes: React.FC = () => {
  /* const {signed, loading} = useAuth(); */

  /*   if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#666" />
      </View>
    );
  } */
  let teste = 1;
  return teste === 1 ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
