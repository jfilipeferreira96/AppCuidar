import React from 'react';
import {View, Text, Modal, TouchableOpacity, StyleSheet} from 'react-native';

const InfoModal = ({visible, onClose, title, date, rest}) => {
  console.log('rest', rest);
  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalDate}>
            Data registo: {date.slice(0, -14)}
          </Text>
          <TouchableOpacity style={styles.modalCloseButton} onPress={onClose}>
            <Text style={styles.modalCloseButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
    height: '40%', // Aumenta a altura do cartão
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
});

export default InfoModal;
