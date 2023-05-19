import React, {useState, useContext, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AuthContext from '../../contexts/auth';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Header';
import api from '../../services/api';
import {useIsFocused} from '@react-navigation/native';

const ListItem = ({item, onDeletePress, onEditPress}) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.userTypeArea}>
        <Icon
          name={getUserIcon(item.type)}
          size={20}
          color={getUserColor(item.type)}
          style={styles.userType}
        />
      </View>

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

function getUserIcon(type) {
  if (type == 'caretaker') return 'stethoscope';
  if (type == 'admin') return 'cog';
  return 'user-o';
}

function getUserColor(type) {
  if (type == 'caretaker') return '#708090';
  if (type == 'admin') return 'black';
  return 'gray';
}

const ListUsers = () => {
  const {user, signOut} = useContext(AuthContext);
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();

  async function getUsers() {
    try {
      const response = await api.get('/users');
      const users = response.data.body;

      if (users) {
        const usersObject = users.map(item => {
          return {
            title: item.name,
            type: item.type,
            id: item._id,
          };
        });
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

  const handleDeleteItem = async item => {
    await api.delete('/users/' + item.id);
    getUsers();
  };

  const handleEditItem = item => {
    navigation.navigate('EditUser', {id: item.id});
  };

  return (
    <>
      <Header />

      <Text style={styles.headerTitle}>Lista de Utilizadores</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AddUser')}>
          <Icon name="plus" size={30} color="#007aff" />
          <Text style={styles.buttonText}>Adicionar Utilizador</Text>
        </TouchableOpacity>
      </View>

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
    width: 195,
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
    flex: 1, // Take remaining space
    textAlign: 'left', // Align text to the right
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
  userType: {
    marginRight: 10,
  },
  userTypeArea: {
    flexDirection: 'row',
  },
});

export default ListUsers;
