import React from "react"
import {useEffect, useRef, useState,useLayoutEffect} from "react"
import { useSelector, useDispatch } from 'react-redux'
import Strategy from "../features/strategy/Strategy"

const PerspectiveTokens = () => {

  return (
      <div class="perspectiveTokens module">
          <Strategy/>
      </div>
  );
}


export default PerspectiveTokens;
