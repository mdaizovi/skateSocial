import React, {Component} from 'react';
import { View, StyleSheet, FlatList, Text, TextInput, Button } from 'react-native';
import appUserContext from '../context/appUserContext';

export default class LoginScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
     email: '',
     password:''
    }
   }

  static contextType = appUserContext;

  render(){
   return (
     
    <View style={styles.container}>
    <View style={styles.view}>
     <TextInput 
      style={styles.input} 
      onChangeText={(x)=>{this.setState({email: x})}}
      placeholder="Email" 
     />
      <TextInput 
      style={styles.input} 
      onChangeText={(x)=>{this.setState({password: x})}}
      placeholder="Password" 
     />
     <Text
      style={styles.loginForm} 
      onPress={()=>this.context.userLogIn(this.state.userLogIn)}
      >
       Log In
      </Text>
     </View>


     <Text style={styles.title} >User</Text>
     <FlatList 
      data={this.context.user} 
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item, index}) => {
      return (
       <View style={styles.rowcontainer}>
        <Text style={styles.text}>{item}</Text>
        <Text 
         style={styles.delete}
         onPress= {()=>{this.context.userLogOut()}}
        >
         delete
        </Text>
       </View>
      )
      }}
      />
     </View>
    );
   }
};
const styles = StyleSheet.create({
 rowcontainer: {
  flex: 1,
  flexDirection: 'column',
  marginLeft: 20,
  marginRight: 20,
  borderBottomWidth: 1,
  borderBottomColor: 'gray'
 },
 title: {
  marginTop:20,
  marginLeft: 20,
  fontSize: 30,
 },
 text: {
  padding: 10,
  fontSize: 20
 },
 delete: {
  alignSelf: 'flex-end',
  padding: 8,
  fontSize: 15,
 },
 container: {
  flex: 1,
  flexDirection:'column',
 },
 view: {
  flex: 1,
  width: '100%',
  top: 0,
  position: 'absolute',
  flexDirection: 'row'
 },
 input: {
  width:'30%',
  borderRadius: 30,
  borderWidth:1,
  padding: 5,
  marginLeft: 10,
  fontSize: 18,
  height:50
 },
 loginForm: {
  fontSize: 20,
  padding: 5,
  position: 'absolute',
  right: '10%',
  //top:10,
 }
});