import React from 'react';

// //const userContext = React.createContext({user: {name:'Mic'}});
// const appUserContext = React.createContext({user: {}});

// //export { appUserContext };
// export default appUserContext;

export default React.createContext({
  tasks: [],
  addNewTask : (task) => {},
  deleteTask : (taskId) => {}
});