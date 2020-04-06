import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Dimensions } from "react-native";

import { Table, Row, Rows } from 'react-native-table-component';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
export default class ExampleOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['TEAM1 ', 'TEAM2'],
      tableData: [
        ['Impact    3904\n Game next week', 'TOP', '3' ],
        ['a', 'MID', 'c'],
        ['1', 'JG', '3'],
        ['a', 'ADC', 'c'],
        ['a', 'SUPPORT', 'c']
      ]
    }
  }
 
  render() {
    const state = this.state;
    return (
      <View style={styles.container}>
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
          <Rows data={state.tableData} heightArr={[screenHeight/5,screenHeight/5,screenHeight/5,,screenHeight/5,,screenHeight/5]} widthArr={[screenWidth/2.5,screenWidth*.5/2.5,screenWidth/2.5]}  textStyle={styles.text}/>
        </Table>
      </View>
    )
  }
}
 
const styles = StyleSheet.create({
  container: { flex: 1, padding: 0, paddingTop: 0, backgroundColor: '#152238' },
  head: { width:screenWidth , height: screenHeight/8,  backgroundColor: 'black' },
  row: { height: 23434},
  text: { textAlign:'center',fontWeight: 'bold', fontSize: 20, color: 'white' }
});