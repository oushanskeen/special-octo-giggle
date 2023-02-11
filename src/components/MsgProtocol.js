import React from "react";
import ReactSlider from "react-slider";
import {useEffect, useRef, useState,useLayoutEffect} from "react";
import DevModule from "./DevModule";

const MsgProtocol = () => {

  const [STATE,SET_STATE] = useState({
    speaker:{},
    observerOne:{},
    observerTwo:{},
    observerThree:{},
  });
  const [MSG,SET_MSG] = useState("...");

  useEffect(() => {
      // SET_STATE({...STATE,speaker:msg})
  },[STATE])

  const dispatcher = ({msg,payload}) => {
  }

  const Speaker = () => {
    const [state,setState] = useState({});
    const [msg,setMsg] = useState("...");

    useEffect(() => {
        // msg == 1 || msg == 2 || msg == 3 || SET_STATE({...STATE,speaker:msg})
        // dispatcher("MESSAGE_RECEIVED","speaker")
    },[STATE.speaker,state,msg])

    return (
      <div class="module">
       <div class="box">
          <button class="btn" onClick={() => setMsg(1)}>1</button>
          <button class="btn" onClick={() => setMsg(2)}>2</button>
          <button class="btn"  onClick={() => setMsg(3)}>3</button>
       </div>
        <DevModule name="Speaker" state={state} msg={msg}/>
      </div>
    );
  }

  const ObserverOne = () => {
    const [state,setState] = useState({});
    const [msg,setMsg] = useState("...");

    useEffect(() => {

    },[STATE,state,msg])

    return (
      <div class="module">
        <DevModule name="ObserverOne" state={state} msg={msg}/>
      </div>
    );
  }

  const ObserverTwo = () => {
    const [state,setState] = useState({});
    const [msg,setMsg] = useState("...");

    useEffect(() => {

    },[STATE,state,msg])

    return (
      <div class="module">
        <DevModule name="ObserverTwo" state={state} msg={msg}/>
      </div>
    );
  }

  const ObserverThree = () => {
    const [state,setState] = useState({});
    const [msg,setMsg] = useState("...");

    useEffect(() => {

    },[STATE,state,msg])

    return (
      <div class="module">
        <DevModule name="ObserverThree" state={state} msg={msg}/>
      </div>
    );
  }

  return (
    <div class="module">
      Msg Protocol
      <Speaker/>
      <ObserverOne/>
      <ObserverTwo/>
      <ObserverThree/>
      <DevModule name="Message Protocol Sandbox" state={STATE} msg={MSG}/>
    </div>
  );
}

export default MsgProtocol;
