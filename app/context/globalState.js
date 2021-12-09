import React from 'react';
import appUserContext from './appUserContext';

export default class GlobalState extends React.Component{
    state = {
    user: {},
    }
 
userLogIn = (email, pw) => {
  console.log("logging in "+ email)
  const user = {'email':email, "pw":pw}
  this.setState({user :user});
};
 
userLogOut = (taskId) => {
  this.setState({user: {}});
};
render(){
 return (
  <appUserContext.Provider 
   value={{
    user: this.state.user,
    userLogIn: this.userLogIn,
    userLogOut: this.userLogOut
   }}
  >
   {this.props.children}
  </appUserContext.Provider>
 );
 }
}