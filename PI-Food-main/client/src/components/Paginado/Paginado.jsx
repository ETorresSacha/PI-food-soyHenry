import React from 'react'
import { useSelector,useDispatch } from "react-redux";
import { paginatedAll } from '../../redux/action';
import './paginado.css'



function Paginado() {

    const dispatch=useDispatch()
    const pagina = useSelector(state=>state.paginaActual)
    const cardPagina = useSelector(state=>state.recipeForPage)
    const recipeFilter= useSelector(state=>state.recipeFilter)

    const totalPaginas=Math.ceil(recipeFilter.length/cardPagina)

    const handelPage=(page)=>{
        dispatch(paginatedAll(page))
    }

    const bottunForPage=()=>{
        let array=[]
        for(let i=1;i<=totalPaginas;i++){
            array.push(
                <button className="btn-page" key={i} onClick={()=>handelPage(i)}>{i}</button>
            )
        }
        return array
    }

  return (
    <div className='conteiner-paginado'>
            <button className="atra-adelante" onClick={()=>handelPage(pagina-1)} disabled={pagina<=1}>{"<<"}</button>
            <div className='conteiner-btn-page' >{bottunForPage()}</div>
            <button className="atra-adelante" onClick={()=>handelPage(pagina+1)}disabled={pagina>=totalPaginas}>{">>"}</button>

    </div>


  )
}

export default Paginado