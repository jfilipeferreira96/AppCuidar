import React, { useState, useEffect } from 'react';
import {useRoute} from '@react-navigation/native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import { StyleSheet, TextInput, Text, View, ScrollView } from 'react-native';
import { Table, TableWrapper, Row } from 'react-native-table-component';

import Header from '../../components/Header';
import api from '../../services/api';

const App = () => {
  const route = useRoute();
  const patient = route.params.id;
  const viewToGo = route.params.viewToGo;
  console.log('Utente param:', patient);
  console.log('View param:', viewToGo);

  const [tableHeadObs] = useState(['Observação', 'Data']);
  const [widthArrObs] = useState([240, 60]);


  const [widthArr] = useState([150, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80]);

  const [patientData, setPatientData] = useState([])
  const [recordsData, setRecordData] = useState([[]])
  const [dataVital, setDataVital] = useState([[]])
  const [tableHead, setTableHead] = useState([])
  const [dataAtividades, setDataAtv] = useState([[]])
  const [dataMedicamentos, setDataMedicamentos] = useState([[]])
  const [dataExtra, setDataExtra] = useState([[]])
  

  const extractField = (field, data, fieldName) => {
    return [fieldName, ...data.map(item => item[field] || '')];
  };

  const extractFieldDate = (field, data, fieldLabel) => {
    return [fieldLabel, ...data.map(item => formatDate(item[field]) || '')];
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, '0'); // Ensure 2 digits
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    return `${day}/${month}`;
  };

  const getPatient = async (patientId) => {
    try {
      const response = await api.get('/patients/' + patientId);
      const patientData = response.data.body;
      console.log('Utente dados:', patientData);
      setPatientData(patientData);

    } catch (error) {
      console.error(error);
    }
  };

  const transformData = (data) => {
    const medicineMap = {};
  
    data.forEach(entry => {
      entry.medicines.forEach(medicine => {
        const { medicamento, horario } = medicine;
  
        if (!medicineMap[medicamento]) {
          medicineMap[medicamento] = [[], []];
        }
  
        if (data.indexOf(entry) === 0) {
          medicineMap[medicamento][0].push(horario);
        } else {
          medicineMap[medicamento][1].push(horario);
        }
      });
    });
  
    const result = Object.entries(medicineMap).map(([medicamento, horarios]) => {
      const firstDay = horarios[0].join(' - ');
      const secondDay = horarios[1].join(' - ');
  
      return [medicamento, firstDay, secondDay];
    });
  
    return result;
  }
  
  

  const getDailyRecordsByPatient = async (patientId) => {
    try {
      const responseRecords = await api.get('/dailyRecords/patient/' + patientId);
      const recordsData = responseRecords.data.body;
      console.log('Records dados:', recordsData);
      setRecordData(recordsData);
      
      const weightArray = extractField('weight', recordsData, 'Peso');
      const respiratoryRateArray = extractField('respiratoryRate', recordsData, 'Frequencia Repiratória');
      const heartRateArray = extractField('heartRate', recordsData, 'Frequencia Cardiaca');
      const bloodPreassure = extractField('bloodPreassure', recordsData, 'Pressão Sanguenea');
      const glucose = extractField('glucose', recordsData, 'Glucose');
      const dataFinal = [weightArray, respiratoryRateArray, heartRateArray, bloodPreassure, glucose];
      setDataVital(dataFinal);

      const dateArray = extractFieldDate('registryDate', recordsData, "Dias");
      setTableHead(dateArray);

      const mealBreakfast = extractField('mealBreakfast', recordsData, 'Pequeno Almoço');
      const mealDinner = extractField('mealDinner', recordsData, 'Jantar');
      const mealLunch = extractField('mealLunch', recordsData, 'Almoço');
      const physicalActivity = extractField('physicalActivity', recordsData, 'Atividade Física');
      const toilet = extractField('toilet', recordsData, 'Necessidades Fisiologicas');
      const bathStatus = extractField('bathStatus', recordsData, 'Banho');
      const atvFinal = [mealBreakfast, mealDinner, mealLunch, physicalActivity, toilet, bathStatus];
      console.log(atvFinal);
      setDataAtv(atvFinal);

      const transformedData = transformData(recordsData);
      console.log(transformedData);
      setDataMedicamentos(transformedData);

      const extra = recordsData
      .filter(item => item.extra !== "")
      .map(item => [
        item.extra ? item.extra : "-",
        formatDate(item.registryDate)
      ]);
      console.log(extra);
      setDataExtra(extra);

    } catch (error) {
      console.error(error);
    }
  };


  useFocusEffect(
    React.useCallback(() => {
      console.log('CARREGAAAA!!!');
      getPatient(patient);
      getDailyRecordsByPatient(patient);
    }, [patient]),
  );

  return (
    <>
      <Header title="Relatório Diário do Utente" view={viewToGo ? viewToGo : "ListRegistos" }/>

      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.labelSubTitle}>Nome: {patientData?.name?? '-'}</Text>
          <Text style={styles.labelSubTitle}>Sexo: {patientData?.sex ?? '-'}</Text>
          <Text style={styles.labelSubTitle}>Idade: {patientData ? calculateAge(patientData.birth_date) : '-'}</Text>

          <Text style={styles.labelTitle}>Indicadores Vitais</Text>
          <ScrollView horizontal={true}>
            <View>
              <Table borderStyle={{ borderColor: '#C1C0B9' }}>
                <Row data={tableHead} widthArr={widthArr} style={styles.head} textStyle={styles.text} />
              </Table>
              <ScrollView style={styles.dataWrapper}>
                <Table borderStyle={{ borderColor: '#C1C0B9' }}>
                  {
                    dataVital.map((dataRow, index) => (
                      <Row
                        key={index}
                        data={dataRow}
                        widthArr={widthArr}
                        style={[index % 2 ? styles.row : styles.row2]}
                        textStyle={styles.text}
                      />
                    ))
                  }
                </Table>
              </ScrollView>
            </View>
          </ScrollView>

          <Text style={styles.labelTitle}>Atividades Diárias</Text>
          <ScrollView horizontal={true}>
            <View>
              <Table borderStyle={{ borderColor: '#C1C0B9' }}>
                <Row data={tableHead} widthArr={widthArr} style={styles.head} textStyle={styles.text} />
              </Table>
              <ScrollView style={styles.dataWrapper}>
                <Table borderStyle={{ borderColor: '#C1C0B9' }}>
                  {
                    dataAtividades.map((dataRow, index) => (
                      <Row
                        key={index}
                        data={dataRow}
                        widthArr={widthArr}
                        style={[index % 2 ? styles.row : styles.row2]}
                        textStyle={styles.text}
                      />
                    ))
                  }
                </Table>
              </ScrollView>
            </View>
          </ScrollView>

          <Text style={styles.labelTitle}>Medicamentos</Text>
          <ScrollView horizontal={true}>
            <View>
              <Table borderStyle={{ borderColor: '#C1C0B9' }}>
                <Row data={tableHead} widthArr={widthArr} style={styles.head} textStyle={styles.text} />
              </Table>
              <ScrollView style={styles.dataWrapper}>
                <Table borderStyle={{ borderColor: '#C1C0B9' }}>
                  {
                    dataMedicamentos.map((dataRow, index) => (
                      <Row
                        key={index}
                        data={dataRow}
                        widthArr={widthArr}
                        style={[index % 2 ? styles.row : styles.row2]}
                        textStyle={styles.text}
                      />
                    ))
                  }
                </Table>
              </ScrollView>
            </View>
          </ScrollView>

          <Text style={styles.labelTitle}>Observações</Text>
          <ScrollView horizontal={true}>
            <View>
              <Table borderStyle={{ borderColor: '#C1C0B9' }}>
                <Row data={tableHeadObs} widthArr={widthArrObs} style={styles.head} textStyle={styles.text} />
              </Table>
              <ScrollView style={styles.dataWrapper}>
                <Table borderStyle={{ borderColor: '#C1C0B9' }}>
                  {
                    dataExtra.map((dataRow, index) => (
                      <Row
                        key={index}
                        data={dataRow}
                        widthArr={widthArrObs}
                        style={[index % 2 ? styles.row : styles.row2]}
                        textStyle={styles.text}
                      />
                    ))
                  }
                </Table>
              </ScrollView>
            </View>
          </ScrollView>

        </View>
      </ScrollView>
    </>
  );
};

const calculateAge = (birthDate) => {
  const birth = new Date(birthDate);
  const ageDifMs = Date.now() - birth.getTime();
  const ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    paddingTop: 30, 
  },
  head: { 
    height: 50, 
    backgroundColor: '#6F7BD9' 
  },
  text: { 
    textAlign: 'left', 
    fontWeight: '200',
    paddingLeft: 5,
  },
  dataWrapper: { 
    marginTop: -1 
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
  label: {
    color: '#484848',
    fontSize: 16,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  labelTitle: {
    color: '#484848',
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  labelSubTitle: {
    color: '#484848',
    fontSize: 14,
    marginBottom: 5,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  input: {
    width: '90%',
    height: 50,
    borderColor: '#666666',
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 16,
    padding: 9,
  },
  row2: { 
    height: 40, 
    backgroundColor: '#ffffff' 
  },
  row: { 
    height: 40, 
    backgroundColor: '#F7F8FA' 
  }
});

export default App;
