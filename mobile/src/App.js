import 'react-native-gesture-handler';

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {View} from 'react-native';
import Routes from './routes';
/*import {AuthProvider} from './contexts/auth'; */

const App = () => {
  return (
    <NavigationContainer>
      {/* <AuthProvider>
       
        
      </AuthProvider> */}
      <Routes />
    </NavigationContainer>
  );
};

export default App;
