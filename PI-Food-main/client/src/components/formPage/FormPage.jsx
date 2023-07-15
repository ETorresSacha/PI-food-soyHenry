import './formPage.css'
import { useEffect,useState } from 'react'
import { useDispatch,useSelector } from "react-redux";
import { addTypeRecipe, createRecipe } from '../../redux/action';
import { useNavigate } from 'react-router-dom'



const FormPage = ()=>{
    
    const navigate = useNavigate()

    const dispatch = useDispatch()

    //----------- cargamos la lista de dietas -----------//

    useEffect(()=>{
        dispatch(addTypeRecipe())
    },[dispatch])


    //----------- llamamos las dietas -----------//

    const typesDiets = useSelector((state)=>state.typesDiets)

    
   //----------- Propiedades del input -----------//

    const [input,setInput]=useState({
        title:"",
        summary:"",
        healthScore:0,
        instructions:"",
        image:"",
        dietId:[]
    })

    //----------- Seleccionamos las dietas -----------//
    
        //const [typeDiet,setTypeDiet]=useState([])

     const addDiet = (id)=>{
         //todo----------------------------------------------------

         let nuevo = input.dietId.find(ele=>ele===id)
          if(nuevo===undefined) return setInput(input.dietId=({...input,dietId:[...input.dietId,id]}))
         return setInput({...input,dietId:input.dietId.filter(ele=>ele!==id)})


     

         //todo----------------------------------------------------
        //  let idrepetido =typeDiet.find(ele=>ele===id)
 
        // //  if(idrepetido === undefined) return setTypeDiet([...typeDiet,id]) //si no existe se añade a los tipos de dietas
         
        // //  return setTypeDiet(typeDiet.filter(ele=>ele!==id)) //se elimina lo que ya existe
     
     }
console.log(input)


     
 
    //----------- Agrego las dietas al input -----------//
    //   input.dietId=typeDiet

    //----------- Validamos las propiedades -----------//
    const changeHandle = (event)=>{
        console.log(event.target)


       setInput({...input,[event.target.name]:event.target.value})
        setError(validation({...input,[event.target.name]:event.target.value}))
    }
    console.log(input)


    //----------- Función de validacón -----------//
    const [error,setError] = useState({
        title:"",
        summary:"",
         healthScore:"",
        instructions:"",
        image:"",
        dietId:""
    })

    const validation = (input)=>{
        const inputError = {}
        
        //............title............//
        if (input.title.length < 20){
            inputError.title="El título es demasiado corto"
            }
        else if (input.title.length > 50){
              inputError.title="El título es demasiado largo"
              }
        else{
            inputError.title=""
        }

        // ............summary............//
        if (input.summary.length < 150){
              inputError.summary="El resumen del plato es demasiada corta"
              }
        else{
              inputError.summary=""
        }
        
        //............healthScore............//
        if (parseInt(input.healthScore) === 0){
              inputError.healthScore="No se añadió el health Score"
              }
        else{
              inputError.healthScore=""
        }

           //............instructions............//
        if (input.instructions.length < 150){
            inputError.instructions="Las instrucciones del plato es demasiada corta"
            }
        else{
            inputError.instructions=""
        }

         //............image............//
         if(input.image.length === 0){
            inputError.image="Debe cargar una imagen"

         }
         else if (input.image.includes("jpg","jpeg","png","data:image/jpeg;base64,")){
            inputError.image=""
            }

        else if (input.image.includes("data:image/jpeg;base64,")){
                inputError.image=""
            }
        else{
             inputError.image='El formato de la imagen debe ser "jpg","jpeg","png"' 
     
        }

                //.........tipos de dietas.........//
        if(input.dietId.length === 0){
            error.dietId="Selecciona por lo menos un tipo de dieta"

        }
        else{
            error.dietId=""
        }
        
        return inputError
  }

        //.........tipos de dietas.........//
         input.dietId.length === 0?error.dietId="Selecciona por lo menos un tipo de dieta" :error.dietId=""
  
    //------------------------ Fin de validacion---------------------------//

//console.log(error)
    //----------- Función de validacón -----------//

    const handleSubmit=async(event)=>{
        
        event.preventDefault();

         const dato = Object.values(error) // verificamos si los valores de los errores si existen y se guarda

         if (dato.some(error => error !== "")) { // si algun valor del array es diferente a "" entonces entra, sino pasa al else
           setError(error)
           window.alert("Faltan completar los datos requeridos  :(")
         } 
         else {
            dispatch(createRecipe(input))
            setInput({
                title:"",
                summary:"",
                healthScore:0,
                instructions:"",
                image:"",
                dietId:[]
            })

            //! falta borrar lo marcado de las dietas
            window.alert("Nueva receta creado correctamente  :)")
         }
   
    }

    // const changeHandleee=(event)=>{
    //     console.log(event.target)

    // }





    return(
            <div className='conteiner-form'>
                    <button id="btn-home-form" onClick={()=>navigate(`/home`)}>HOME</button>
                <form onSubmit={handleSubmit}>
                    <h1>CREAR RECETA</h1>
               
                    <section className="conteiner-inputs">

                        <div>
                            <label>Titulo: </label>
                            <input type="text" name="title" onChange={changeHandle} value={input.title}></input>
                            {error.title && <p style={{fontWeight:'bold',fontSize: '12px',lineHeight: '0.1em',color:'red'}}>{error.title}</p>}
                        </div>
                        <br/>
                        <div>
                            <label>Resumen del plato: </label>
                            <textarea type="text" name="summary"  onChange={changeHandle} value={input.summary}></textarea>
                            {error.summary && <p style={{fontWeight:'bold',fontSize: '12px',lineHeight: '0.1em',color:'red'}}>{error.summary}</p>}
                        </div>
                        <br/>
                        <div>
                            <label >Health score: </label><br/>
                            <span id="display">{input.healthScore}</span><br/>
                            <span>0</span>
                            <input type="range" id='slider' name="healthScore"  onChange={changeHandle} min="0" max="200" step="1" value={input.healthScore}></input>
                            <span>200</span>
                            {error.healthScore && <p style={{fontWeight:'bold',fontSize: '12px',lineHeight: '0.1em',color:'red'}}>{error.healthScore}</p>}
                        </div>
                        <br/>
                        <div>
                            <label>Paso a paso: </label>
                            <textarea  type="text" name="instructions" onChange={changeHandle} value={input.instructions}></textarea>
                            {error.instructions && <p style={{fontWeight:'bold',fontSize: '12px',lineHeight: '0.1em',color:'red'}}>{error.instructions}</p>}
                        </div>
                        <br/>
                        <div>
                            <label>Imagen: </label>
                            <input type="text" name="image" onChange={changeHandle} value={input.image}></input>
                            {error.image && <p style={{fontWeight:'bold',fontSize: '12px',lineHeight: '0.1em',color:'red'}}>{error.image}</p>} 
                        </div>
                        <br/>
                        <div>
                            <label id="dietas"   >Tipos de dieta: </label>
                                <ul className='scroll-diets' >
                                    {typesDiets.map(ele=>{
                                        return(
                                            <div key={ele.id}  >
                                            <input  type="checkbox"   name='dietId' value="1" onClick={()=>addDiet(ele.id)}  />
                                            <span>{ele.name}</span>
                                        </div>
                                        )
                                    })}
                                </ul>
                                    {error.dietId && <p style={{fontWeight:'bold',fontSize: '12px',lineHeight: '0.1em',color:'red'}}>{error.dietId}</p>}
                        </div>
                        <br/>
                            
                        <button type="submit">Crear receta</button>

                    </section>
                    
                </form>

</div>

    )
}

export default FormPage

// {error.title && <p style={{fontWeight:'bold',fontSize: '12px',lineHeight: '0.1em',color:'red'}}>{error.title}</p>}