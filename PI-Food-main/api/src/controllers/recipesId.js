// -------------------------------------------------------------
//Esta configuración es para traer la apikey del archivo .env
require('dotenv').config();
const {apiKey} = process.env;
 // ------------------------------------------------------------

const axios = require('axios')
const {Recipe,Diets} = require('../db')


//! GET ALL
const recipeId = async(req,res)=>{
    try {
        const { id } = req.params;
        // const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}&addRecipeInformation=true`);
    
        // const data = response.data;

        //     const recipe = {
        //         id: data.id,
        //         title: data.title,
        //         image: data.image,
        //         healthScore:data.healthScore,
        //         diets:data.diets,
        //         sumary:data.summary,
        //         stepByStep: data.analyzedInstructions.map(step => step.steps)
        //     };
    
        //     return data.title 
        //     ? res.status(200).json(recipe) 
        //     : res.status(404).json({error: error.message});

        const response = await Recipe.findByPk(id,{
            include:{
                model:Diets, 
                attributes:["name"]}
        })
        console.log(response)
        return res.status(200).json(response) 
    
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
    
    
    
    
}


module.exports = {recipeId}


//! OJO: cuando se crea relaciones de tablas con tablas, tienes que usar set para ralacionarlo, esto ayuda cuando en el momento de crear una receta 
//!se agrega el dietId para que esten relacionados, ahora para llamarlo se tiene que añadir "include:{model:Diets}" para llamarlo los datos de la tabla "diet"
//! e incluirlo en el resultado final.

//todo--> falta ordenar, mejorar, entender bien su funcionamiento, y cuando se llama las dietas solo venga por el name "ojitoooooooo"
