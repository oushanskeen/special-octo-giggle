import React from "react";
import ReactSlider from "react-slider";
import {useEffect, useRef, useState,useLayoutEffect} from "react";

const DevModule = ({name="...", state ="...state",msg="...msg"}) => {
  return (
    <div class="dev_module">
      <div>
        name: {name}
      </div>
      <div>
        state: {JSON.stringify(state)}
      </div>
      <div>
        msg: {JSON.stringify(msg)}
        {
          // <div class="bullet">
          //   from: {msg.from}
          // </div>
          // <div class="bullet">
          //   to: {msg.to}
          // </div>
          // <div class="bullet">
          //   payload: {msg.payload}
          // </div>
        }
      </div>
    </div>
  )
}

  export default DevModule;
