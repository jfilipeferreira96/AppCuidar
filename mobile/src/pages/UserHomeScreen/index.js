import React, {useContext} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import AuthContext from '../../contexts/auth';
import CardWithImage from '../../components/CardWithImage';
import {FlatList} from 'react-native';

const UserHomeScreen = () => {
  const {user, signOut} = useContext(AuthContext);

  const listOfUtentes = [
    {
      id: 1,
      title: 'Maria Joana',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnHKV4kAvKK1IMRJU9Xfb1K5F0temcpeIQMplf3x1tGNPtIXCTasPxhnxshmS1pTj-C0s&usqp=CAU',
    },
  ];

  const hasUtentes = false;
  if (hasUtentes === false) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{
            width: Dimensions.get('screen').width - 80,
            height: 320,
          }}
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/6146/6146689.png',
          }}
          resizeMode="contain"
        />
        <Text
          style={{
            color: '#000',
            fontWeight: 'bold',
            fontSize: 35,
            textAlign: 'center',
          }}>
          {`Oops! Não há utentes\n associados a esta conta.`}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={listOfUtentes}
        renderItem={({item}) => (
          <CardWithImage id={item.id} title={item.title} image={item.image} />
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
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
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
});

export default UserHomeScreen;
