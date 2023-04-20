import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

const AuthContext = createContext({ signed: false, user: {} });

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadStorageData() {

      const storageUser = await AsyncStorage.getItem('@RNAuth:user');
      const storageToken = await AsyncStorage.getItem('@RNAuth:token');

      if (storageUser && storageToken) {
        setUser(JSON.parse(storageUser));
        api.defaults.headers['Authorization'] = `${storageToken}`;
      }
      setLoading(false);
    }

    loadStorageData();
  }, []);

  async function signIn(email, password) {
    try {
      setError("");
      const response = await api.post('/auth', { username: email, password });
      const token = response.headers.authorization;
      const userName = response.data.body.name;

      console.log(userName);
      setUser(userName);

      api.defaults.headers['Authorization'] = `${token}`;
      await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(userName));
      await AsyncStorage.setItem('@RNAuth:token', token);
    } catch (error) {
      console.log(error.response.status);
      setError(handleResponses(error.response.status));
    }
  }

  function handleResponses(code) {
    let message = '';
    switch (code) {
      case 401:
        message = 'Não está autorizado a executar esta ação!';
        break;
      case 403:
        message = 'Dados das credenciais errados!';
        break;
      case 406:
        message = 'Dados do utilizador já existentes!';
        break;
      default:
        message = 'Mensagem desconhecida';
        break;
    }
    return message;
  }

  function signOut() {
    AsyncStorage.clear().then(() => {
      setUser(null);
    });
  }

  return (
    <AuthContext.Provider
      value={{ isSigned: user ? true : false, user, loading, error, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
