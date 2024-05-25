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
          <Text style={styles.modalTitle}>Resumo do Dia</Text>

          <View style={styles.fieldsContainer}>
          <Text style={styles.header}>
              Utente:
              <Text style={styles.value}> {title}</Text>
            </Text>
            <Text style={styles.header}>
              Data registo:
              <Text style={styles.value}> {date.slice(0, -14)}</Text>
            </Text>
            <Text style={styles.header}>
              Registo efetuado por:
              <Text style={[styles.value]}> {caretaker}</Text>
            </Text>
          </View>

          <View style={styles.detailsContainer}>
            <Text style={styles.header}>
                Classificação:
            </Text>
          </View>

          <View style={styles.retangulo}>
            <StarRatingComponent rating={dayClassification} disableInteraction />
          </View>
          
          {extra.length > 0 && (
            <View>
              <View style={styles.detailsContainer}>
              <Text style={styles.header}>
                  Observações:
              </Text>
            </View>
              <View style={styles.retangulo}>
                <Text style={styles.value}>{extra}</Text>
              </View>
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
  detailsContainer: {
    marginTop: 10,
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
    backgroundColor: 'green',
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
