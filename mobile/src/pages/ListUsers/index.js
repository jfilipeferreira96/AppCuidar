import React, {useState, useContext} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import AuthContext from '../../contexts/auth';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useNavigation} from '@react-navigation/native';

const ListItem = ({item, onDeletePress, onEditPress}) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.title}</Text>
      <View style={styles.itemActions}>
        <TouchableOpacity onPress={() => onEditPress(item)}>
          <Icon
            name="pencil"
            size={20}
            color="#27B4FD"
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

const ListUsers = () => {
  const {user, signOut} = useContext(AuthContext);
  const navigation = useNavigation();

  const [data, setData] = useState([
    {id: 1, title: 'Item 1'},
    {id: 2, title: 'Item 2'},
    {id: 3, title: 'Item 3'},
  ]);

  const handleDeleteItem = item => {
    const newData = data.filter(i => i.id !== item.id);
    setData(newData);
  };

  const handleEditItem = item => {
    // implementar ação de edição do item
    console.log('Editar item:', item);
  };

  const handleAddUser = () => {
    // handle adding user logic
  };

  return (
    <>
      {/* <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title="Go Back" iconName="arrow-back" onPress={handleGoBack} />
      </HeaderButtons> */}
      <Text style={styles.headerTitle}>Users List</Text>

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

export default ListUsers;
