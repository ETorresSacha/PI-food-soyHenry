import React from 'react'
import './paginado.css'



function Paginado({numberOfRecets,page,recipeForPage,setPage, index, setIndex}) {

    const pageNumber=[]
    for(let i=1;i<=Math.ceil(numberOfRecets/recipeForPage);i++){
        pageNumber.push(i)
    }

    const numBotones = 5 // este es el numero de botones que queremos renderizar
    //todo--> FUNCIONA PARA UN NUMERO DE BOTONES IMPAR, SI SE QUIERE PONER PARA UN NUMERO PAR SE TIENE QUE MODIFICAR LA LOGICA EN EL CSS DEL BOTON "NEXT" (numBotones-1)

    const pagePrevius =()=>{

        setIndex(index-numBotones)
        if(page%numBotones===0) setPage(numBotones*(Math.trunc(page/numBotones)-2)+1)
        else setPage(numBotones*(Math.trunc(page/numBotones)-1)+1)
    }

    const pageNext=()=>{
        setIndex(index+numBotones)
        const suma=page+numBotones
        if(suma%numBotones===0) setPage(numBotones*((suma/numBotones)-1)+1)
        else setPage(numBotones*(Math.trunc(suma/numBotones))+1) 
    }

    const specificPage=(page)=>{
        setPage(page)
    }


  return (
    <div className='conteiner-paginado'>
            <button className={`${page<=numBotones?'atras-adelante-desactive':'atras-adelante'}`} onClick={pagePrevius} disabled={page<=1}>{"<<"}</button>
            {pageNumber.map(noPage=>(
                <button key={noPage}  onClick={()=>specificPage(noPage)} className={`${noPage===page ? 'btn-page-active':'btn-page'}`}>{noPage}</button>
            )).slice(index,index+numBotones)}
            <button   className={`${pageNumber.length%numBotones===0 && page>=pageNumber.length-(numBotones-1) ? 'atras-adelante-desactive':(page>=(numBotones*Math.trunc(pageNumber.length/numBotones)+1)?'atras-adelante-desactive':'atras-adelante')}`} onClick={pageNext} disabled={page>=pageNumber.length}>{">>"}</button>
    </div>
  )
}

export default Paginado