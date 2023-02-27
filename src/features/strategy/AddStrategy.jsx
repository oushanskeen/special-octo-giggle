import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { selectStrategyInterval, setInterval, setChain, setGainsThreshold, setSubInterval, fetchPerspectiveTokens, savePerspectiveTokens, fetchPerspectiveToken, savePerspectiveToken } from './strategySlice'
import { useGetAllStrategiesQuery } from '../../services/pokemon'

export default function AddStrategy(){

  // "strategy_type": "string",
  // "strategy_name": "string",
  // "gain_threshold": 0,
  // "sell_threshold": 0,
  // "gain_interval": 0,
  // "trending_interval": 0,
  // "minimum_stable_starting_balance": 0

  const saveStubStrategy = async () => {
      const send = await fetch('https://deals-stage-lax.dexguru.biz/v1/deals/strategies',{
         method: "POST",
         body: JSON.stringify({
            "strategy_type": "string",
            "strategy_name": "" + Date.now(),
            "gain_threshold": 0,
            "sell_threshold": 0,
            "gain_interval": 0,
            "trending_interval": 0,
            "minimum_stable_starting_balance": 0
        })
      })
  }

  return (
    <div class="module">
      <div class="module box">
        <form>
          <section>
              <input placeholder="type"/>
              <input placeholder="name"/>
            </section>
            <section>
              <input placeholder="gain threshold"/>
              <input placeholder="sell threshold"/>
            </section>
            <section>
            <label>
              <input placeholder="gain interval"/>
            </label>
            <label>
              <input placeholder="trending interval"/>
            </label>
            <div class='btn' onClick={saveStubStrategy}>save strategy</div>
          </section>
        </form>
      </div>
    </div>
  )
}
