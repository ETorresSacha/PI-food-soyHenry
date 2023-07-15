import { useParams } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import { recipeId, resetRecipeId } from "../../redux/action";
import { useNavigate } from 'react-router-dom'
import './detail.css'











const DetailRecipe =()=>{
    const navigate = useNavigate()
    const {id}=useParams()
    const dispatch = useDispatch()
    
    // cargamos el detail
    useEffect(()=>{
         dispatch(recipeId(id))
        return ()=>dispatch(resetRecipeId())
    },[id,dispatch])
    
    //llamamos el  reducerDetail del estado global
    const detailRecipe =useSelector((state) => state.recipeDetail)
    //console.log(detailRecipe)
    //console.log(detailRecipe.summary.replace(/<[^>]+>/g, ''))

    return(
        <div>
            <button onClick={()=>navigate(`/home`)}>Home</button>
            <div>
                <h1>{detailRecipe?.title}</h1>
                <img src={detailRecipe?.image} alt={detailRecipe?.nombre}/>
                <h2>{detailRecipe.summary}</h2>
                <h5>Health score:{detailRecipe?.healthScore}</h5>
                <h4>Instrucciones</h4>
                <h5>{detailRecipe?.instructions}</h5> 
                <h4>Tipos de dieta</h4>
                <h5>{detailRecipe.diets}</h5>
                
 



            </div>
            
        </div>
    )
}

export default DetailRecipe


