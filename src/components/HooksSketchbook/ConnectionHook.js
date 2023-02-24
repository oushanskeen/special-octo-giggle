import React from 'react'
import { useState, useEffect,useContext, useReducer } from 'react'
import useOnlineStatus from '../../hooks/useOnlineStatus'

function StatusBar() {
  const isOnline = useOnlineStatus();
  return <h2>{isOnline ? '✅ Online' : '❌ Disconnected'}</h2>;
}

function SaveButton() {
  const isOnline = useOnlineStatus();

  function handleSaveClick() {
    console.log('✅ Progress saved');
  }

  return (
    <div class="btn" disabled={!isOnline} onClick={handleSaveClick} style={{width:'200px'}}>
      {isOnline ? 'Save progress' : 'Reconnecting...'}
    </div>
  );
}

export default function ConnectionHook(){
  return (
    <>
      <div class="module">
        <h3>connection hook</h3>
        <div class="module" style={{padding:'15px'}}>
          <StatusBar/>
          <SaveButton/>
        </div>
      </div>
    </>
  )
}
