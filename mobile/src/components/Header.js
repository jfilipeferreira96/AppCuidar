import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const Header = ({ title, view }) => {
  const navigation = useNavigation();
  return (
    <View style={{flexDirection: 'row',  marginTop: 30, alignItems: 'center'}}>
      <TouchableOpacity
        onPress={() => view ? navigation.navigate(''+view) : navigation.goBack()}
        style={{padding: 10}}>
        <Icon name="chevron-back" size={25} color="#333" />
      </TouchableOpacity>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>{title}</Text>
      <TouchableOpacity
        onPress={() => navigation.openDrawer()}
        style={{position: 'absolute', right: 10}}>
        <Icon name="menu" size={25} color="#333" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
