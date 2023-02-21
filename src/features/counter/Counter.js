import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, incrementByAmount } from './counterSlice'
// import styles from './Counter.module.css'

export function Counter() {

  const count = useSelector(state => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <div class="module">
        <div
          class="btn"
          aria-label="Increment value"
          onClick={() => dispatch(incrementByAmount(2))}
        >
          Increment
        </div>
        <span>{count}</span>
        <div
          class="btn"
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </div>
      </div>
    </div>
  )
}
