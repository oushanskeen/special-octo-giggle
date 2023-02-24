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

  return (
    <div class="module">
      <h3>add strategy</h3>
      <div class="module box">
        <div class="btn" style={{width:"10"}}>+</div>
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
          </section>
        </form>
      </div>
    </div>
  )
}
