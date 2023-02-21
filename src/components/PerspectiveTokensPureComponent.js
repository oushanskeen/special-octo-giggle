import React from "react";
import {useEffect, useRef, useState,useLayoutEffect} from "react";

const PerspectiveTokensPureComponent = ({state={
  interval:0,
  chain:0,
  gainsThreshold:0,
  subInterval:0
},dispatcher}) => {

    // console.log("M: PerspectiveTokensPureComponent DISPATCHER: ", dispatcher);

    let [_state,_setState] = useState(state);

    useEffect(() => {
      console.log("UPDATE INTERVAL: ", _state)
    },[_state]);

    const handleSetInterval = async (value) => {
      const newState = await dispatcher("SET_VALUE", value, _state);
      _setState(newState);
    }
    // <Slider id={"interval"} state={_state.interval} scope={[1,2,3]}/>
    return (<>
          <div id="interval">{_state.interval}</div>
          <div class="module sliderbox">
            <div id="intervalRangeValue">interval: {_state.interval}</div>
            <input id="interval" type="range" min="0" max="100" value={_state.interval} onChange={async (e) => handleSetInterval(e.target.value)} class="slider" step="1"/>
          </div>
          <div id="chain">{state.chain}</div>
          <div id="gainsThreshold">{state.gainsThreshold}</div>
          <div id="subInterval">{state.subInterval}</div>
          <div class="perspectiveTokens">
          {
            state.perspectiveTokens &&
            state.perspectiveTokens.map(token => (
              <div class="perspectiveToken">
                <div class="tokenId">
                  token.id
                </div>
                <div class="tokenStrategy">
                  token.strategy
                </div>
              </div>
            ))
          }
        </div>
      </>
    );
}

export default PerspectiveTokensPureComponent;
