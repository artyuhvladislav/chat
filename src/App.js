import React from 'react'

import JoinBlock from './components/JoinBlock';
import socket from './socket'
import reducer from './reducer'
import './index.css';


const App = () => {
  const [state, dispatch] = React.useReducer(reducer, {
    joined: false,
    roomID: null,
    userName: null
  })
  
  const onLogin = (obj) => {
    dispatch({
      type: 'JOINED',
      payload: obj
    })
    socket.emit('ROOM:JOIN', obj)
  }
  console.log(state)
  return (
   <div className="wrapper">
     {!state.joined && <JoinBlock onLogin={onLogin}/>}
   </div>
  )
}

export default App

