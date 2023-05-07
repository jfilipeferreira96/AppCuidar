import React, {useState, useContext, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Header';
import api from '../../services/api';
import {useIsFocused} from '@react-navigation/native';

const ListItem = ({item, onDeletePress, onEditPress}) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.title}</Text>
      <View style={styles.itemActions}>
        <TouchableOpacity onPress={() => onEditPress(item)}>
          <Icon
            name="pencil"
            size={20}
            color="#007aff"
            style={styles.itemIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDeletePress(item)}>
          <Icon
            name="trash-o"
            size={20}
            color="#FF3B30"
            style={styles.itemIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ListUtentes = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();

  async function getPatients() {
    try {
      const response = await api.get('/patients');
      const patients = response.data.body;

      if (patients) {
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
    // implementar ação de edição do item
    console.log('Editar item:', item);
    // AQUI DEVO ENVIAR PARA O SCREEN PATIENT EDIT
    //navigation.navigate('EditUtente', {id: item.id});

    /*  dentro da pagian EditUtente terei de ter algo assim:
    const EditUtente() {
  const route = useRoute();
  const user = route.params.id; */
  };

  return (
    <>
      <Header />

      <Text style={styles.headerTitle}>Lista de Utentes</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AddUtente')}>
          <Icon name="plus" size={30} color="#007aff" />
          <Text style={styles.buttonText}>Adicionar Utente</Text>
        </TouchableOpacity>
      </View>

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
