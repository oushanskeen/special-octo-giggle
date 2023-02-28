// https://dev.to/raaynaldo/rtk-query-tutorial-crud-51hl

import React from 'react'
import CRUD_albums from './CRUD_albums'
import CRUD_newAlbumForm from './CRUD_newAlbumForm'

export default function CRUD(){
  return (
    <>
      <div class="module">
        <CRUD_albums/>
        <CRUD_newAlbumForm/>
      </div>
    </>
  )
}
