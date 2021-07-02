import React from 'react'

import JoinBlock from './components/JoinBlock';
import socket from './socket'
import reducer from './reducer'
import './index.css';
import Chat from './components/Chat';
import axios from 'axios';


const App = () => {

  const [state, dispatch] = React.useReducer(reducer, {
    joined: false,
    roomID: null,
    userName: null,
    users: [],
    messages: [],
  })
  
  const onLogin = (obj) => {
    dispatch({
      type: 'JOINED',
      payload: obj
    })
    socket.emit('ROOM:JOIN', obj)
    axios.get(`rooms/${obj.roomID}`).then(({data}) => {
      dispatch({
        type: 'SET_DATA',
        payload: data,
      })
    })
  }

   const setUsers = (users) => {
    dispatch({
      type: 'SET_USERS',
      payload: users,
    });
  };
  const addMessage = (message) => {
    dispatch({
      type: 'NEW_MESSAGES',
      payload: message,
    });
  }
  React.useEffect(() => {
    socket.on('ROOM:NEW_MESSAGES', addMessage)
    socket.on('ROOM:SET_USERS', setUsers);
    
  }, [])
  
  return (
   <div className="wrapper">
     {!state.joined ? <JoinBlock onLogin={onLogin} /> : <Chat {...state}  onAddMessage={addMessage} /> }
   </div>
  )
}

export default App

