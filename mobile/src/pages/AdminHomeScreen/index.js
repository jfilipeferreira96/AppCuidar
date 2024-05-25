import React, {useContext} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import AuthContext from '../../contexts/auth';
import CardWithImage from '../../components/CardWithImage';
import {FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import SimpleHeader from '../../components/SimpleHeader';

const AdminHomeScreen = () => {
  const {user, signOut} = useContext(AuthContext);
  const navigation = useNavigation();

  const cards = [
    {
      id: 1,
      title: 'Lista de utilizadores',
      image:
        'https://cdn-icons-png.flaticon.com/512/1165/1165674.png',
      navigate: () => navigation.navigate('ListUsers'),
    },
    {
      id: 2,
      title: 'Lista de utentes',
      image:
        'https://cdn-icons-png.flaticon.com/512/12059/12059846.png',
      navigate: () => navigation.navigate('ListUtentes'),
    },
    {
      id: 3,
      title: 'Registos diarios',
      image: 'https://cdn-icons-png.flaticon.com/512/2464/2464568.png',
      navigate: () => navigation.navigate('ListRegistos'),
    },
  ];

  return (
    <>
    <SimpleHeader />

    <View style={styles.container}>
      <FlatList
        data={cards}
        renderItem={({item}) => (
          <TouchableOpacity onPress={item.navigate}>
            <CardWithImage id={item.id} title={item.title} image={item.image} />
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
      />

      {/*    <TouchableOpacity style={styles.button} onPress={signOut}>
        <Text style={styles.buttonText}>Terminar sessão</Text>
      </TouchableOpacity> */}
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  welcome: {
    fontSize: 50,
    color: 'green',
    alignSelf: 'flex-start',
    paddingHorizontal: '10%',
  },
  button: {
    width: '90%',
    height: 50,
    backgroundColor: 'green',
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

export default AdminHomeScreen;
