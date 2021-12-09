import React from 'react';
import appUserContext from './appUserContext';

export default class GlobalState extends React.Component{
    state = {
    tasks: [],
    }
 
addNewTask = (task) => {
  const list = [...this.state.tasks, task];
  this.setState({tasks: list});
};
 
deleteTask = (taskId) => {
  this.setState(this.state.tasks.splice(taskId,1));
};
render(){
 return (
  <appUserContext.Provider 
   value={{
    tasks: this.state.tasks,
    addNewTask: this.addNewTask,
    deleteTask: this.deleteTask
   }}
  >
   {this.props.children}
  </appUserContext.Provider>
 );
 }
}