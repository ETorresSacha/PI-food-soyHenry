import React from 'react'
import { useSelector,useDispatch } from "react-redux";
import { paginatedAll } from '../../redux/action';



function Paginado() {

    const dispatch=useDispatch()
    const pagina = useSelector(state=>state.paginaActual)
    const cardPagina = useSelector(state=>state.recipeForPage)
    const recipeAll= useSelector(state=>state.recipe)

    const totalPaginas=Math.ceil(recipeAll.length/cardPagina)

    const handelPage=(page)=>{
        dispatch(paginatedAll(page))
    }

    const bottunForPage=()=>{
        let array=[]
        for(let i=1;i<=totalPaginas;i++){
            array.push(
                <button key={i} onClick={()=>handelPage(i)}>{i}</button>
            )
        }
        return array
    }

  return (
    <div>
            <button onClick={()=>handelPage(pagina-1)} disabled={pagina<=1}>ATRAS</button>
            <div>{bottunForPage()}</div>
            <button onClick={()=>handelPage(pagina+1)}disabled={pagina>=totalPaginas}>NEXT</button>

    </div>


  )
}

export default Paginado