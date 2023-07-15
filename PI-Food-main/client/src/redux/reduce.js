import {GET_RECIPE_ALL_NAME, RECIPE_ID, RESET_RECIPE_ID,ADD_TYPE_DIET,CREATE_RECIPE,UPWARD_OR_FALLING,UPWARD_OR_FALLING_TITLE,FILTER_FOR_STORAGE,RESET, FILTER_FOR_DIET,FILTER_HEALTH_SCORE,PAGINATED_ALL} from './action'
import  { sumaUnicode } from './fun-sum-unicode'// Función para calcular el valor numerico del Id de los datos de la BD

const initialState={
    recipe:[],
    recipeFilter:[],
    recipeFilterAll:[],
    recipeFilterDiets:[],
    recipeFilterHealthScore:[],
    recipeDetail:{},
    typesDiets:[],
    createRecipe:[],
    paginaActual:1,
    recipeForPage:2,//cantidad de cards por pagina(puede cambiar)
    reset:[]

}

const reducer=(state=initialState,action)=>{
    switch (action.type){

        //-------------------   TODO Y NOMBRE   -------------------//
        case GET_RECIPE_ALL_NAME:
            return {...state,
                recipe:action.payload,
                recipeFilter:action.payload,
                recipeFilterAll:action.payload,
                recipeFilterDiets:action.payload,
                recipeFilterHealthScore:action.payload,
                reset:action.payload
                }

        //-------------------   RECETA POR ID (DETAIL)   -------------------// 
        case RECIPE_ID:
            return {...state,
                recipeDetail:action.payload
            }

        //-------------------   LIMPIAR EL DETAIL   -------------------// 
        case RESET_RECIPE_ID:
            return {...state,
                recipeDetail:{}
            }

        //-------------------   AGREGAR TIPOS DE DIETAS   -------------------// 
        case ADD_TYPE_DIET:
            return {...state,
                typesDiets:action.payload
            }

        //-------------------   CREAR NUEVA RECETA   -------------------// 
        case CREATE_RECIPE:
            return {...state,
                createRecipe:[...state.createRecipe,action.payload]
            }

                //!-------------------   FILTROS   -------------------//
        //-------------------   ID   -------------------//
        case UPWARD_OR_FALLING:{

                let stringId=[]
                let numberId=[]
                state.recipeFilter.map(ele=>typeof (ele.id) ==="string"?stringId.push(ele): numberId.push(ele))

                if(action.payload === "Ascendente"){

                        const ordenBD=stringId.sort((a,b)=>sumaUnicode((a.id),0)-sumaUnicode((b.id),0))

                        const ordenMenorMayor = numberId.sort((a,b)=>a.id-b.id)
                    return {...state,
                            recipe:[...ordenBD,...ordenMenorMayor],
                            recipeFilter:[...ordenBD,...ordenMenorMayor]
                        }
                    }

                else if(action.payload === "Descendente"){

                        const ordenBD=stringId.sort((a,b)=>sumaUnicode((b.id),0)-sumaUnicode((a.id),0))
                       
                        const ordenMayorMenor = numberId.sort((a,b)=>b.id-a.id)
                    return {...state,
                            recipe:[...ordenMayorMenor,...ordenBD],
                            recipeFilter:[...ordenMayorMenor,...ordenBD]
                        }
                    }
                else return
                }

         //-------------------   TITULO   -------------------//
        case UPWARD_OR_FALLING_TITLE:{
                if(action.payload === "A-Z"){
                        
                        
                    const filterNameA= state.recipeFilter.sort((a,b)=>a.title.localeCompare(b.title))

                    return {...state,
                            recipe:[...filterNameA],
                            recipeFilter:[...filterNameA],
                        }
                    }

                else if(action.payload === "Z-A"){
                        const filterNameD= state.recipeFilter.sort((a,b)=>b.title.localeCompare(a.title))
                    return {...state,
                            recipe:[...filterNameD],
                            recipeFilter:[...filterNameD],
                        }
                    }
                else return
                }

        //-------------------   API O BD   -------------------//
        case FILTER_FOR_STORAGE:{
                    let api=[]
                    let baseDatos=[]
                    state.recipeFilterAll.map(ele=>typeof (ele.id) ==="string"?baseDatos.push(ele): api.push(ele))
                if(action.payload==="API"){
                    return {...state,
                            recipe:[...api],
                            recipeFilter:[...api],
                            recipeFilterDiets:[...api]
                        }
                    }
                else if (action.payload==="BASE DE DATOS"){
                    return {...state,
                            recipe:[...baseDatos],
                            recipeFilter:[...baseDatos],
                            recipeFilterDiets:[...baseDatos]
                        }
                    }
                else return
                }

        //-------------------   TIPO DE DIETA   -------------------//      
        case FILTER_FOR_DIET:{

                    let recipeForDiet=[]

                    state.recipeFilterDiets.map(element=>{
                if(element.diets.includes(action.payload)) recipeForDiet.push(element)})

                if(action.payload ==="diets") return
                    
                    return {...state,
                            recipe:[...recipeForDiet],
                            recipeFilter:[...recipeForDiet]
                        }        
                }
        //-------------------   HEALTH SCORE   -------------------//
        case FILTER_HEALTH_SCORE:{
                   
                    let array

                    (state.recipeFilter.length!==state.recipeFilterHealthScore.length)? array=state.recipeFilter:array=state.recipeFilterHealthScore
                   
                if(action.payload === "Ascendente"){
                        
                    const healthScoreAsc= array.sort((a,b)=>a.healthScore-(b.healthScore))
    
                    return {...state,
                            recipe:[...healthScoreAsc],
                            recipeFilter:[...healthScoreAsc],
                        }
                    }
    
                else if(action.payload === "Descendente"){
                            const healthScoreDesc=array.sort((a,b)=>b.healthScore-(a.healthScore))
                    return {...state,
                            recipe:[...healthScoreDesc],
                            recipeFilter:[...healthScoreDesc],
                        }
                    }
                 else return
                }

        //-------------------   PAGINADO   -------------------// 
        case PAGINATED_ALL:
            return {...state,
            paginaActual:action.payload
        }
        

        //-------------------   RESET   -------------------//      
        case RESET:
                return{...state,
                    recipe:[...state.reset],
                    recipeFilter:[...state.reset],
                    recipeFilterDiets:[...state.reset],
                    recipeFilterHealthScore:[...state.reset]
                }

        default:
            return {...state}
    }

}
export default reducer




