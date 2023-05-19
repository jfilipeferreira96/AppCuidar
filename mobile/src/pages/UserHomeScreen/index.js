import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';

import AuthContext from '../../contexts/auth';
import CardWithImage from '../../components/CardWithImage';
import {FlatList} from 'react-native';
import api from '../../services/api';

const UserHomeScreen = () => {
  const {user, signOut} = useContext(AuthContext);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [data, setData] = useState([]);

  async function getUsers() {
    try {
      const response = await api.get('/users');
      const users = response.data.body;

      if (users) {
        const usersObject = users
          .filter(item => item._id !== user._id)
          .map(item => ({
            title: item.name,
            type: item.type,
            id: item._id,
          }));

        setData(usersObject);
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  useEffect(() => {
    getUsers();
  }, [isFocused]);

  const listOfUtentes = [
    {
      id: '6463f58e2f2f2d12c0a27458',
      title: 'Maria Joana',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnHKV4kAvKK1IMRJU9Xfb1K5F0temcpeIQMplf3x1tGNPtIXCTasPxhnxshmS1pTj-C0s&usqp=CAU',
    },
  ];

  if (listOfUtentes.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Image
          style={styles.emptyImage}
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/6146/6146689.png',
          }}
          resizeMode="contain"
        />
        <Text style={styles.emptyText}>
          Oops! Não há utentes associados a esta conta.
        </Text>
      </View>
    );
  }

  const handleUtentePress = id => {
    navigation.navigate('ListUtenteRegisto', {id});
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={listOfUtentes}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.cardContainer}
            onPress={() => handleUtentePress(item.id)}>
            <CardWithImage id={item.id} title={item.title} image={item.image} />
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
      />
      <TouchableOpacity style={styles.button} onPress={signOut}>
        <Text style={styles.buttonText}>Terminar sessão</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  cardContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  button: {
    width: '90%',
    height: 50,
    backgroundColor: '#27B4FD',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#FFF',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyImage: {
    width: Dimensions.get('screen').width - 80,
    height: 320,
  },
  emptyText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 35,
    textAlign: 'center',
  },
});

export default UserHomeScreen;
