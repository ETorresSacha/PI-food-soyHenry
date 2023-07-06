// -------------------------------------------------------------
//Esta configuración es para traer la apikey del archivo .env
require('dotenv').config();
const {apiKey} = process.env;
 // ------------------------------------------------------------


 //------------  IMPORTACIONES  -------------
 const axios = require('axios')
 const {Recipe} = require('../db')


 //-----------   CODIGO   -----------  
 const recipeName = async(name)=>{
    const minusculaname= name.toLowerCase()
    const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${minusculaname}&number=2`);
    data = response.data.results;
    return data
 }
 

 const recipeNames = async(req,res)=>{
    
    //! POR NAME
     const {name}  = req.query; 

     try{
         if(name){

                // ********************     API     ********************
                const data = await recipeName(name) // LLamamos a la función
                console.log(data)


                // ********************     BD     ********************
                let response = await Recipe.findAll({
                    where: {title: name}});
                response = await response  //// es una promesa por lo tanto await
                
                //todo-->FALTA: DEBEMOS ENCONTRA POR LA CARACTERISTICA EN EL NOMBRE

                // ********************     RESULT     ********************
                let dataForName= [...data,...response] 
                if(dataForName.length!==0) return res.status(200).json(dataForName);

                return res.status(404).json({error:'Recipe Not found'});
        }
    //! SI NO EXISTE UN NAME

        // ********************     API     ********************
        const responsealldata = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=2&addRecipeInformation=true`);
        const data=responsealldata.data.results


        // ********************     BD     ********************
        let response = await Recipe.findAll();


        // ********************     RESULT     ********************
        return res.status(200).json([...data,...response]);  
    

    } catch(error){
       return res.status(500).json({error: error.message});
    }
    

 }

 module.exports={recipeNames}

 