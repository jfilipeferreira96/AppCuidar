import React, {useState, useContext, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Header';
import api from '../../services/api';
import {useIsFocused} from '@react-navigation/native';
import Modal from '../../components/Modal';

const ListItem = ({item, onDeletePress, onEditPress, onViewPress}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  
  return (
    <TouchableOpacity onPress={() => onViewPress(item)}>
      <View style={styles.itemContainer}>
        <View style={styles.titles}>
          <Text style={[styles.itemText, styles.itemDate]}>
            {item.date.slice(0, -14)}
          </Text>
          <Text style={styles.itemText}>{item.title}</Text>
        </View>

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
        <Modal
          visible={modalVisible}
          onClose={handleCloseModal}
          title={item.title}
          date={item.date}
          rest={item.rest}
        />
      </View>
    </TouchableOpacity>
  );
};

const ListRegistos = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();

  async function getRecords() {
    try {
      const response = await api.get('/dailyRecords');
      const records = response.data.body;

      if (records) {
        const recordsObject = records.map(item => {
          return {
            id: item._id,
            title: item.patient.name,
            date: item.registryDate,
            patient: item.patient._id,
            rest: {...item},
          };
        });
        setData(recordsObject);
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  useEffect(() => {
    getRecords();
  }, [isFocused]);

  const handleDeleteItem = async item => {
    await api.delete('/dailyRecords/' + item.id);
    getRecords();
  };

  const handleEditItem = item => {
    console.log('Editar item:', item);
    navigation.navigate('EditRegisto', {id: item.id});
  };

  const handleViewItem = item => {
    console.log('View item:', item);
    navigation.navigate('ViewRegisto', {id: item.patient});
  };

  return (
    <>
      <Header title="Lista de Registos"/>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AddRegisto')}>
          <Icon name="plus" size={30} color="#007aff" />
          <Text style={styles.buttonText}>Adicionar Registo</Text>
        </TouchableOpacity>
      </View>

      {data?.length === 0 && (
        <View style={{flex: 1, marginTop: 50, alignItems: 'center'}}>
          <Icon name="user-times" size={32} />
          <Text style={{marginTop: 8}}>Não existem registos</Text>
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
  itemDate: {
    fontSize: 12,
    textAlign: 'center',
  },
  itemActions: {
    flexDirection: 'row',
  },
  titles: {
    flexDirection: 'column',
  },
  itemIcon: {
    marginLeft: 20,
  },
});

export default ListRegistos;
