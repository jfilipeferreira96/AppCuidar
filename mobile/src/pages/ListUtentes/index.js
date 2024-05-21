import React, {useState, useContext, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Header';
import api from '../../services/api';
import {useIsFocused} from '@react-navigation/native';
import AuthContext from '../../contexts/auth';


const ListItem = ({item, onDeletePress, onEditPress, onViewPress}) => {

  const {user} = useContext(AuthContext);

  return (
    <TouchableOpacity onPress={() => onViewPress(item)}>
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>{item.title}</Text>
        <View style={styles.itemActions}>
          {user.type !== 'admin' && (
          <TouchableOpacity onPress={() => onViewPress(item)}>
            <Icon
              name="list"
              size={20}
              color="#007aff"
              style={styles.itemIcon}
            />
          </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => onEditPress(item)}>
            <Icon
              name="pencil"
              size={20}
              color="#007aff"
              style={styles.itemIcon}
            />
          </TouchableOpacity>
          {user.type === 'admin' && (
          <TouchableOpacity onPress={() => onDeletePress(item)}>
            <Icon
              name="trash-o"
              size={20}
              color="#FF3B30"
              style={styles.itemIcon}
            />
          </TouchableOpacity>
          )}
          
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ListUtentes = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();
  const {user} = useContext(AuthContext);

  async function getPatients() {
    try {
      const response = await api.get('/patients');
      const patientsOriginal = response.data.body;

      if (patientsOriginal) {

          //console.log("--------- PATIENTS -------- ");
          //console.log(patientsOriginal);

          if (user.type == 'admin') {
              filtered = patientsOriginal;
          } else {
              filtered = patientsOriginal
              .filter(item => 
                  item.users.some(item => item._id === user._id || user.type == 'admin'));
          }

          const patients = filtered;

          const patientsObject = patients.map(item => {
          return {
            title: item.name,
            id: item._id,
          };
        });
        setData(patientsObject);
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  useEffect(() => {
    getPatients();
  }, [isFocused]);

  const handleDeleteItem = async item => {
    await api.delete('/patients/' + item.id);
    getPatients();
  };

  const handleEditItem = item => {
    navigation.navigate('EditUtente', {id: item.id});
  };

  const handleViewItem = item => {
    console.log('View item:', item);
    navigation.navigate('ViewRegisto', {id: item.id, viewToGo: "ListUtentes"});
  };

  return (
    <>
      <Header title="Lista de Utentes"/>

      {user.type === 'admin' && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('AddUtente')}>
            <Icon name="plus" size={30} color="#007aff" />
            <Text style={styles.buttonText}>Adicionar Utente</Text>
          </TouchableOpacity>
        </View>
      )}

      {data?.length === 0 && (
        <View style={{flex: 1, marginTop: 50, alignItems: 'center'}}>
          <Icon name="user-times" size={32} />
          <Text style={{marginTop: 8}}>Não existem utentes</Text>
        </View>
      )}

      {data?.length > 0 && (
        <FlatList
          data={data}
          renderItem={({item}) => (
            <ListItem
              item={item}
              onDeletePress={handleDeleteItem}
              onEditPress={handleEditItem}
              onViewPress={handleViewItem}
            />
          )}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 8,
    width: 180,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#007aff',
    marginTop: 20,
    marginBottom: 10,
  },
  buttonText: {
    color: '#007aff',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    height: 50,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  itemActions: {
    flexDirection: 'row',
  },
  itemIcon: {
    marginLeft: 20,
  },
});

export default ListUtentes;
