import React from 'react';
import {View, Text, Modal, TouchableOpacity, StyleSheet} from 'react-native';
import StarRatingComponent from './RatingStars';

const InfoModal = ({visible, onClose, title, date, rest}) => {
  const {
    bath,
    dayClassification,
    breakfast,
    dinner,
    extra,
    lunch,
    patient,
    caretaker,
  } = rest;

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{title}</Text>

          <View style={styles.fieldsContainer}>
            <Text style={styles.header}>
              Data registo:
              <Text style={styles.value}> {date.slice(0, -14)}</Text>
            </Text>
            <Text style={styles.header}>
              Registo efetuado por:
              <Text style={[styles.value]}> {caretaker}</Text>
            </Text>
          </View>

          <StarRatingComponent rating={dayClassification} disableInteraction />

          <View style={styles.retangulo}>
            <Text style={styles.label}>Banho</Text>
            <Text
              style={[
                styles.switchText,
                {color: bath ? '#008000' : '#FF5A5F'},
              ]}>
              {bath ? 'Sim' : 'Não'}
            </Text>
          </View>
          <View style={styles.retangulo}>
            <Text style={styles.label}>Pequeno-almoço</Text>
            <Text
              style={[
                styles.switchText,
                {color: breakfast ? '#008000' : '#FF5A5F'},
              ]}>
              {breakfast ? 'Sim' : 'Não'}
            </Text>
          </View>
          <View style={styles.retangulo}>
            <Text style={styles.label}>Almoço</Text>
            <Text
              style={[
                styles.switchText,
                {color: lunch ? '#008000' : '#FF5A5F'},
              ]}>
              {lunch ? 'Sim' : 'Não'}
            </Text>
          </View>
          <View style={styles.retangulo}>
            <Text style={styles.label}>Jantar</Text>
            <Text
              style={[
                styles.switchText,
                {color: dinner ? '#008000' : '#FF5A5F'},
              ]}>
              {dinner ? 'Sim' : 'Não'}
            </Text>
          </View>
          {extra.length > 0 && (
            <View style={styles.retangulo}>
              <Text style={styles.value}>{extra}</Text>
            </View>
          )}
          <TouchableOpacity style={styles.modalCloseButton} onPress={onClose}>
            <Text style={styles.modalCloseButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  fieldsContainer: {
    alignItems: 'center', // Adicionado para alinhar ao centro
  },
  header: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontWeight: 'normal',
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Define um fundo semi-transparente
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '80%', // Aumenta a largura do cartão
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center', // Adicionado alinhamento centralizado
    color: '#333333', // Cor do texto do título
  },
  modalDate: {
    fontSize: 14,
    marginBottom: 16,
    color: '#999999', // Cor do texto da data
  },
  modalCloseButton: {
    backgroundColor: '#007aff',
    borderRadius: 8,
    paddingVertical: 12, // Aumentado o espaçamento vertical
    paddingHorizontal: 24, // Aumentado o espaçamento horizontal
    alignItems: 'center',
    marginTop: 16, // Aumentado a margem superior
  },
  modalCloseButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  retangulo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
  },
  label: {
    flex: 1,
    marginRight: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  switchText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default InfoModal;
