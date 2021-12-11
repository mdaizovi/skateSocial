import React from 'react';

// //const userContext = React.createContext({user: {name:'Mic'}});
// const ppUserContext = React.createContext({user: {}});

// //export { appUserContext };
// export default AppUserContext;

// remember this is the only tutorial that works for you: https://blog.devgenius.io/react-native-state-management-with-context-api-61f63f5b099

export default React.createContext({
//   user: [],
//   addNewTask : (task) => {},
//   deleteTask : (taskId) => {}
    user:{},
    userLogIn : (email, pw) => {},
    userLogOut : () => {}
});