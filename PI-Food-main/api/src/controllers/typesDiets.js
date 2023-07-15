// -------------------------------------------------------------
//Esta configuración es para traer la apikey del archivo .env
require('dotenv').config();
const {apiKey} = process.env;
 // ------------------------------------------------------------

 const axios = require('axios')


 //! FUNCION PARA CREAR EL ARRAY CON LOS TIPOS DE DIETAS
 const typesDietsFuntion = async()=>{

    const tiposDieta =[]

    const dieta = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true&number=100`)
    const valor =dieta.data.results

    // **********************************    DIETAS SUELTAS    **********************************
    valor.map(prop=>{
        const arrayOfkeys = Object.keys(prop)
        const filterDiet = arrayOfkeys.filter(typediet=>typediet==='vegetarian'||typediet==='vegan'||typediet==='gluten free'||typediet==='dairy free')
      
        filterDiet.map(elemen=>{
            if(tiposDieta.indexOf(elemen)===-1) tiposDieta.push(elemen)
        })

    })

    // ****************   DIETAS QUE SE ENCUENTRAN DENTRO DEL ARRAY DE diets   ****************
   
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

    // ************************    RETORNA TODO EL ARRAY DE DIETAS    ************************
    return tiposDieta.sort()

 }

 module.exports={typesDietsFuntion}

 