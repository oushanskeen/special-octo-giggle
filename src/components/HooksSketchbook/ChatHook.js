import React from 'react'
import { useState, useEffect,useContext, useReducer } from 'react'
import useChatRoom from '../../hooks/useChatRoom'
import useOnlineStatus from '../../hooks/useOnlineStatus'

const ChatRoom = ({ roomId }) => {

  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  useChatRoom({
    roomId: roomId,
    serverUrl: serverUrl
  });

  return (
    <div>
      <label>
        Server URL:
        <input value={serverUrl} onChange={e => setServerUrl(e.target.value)} />
      </label>
      <h3>Welcome to the {roomId} room!</h3>
    </div>
  );
}

export default function ChatHook(){
  const [roomId, setRoomId] = useState('general');
  return (
    <div class="module">
      <h3>advanced chat hook</h3>
      <div class="module" style={{padding:'12px'}}>
      <div style={{padding:'12px'}}>
      <label>
        Choose the chat room:{' '}
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="general">general</option>
          <option value="travel">travel</option>
          <option value="music">music</option>
        </select>
      </label>
      </div>
      <ChatRoom roomId={roomId}/>
      </div>
    </div>
  );
}
