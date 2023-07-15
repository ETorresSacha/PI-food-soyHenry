import axios from 'axios'


export const GET_RECIPE_ALL_NAME ="GET_RECIPE_ALL_NAME"
export const ADD_RECIPE = "ADD_RECIPE"
export const RECIPE_ID = "RECIPE_ID"
export const RESET_RECIPE_ID = "RESET_RECIPE_ID"
export const ADD_TYPE_DIET="ADD_TYPE_DIET"
export const CREATE_RECIPE="CREATE_RECIPE"
export const UPWARD_OR_FALLING="UPWARD_OR_FALLING"
export const UPWARD_OR_FALLING_TITLE="UPWARD_OR_FALLING_TITLE"
export const FILTER_FOR_STORAGE="FILTER_FOR_STORAGE"
export const FILTER_FOR_DIET="FILTER_FOR_DIET"
export const FILTER_HEALTH_SCORE="FILTER_HEALTH_SCORE"
export const RESET="RESET"
export const PAGINATED_ALL="PAGINATED_ALL"

const URL = 'http://localhost:3001/recipe' 

//-------------------   TODO Y NOMBRE   -------------------//
export const getRecipeAllName =(name)=>{
    
    return async function(dispatch){
        let response
        try {
            if(name){
                response = await axios.get(`http://localhost:3001/recipe?name=${name}`)
            }
            else{response = await axios.get(`${URL}`)}

            return dispatch({type:GET_RECIPE_ALL_NAME,payload:response.data})

        } catch (error) {
            return {erro:error.message}  
        }
    }
    
}

//-------------------   RECETA POR ID (DETAIL)   -------------------// 
export const recipeId =(id)=>{

    return async function(dispatch){
        try {
            let response = await axios.get(`http://localhost:3001/recipe/${id}`) 
                
            return dispatch({type:RECIPE_ID,payload:response.data})
            
        } catch (error) {
            return {erro:error.message} 
        }
    }
}
//-------------------   LIMPIAR EL DETAIL   -------------------// 
export const resetRecipeId =()=>{

    return {type:RESET_RECIPE_ID}
}

//-------------------   AGREGAR TIPOS DE DIETAS   -------------------//
export const addTypeRecipe = ()=>{

    return async function(dispatch){
        try {
            let response = await axios.get(`http://localhost:3001/diets`)

            return dispatch({type:ADD_TYPE_DIET,payload:response.data})
            
        } catch (error) {
            return {erro:error.message}
        }
    }
}

//-------------------   CREAR NUEVA RECETA   -------------------//
export const createRecipe = (input)=>{
    return async(dispatch)=>{
        try {
            const response = await axios.post('http://localhost:3001/createRecipe',input)

            return dispatch({type:CREATE_RECIPE,payload:response.data})

        } catch (error) {
        return {erro:error.message} 
        }
    }
}
   

        //!-------------------   FILTROS   -------------------//
//-------------------   ID   -------------------//
export const upwardOrfalling =(order)=>{

    return {type:UPWARD_OR_FALLING,payload:order}
}


//-------------------   TITULO   -------------------//
export const upwardOrfallingTitle =(order)=>{

    return {type:UPWARD_OR_FALLING_TITLE,payload:order}
}

//-------------------   API O BD   -------------------//
export const filterForStorage =(storage)=>{

    return {type:FILTER_FOR_STORAGE,payload:storage}
}


//-------------------   TIPO DE DIETA   -------------------// 
export const filterForDiets =(diet)=>{

    return {type:FILTER_FOR_DIET,payload:diet}

}

//-------------------   HEALTH SCORE   -------------------//
export const filterHealthScore =(HealthScore)=>{

    return {type:FILTER_HEALTH_SCORE,payload:HealthScore}

}


//-------------------   PAGINATED   -------------------//
export const paginatedAll =(page)=>{

    return {type:PAGINATED_ALL,payload:page}

}
       
//-------------------   RESET   -------------------// 
export const reset =()=>{
    
    return {type:RESET}
}
     
