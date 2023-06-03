import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const Header = ({title}) => {
  const navigation = useNavigation();
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Text style={{fontSize: 20, padding: 10, fontWeight: 'bold'}}>{title}</Text>
      <TouchableOpacity
        onPress={() => navigation.openDrawer()}
        style={{position: 'absolute', paddingTop: 15, right: 10}}>
        <Icon name="menu" size={25} color="#333" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
