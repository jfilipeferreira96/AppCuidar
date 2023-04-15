import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

const AuthContext = createContext({signed: false, user: {}});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const storageUser = await AsyncStorage.getItem('@RNAuth:user');
      const storageToken = await AsyncStorage.getItem('@RNAuth:token');

      if (storageUser && storageToken) {
        setUser(JSON.parse(storageUser));
        api.defaults.headers['Authorization'] = `${storageToken}`;
      }
    }

    loadStorageData();
    setLoading(false);
  }, []);

  async function signIn(email, password) {
    const response = await api.post('/sign-in', {email, password});

    setUser(response.user);

    api.defaults.headers['Authorization'] = `${response.data.token}`;

    await AsyncStorage.setItem(
      '@RNAuth:user',
      JSON.stringify(response.data.user),
    );
    await AsyncStorage.setItem('@RNAuth:token', response.data.token);
  }

  function signOut() {
    AsyncStorage.clear().then(() => {
      setUser(null);
    });
  }

  return (
    <AuthContext.Provider
      value={{isSigned: user ? true : false, user, loading, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
