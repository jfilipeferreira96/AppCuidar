/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View, ActivityIndicator} from 'react-native';
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';
import AuthContext from '../contexts/auth';

//este componente controla as rotas, caso esta logged in são apresentadas as AppRoutes.
const Routes = () => {
  const {isSigned, loading} = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#666" />
      </View>
    );
  }

  return isSigned === true ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
