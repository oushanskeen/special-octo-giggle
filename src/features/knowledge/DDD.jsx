import React from 'react'
import useQuantitySelector from './useQuantitySelector'

const QuantitySelector = () => {
    const {onClickPlus, onClickMinus, state } = useQuantitySelector()
    const { value, message } = state
    return (
        <div class='quantitySelector'>
            <h3>DDD component</h3>
            <button onClick ={onClickMinus} class="button">
                -
            </button>
            <div class='number'>{value}</div>
            <button onClick ={onClickPlus} class="button">
                +
            </button>
            <div class='message'>{message}</div>
            <h3></h3>
        </div>
    )
}

const DDD = () => {
  return (
    <>
      <div>
          <QuantitySelector/>
      </div>
    </>
  )
}

export default DDD
