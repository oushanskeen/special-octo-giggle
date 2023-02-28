// https://sairys.medium.com/react-separating-responsibilities-using-hooks-b9c90dbb3ab9

import React from 'react'
import DDD from './DDD'
import CRUD from './CRUD'

const BestPractices = () => {
  return (
    <div class="module">
      <DDD/>
      <CRUD/>
    </div>
  )
}

export default BestPractices
