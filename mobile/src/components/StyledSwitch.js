import React from 'react';
import {View, Switch, Text, StyleSheet} from 'react-native';

const StyledSwitch = ({label, isSwitchOn, setIsSwitchOn}) => {
  const toggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label} numberOfLines={1} ellipsizeMode="tail">
        {label}
      </Text>
      <View style={styles.switchContainer}>
        <Switch
          trackColor={{false: '#FF5A5F', true: '#008000'}}
          thumbColor={isSwitchOn ? '#FFFFFF' : '#FFFFFF'}
          ios_backgroundColor="#C0C0C0"
          onValueChange={toggleSwitch}
          value={isSwitchOn}
        />
        <Text
          style={[
            styles.switchText,
            {color: isSwitchOn ? '#008000' : '#FF5A5F'},
          ]}>
          {isSwitchOn ? 'Sim' : 'Não'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  label: {
    marginRight: 10,
    fontSize: 16,
    width: 230,
    flexShrink: 1,
    color: '#484848',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default StyledSwitch;
