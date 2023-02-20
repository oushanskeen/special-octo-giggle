import React from "react";
import {useEffect, useRef, useState,useLayoutEffect} from "react";

const Accounts = ({state,dispatcher}) => {

    console.log("M: PerspectiveTokensPureComponent INPUT STATE: ", state);

    const [_state,_setState] = useState(state);

    return (<>
        <div class="accountRecords">
            {
              // JSON.stringify(state.strategies)
              state.strategies && state.strategies.map(strategy => (
              <div class="strategy">
                <div id="strategyName">
                    {strategy.strategy_name}
                </div>
                <div id="walletAddress">
                    {strategy.wallet_address}
                </div>
                <div id="balanceToken">
                    {strategy.balance_token["1"]}
                </div>
                <div id="nativeToken">
                    {strategy.native_token["1"]}
                </div>
                <div id="gainThreshold">
                    {strategy.gain_threshold}
                </div>
                <div id="sellThreshold">
                    {strategy.sell_threshold}
                </div>
                <div id="gainInterval">
                    {strategy.gain_interval}
                </div>
                <div id="trendingInterval">
                    {strategy.trending_interval}
                </div>

              </div>
            ))
          }
        </div>


      </>
    );
}

export default Accounts;
