import React, {useContext} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import AuthContext from '../../contexts/auth';
import CardWithImage from '../../components/CardWithImage';
import {FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const CareTakerHomeScreen = () => {
  const {user, signOut} = useContext(AuthContext);
  const navigation = useNavigation();

  const cards = [
    {
      id: 1,
      title: 'Lista de utentes',
      image:
        'https://clinicarecanto.com.br/wp-content/uploads/2019/03/estatudo-do-idoso.png',
      navigate: () => navigation.navigate('ListUtentes'),
    },
    {
      id: 2,
      title: 'Registos diarios',
      image: 'https://www.sns.gov.pt/wp-content/uploads/2016/09/foto_sns_3.jpg',
      navigate: () => navigation.navigate('ListRegistos'),
    },
  ];

  return (
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  welcome: {
    fontSize: 50,
    color: '#007aff',
    alignSelf: 'flex-start',
    paddingHorizontal: '10%',
  },
  button: {
    width: '90%',
    height: 50,
    backgroundColor: '#007aff',
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

export default CareTakerHomeScreen;
