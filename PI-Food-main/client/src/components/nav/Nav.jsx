import React from 'react'
import Search from './Search'
import { useNavigate } from 'react-router-dom'
import './nav.css'

function Nav() {

  const navigate = useNavigate()
  return (
    <div id='conteiner-nav'>
        <button className='input-nav' onClick={()=>navigate(`/`)}>EXIT</button>
        <Search/>
        <button className='input-nav' onClick={()=>navigate(`/form`)}>NEW RECIPE</button>
    </div>
  )
}

export default Nav