import './homePage.css'

import { useEffect } from "react"
import { useDispatch,useSelector } from "react-redux";
import { addTypeRecipe, filterForStorage, getRecipeAll, reset, upwardOrfalling,upwardOrfallingTitle,filterForDiets, filterHealthScore} from "../../redux/action";
import HomeCard from './HomeCard';
import Nav from '../nav/Nav';
import Paginado from '../Paginado/Paginado';


const HomePage = ()=>{

    const dispatch = useDispatch();
    //-------------------   PAGINADO   -------------------//

      const recipesAll = useSelector(state => state.recipe);
      const recipeFilter = useSelector(state => state.recipeFilter);

      const  paginaActual= useSelector(state => state.paginaActual);
      const recipeForPage = useSelector(state => state.recipeForPage);

      const inicio = (paginaActual - 1) * recipeForPage;

      const final = inicio + recipeForPage;

      const cards = recipeFilter.slice(inicio, final);




     //-------------------   CARGAMOS LOS ESTADOS CON LAS RECETAAS   -------------------//
    useEffect(()=>{

        !recipeFilter.length && dispatch(getRecipeAll())
        recipeFilter.length !== recipesAll.length && dispatch(filterForStorage())
    },[dispatch])


                //-------------------   FILTROS   -------------------//
        //-------------------   ID   -------------------//
    const handleOrder=(event)=>{
        dispatch(upwardOrfalling(event.target.value))
    }

     //-------------------   TITULO   -------------------//

    const handleOrdertitle=(event)=>{
        dispatch(upwardOrfallingTitle(event.target.value))
    }
    
    //-------------------   API O BD   -------------------//
    const handleOrderForStorage =(event)=>{
        dispatch(filterForStorage(event.target.value))

    }

    //-------------------   TIPO DE DIETA   -------------------//
        //.......cargamos y traemos las dietas
        useEffect(()=>{
            dispatch(addTypeRecipe())
        },[dispatch])
        
        const typeDiet = useSelector((state)=>state.typesDiets)
      

        const handleFilterDiets =(event)=>{
            dispatch(filterForDiets(event.target.value))
    
        }

    //-------------------   HEALTH SCORE   -------------------//
        const handleOrderHealthScore =(event)=>{
            dispatch(filterHealthScore(event.target.value))

        }


    //-------------------   RESET   -------------------// 
    const resetAllRecipe =()=>{
        dispatch(getRecipeAll())

    }


    return(
        <div className="conteiner-homePage">
            <div>
                <Nav/>
            </div>
            
            <section id='section-home'>
                <div>
                    <select className='input' placeholder='Orden' onChange={handleOrder}>
                        <option  >Order</option>
                        <option value="Ascendente" >Ascendente</option>
                        <option value="Descendente">Descendente</option>
                    </select>
                </div>

                <div>
                    <select className='input' placeholder='Orden' onChange={handleOrdertitle}>
                        <option  >Select for name</option>
                        <option value="A-Z" >A-Z</option>
                        <option value="Z-A">Z-A</option>
                    </select>    
                </div>

               
               <div>
                    <select className='input' placeholder='Orden' onChange={handleOrderForStorage}>
                        <option  >Filter for storage</option>
                        <option value="API" >API</option>
                        <option value="BASE DE DATOS">BASE DE DATOS</option>
                    </select>
               </div>

               <div>
                    <select className='input' placeholder='Type Diet' onChange={handleFilterDiets}>
                            <option  value="diets">type of diets</option>
                            {typeDiet.map((diet)=>(
                            <option  key= {diet.id} value={diet.name} >{diet.name}</option>
                            ))}
                    </select>
               </div>

                <div>
                    <select className='input' placeholder='Orden' onChange={handleOrderHealthScore}>
                        <option  >Health Score</option>
                        <option value="Ascendente" >Ascendente</option>
                        <option value="Descendente">Descendente</option>
                    </select>
                </div>

                <div>
                    <button className='input' onClick={resetAllRecipe}>Reset</button>
                    {/* <input type="reset" value="Restaurar"></input> */}
                </div>
            </section>

            <div className="recipe">
                <HomeCard recipesAll={cards}/>
            </div>
            <Paginado/>
        </div>
    )
}

export default HomePage

