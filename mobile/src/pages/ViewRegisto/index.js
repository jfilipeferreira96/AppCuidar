import React, { Component } from 'react';
import { StyleSheet, TextInput, Text, View, ScrollView } from 'react-native';
import { Table, TableWrapper, Row } from 'react-native-table-component';

import Header from '../../components/Header';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Item', '23/04', '25/04', '28/04', '03/05', '04/05', '17/05'],
      widthArr: [150, 80, 80, 80, 80, 80, 80]
    }
  }
  render() {
    const state = this.state;
    const dataVital = [
      ['Peso','63kg', '63kg', '62kg', '62kg', '62kg', '63kg'],
      ['Pressão Arterial','14/9','14/9','14/8','14/7','14/9','14/9'],
      ['Frequência cardíaca',85,86,93,87,84,88],
      ['Frequência respiratória','12/20','-', '-','-','-','12/20'],
      ['Glucose',100, '-', '-','-','-', 105],
    ];

    const dataAtividades = [
      ['Pequeno Almoço', 'Todo', 'Parte', 'Parte', 'Recusou', '-', 'Todo'],
      ['Almoço', 'Todo', 'Parte', 'Parte', 'Recusou', '-', 'Todo'],
      ['Jantar', 'Todo', 'Parte', 'Parte', 'Recusou', '-', 'Todo'],
      ['Banho','Sim/Sozinho(a)','-', 'Recusou','Sim/Com auxilio','-','-'],
      ['Caminhada/Passeio','-', 'Recusou', '-','Sim/30 minutos','-', 'Sim/30 minutos'],
    ];
   
    return (
    <>
      <Header />

      <Text style={styles.headerTitle}>Relatório Diário do Utente </Text>
      <ScrollView >
      <View style={styles.container}>
        
        <Text style={styles.labelTitle}>Utente</Text>
        <Text style={styles.label}>Nome: Anastasio Simão da Silva</Text>
        <Text style={styles.label}>Sexo: Masculino</Text>
        <Text style={styles.label}>Idade: 85 anos</Text>

        <Text style={styles.labelTitle}>Indicadores Vitais</Text>
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{borderColor: '#C1C0B9'}}>
              <Row data={state.tableHead} widthArr={state.widthArr} style={styles.head} textStyle={styles.text}/>
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderColor: '#C1C0B9'}}>
                {
                  dataVital.map((dataRow, index) => (
                    <Row
                      key={index}
                      data={dataRow}
                      widthArr={state.widthArr}
                      style={[index%2 ? styles.row : styles.row2 ]}
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
            <Table borderStyle={{borderColor: '#C1C0B9'}}>
              <Row data={state.tableHead} widthArr={state.widthArr} style={styles.head} textStyle={styles.text}/>
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderColor: '#C1C0B9'}}>
                {
                  dataAtividades.map((dataRow, index) => (
                    <Row
                      key={index}
                      data={dataRow}
                      widthArr={state.widthArr}
                      style={[index%2 ? styles.row : styles.row2 ]}
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
    )
  }
}
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