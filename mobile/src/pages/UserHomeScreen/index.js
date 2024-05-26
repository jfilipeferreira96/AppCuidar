import React, {useState, useContext, useEffect} from 'react';
import SimpleHeader from '../../components/SimpleHeader';
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
  const [loading, setLoading] = useState(true);

  async function getUsers() {
    try {
      const response = await api.get('/patients/user/' + user._id);
      const patients = response.data.body;

      if (patients) {
        const patientsObject = patients.map(item => ({
          id: item._id,
          title: item.name,
          image:            'https://cdn-icons-png.flaticon.com/512/12059/12059846.png',
        }));

        setData(patientsObject);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  useEffect(() => {
    getUsers();
  }, [isFocused]);

  if (loading) {
    return <></>;
  }

  if (data.length === 0) {
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

        <TouchableOpacity style={styles.button} onPress={signOut}>
          <Text style={styles.buttonText}>Terminar sessão</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleUtentePress = id => {
    navigation.navigate('ListRegistos', {id});
  };

  return (
    <>
      <SimpleHeader />

      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.cardContainer}
              onPress={() => handleUtentePress(item.id)}>
              <CardWithImage
                id={item.id}
                title={item.title}
                image={item.image}
              />
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id.toString()}
        />
        <TouchableOpacity style={styles.button} onPress={signOut}>
          <Text style={styles.buttonText}>Terminar sessão</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  cardContainer: {
    width: '90%',
    paddingHorizontal: 0,
    marginBottom: 10,
    marginTop: 10,
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
    marginBottom: 250,
  },
});

export default UserHomeScreen;
