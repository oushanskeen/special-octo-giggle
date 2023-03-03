import React from "react"
import {useEffect, useRef, useState,useLayoutEffect} from "react"
import { useSelector, useDispatch } from 'react-redux'
import Strategy from "../features/strategy/Strategy"
import StrategiesList from "../features/strategy/StrategiesList"
import AddStrategy from "../features/strategy/AddStrategy"
import Wallets from "../features/wallets/Wallets"

const PerspectiveTokens = () => {

  return (
      <div class="perspectiveTokens module">
          <Strategy/>
          <StrategiesList/>
          <Wallets/>
      </div>
  );
}


export default PerspectiveTokens;
