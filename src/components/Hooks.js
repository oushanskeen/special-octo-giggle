import React from 'react'
import ContextHook from './HooksSketchbook/ContextHook'
import ChatHook from './HooksSketchbook/ChatHook'
import ConnectionHook from './HooksSketchbook/ConnectionHook'

export default function Hooks(){

  return (
    <div class="module">
      <ContextHook/>
      <ChatHook/>
      <ConnectionHook/>
    </div>
  )
}
