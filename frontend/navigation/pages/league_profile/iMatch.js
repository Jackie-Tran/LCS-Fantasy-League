import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Dimensions } from "react-native";
import axios from 'axios';
import * as endpoints from '../../../constants/endpoints';
import { Table, Row, Rows } from 'react-native-table-component';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
export default class ExampleOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: [],
      tableData: [
      ]
    }
    
  }
  setupTeams = (usernames) => {
    this.setState({tableHead :usernames})
}


setupTable = () => 
{
  let topLane = []
      let jgLane = []
      let midLane = []
      let botLane = []
      let supLane = []

 console.log (this.props.route.params.id)
  axios.get(endpoints.GETROSTERINLEAGUE_EP(this.props.route.params.id,this.props.route.params.data[0].username))        
  .then(res1 => {
    axios.get(endpoints.GETROSTERINLEAGUE_EP(this.props.route.params.id,this.props.route.params.data[1].username))        
    .then(res2 => {
      console.log(res1.data)
       topLane = [res1.data[0], "Top", res2.data[0]]
       jgLane = [res1.data[1], "Jg", res2.data[1]]
       midLane = [res1.data[2], "Mid", res2.data[2]]
       botLane = [res1.data[3], "Adc", res2.data[3]]
       supLane = [res1.data[4], "Support", res2.data[4]]

      this.setState({tableData: [topLane,jgLane,midLane,botLane,supLane]});
    })
    .catch(err => {
      
        console.log(err);
    });
  })
  .catch(err => {
   
      console.log(err);
  });
}


componentDidMount() {
  this.setupTeams([this.props.route.params.data[0].username,this.props.route.params.data[1].username ])
   this.setupTable()
} 
  render() {
    const state = this.state;
    return (
      <View style={styles.container}>
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={state.tableHead} style={styles.head} textStyle={styles.headtext}/>
          <Rows data={state.tableData} heightArr={[screenHeight/7,screenHeight/7,screenHeight/7,screenHeight/7,screenHeight/7]} widthArr={[screenWidth/2.5,screenWidth*.5/2.5,screenWidth/2.5]}  textStyle={styles.text}/>
        </Table>
      </View>
    )
  }
}
 
const styles = StyleSheet.create({
  container: { flex: 1, padding: 0, paddingTop: 0, backgroundColor: '#152238' },
  head: { width:screenWidth , height: screenHeight/10,  backgroundColor: 'black' },
  row: { height: 23434},
  text: { textAlign:'center',fontWeight: 'bold', fontSize: 14, color: 'white' },
  headtext: { textAlign:'center',fontWeight: 'bold', fontSize: 20, color: 'white' }

});