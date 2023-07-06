// -------------------------------------------------------------
//Esta configuración es para traer la apikey del archivo .env
require('dotenv').config();
const {apiKey} = process.env;
 // ------------------------------------------------------------

 const axios = require('axios')
 const {Diets} = require('../db')

 //! FUNCION PARA CREAR EL ARRAY CON LOS TIPOS DE DIETAS
 const typesDietsFuntion = async()=>{
    const tiposDieta =['vegetarian','lacto-vegetarian','ovo vegetarian','paleo','low FODMAP' ]
    //const tiposDieta =['gluten free','ketogenic','vegetarian','lacto-vegetarian','ovo vegetarian','vegan','paleo','primal','low FODMAP','whole 30', ]
    const dieta = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true&number=100`)
    const valor =dieta.data.results

    //!PRIMERA FORMA
    // for(let i =0;i<valor.length;i++){
    //     const x= valor[i].diets
    //     for(let j=0;j<x.length;j++){
    //         if(tiposDieta.indexOf(x[j])===-1) { // El indexOf--> recorre el array "tiposDieta" preguntando si existe un elemento o no
    //             tiposDieta.push(x[j]) // en caso que no existe entra al if y pushea
    //         }
    
    //     }

    // } 
    //! SEGUNDA FORMA
    //TODO--> En este caso mapeamos el array de objetos(valor), despues ingresamos a su propiedad de diets y mapeamos este array(element.diets), despues
    //TODO--> pasamos a verificar con indexOF si existe algun elemento de "element.diets" en "tiposDieta", si no existe lo agrega, de lo contrario devuelve el array inicial (tiposDieta).
    valor.map(element=>{
        element.diets.map(ele=>{
            if(tiposDieta.indexOf(ele)===-1) tiposDieta.push(ele) 
        })
    }) 
    return tiposDieta.sort()

 }


 const typeDiets = async(req,res)=>{
    try {
        const arrayDiets = await typesDietsFuntion()
        
        res.status(200).json(arrayDiets)
        // ***** AGREGAR LOS TIPOS DE DIETAS A LA BASE DE DATOS *****
         arrayDiets.forEach(async(ele)=>{
            await Diets.create({
                name:ele
            })
            
        })
        


    } catch (error) {
        res.status(500).json({error:error.message})
        
    }

 }

 module.exports={typeDiets}


 //! * en em momento de agregar a la base de datos no debe de cargarse repetidos
 //! * ver si al renderizar vamos a traer de la api y la base de  datos juntos

 