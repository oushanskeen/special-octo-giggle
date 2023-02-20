import React from "react";
import {useEffect, useRef, useState,useLayoutEffect} from "react";

const PerspectiveTokensPureComponent = ({state,dispatcher}) => {

    console.log("M: PerspectiveTokensPureComponent INPUT STATE: ", state);

    const [_state,_setState] = useState(state);

    return (<>
        <div id="interval">{state.interval}</div>
        <div id="chain">{state.chain}</div>
        <div id="gainsThreshold">{state.gainsThreshold}</div>
        <div id="subInterval">{state.subInterval}</div>
        <div class="perspectiveTokens">
          {JSON.stringify(state.perspectiveTokens)}
          {
            state.perspectiveTokens &&
            state.perspectiveTokens.map(token => (
              <div class="perspectiveToken">
                <div class="tokenId">
                  token.id
                </div>
                <div class="tokenStrategy">
                  {JSON.stringify(token)}
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
