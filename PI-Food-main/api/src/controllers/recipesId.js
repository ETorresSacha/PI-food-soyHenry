// -------------------------------------------------------------
//Esta configuración es para traer la apikey del archivo .env
require('dotenv').config();
const {apiKey} = process.env;
 // ------------------------------------------------------------

const axios = require('axios')
const {Recipe,Diets} = require('../db')


const byForId =async(id)=>{
    
    let dataId
    // ********************     BD     ********************
    if(isNaN(id)){
        let response = await Recipe.findByPk(id,{
            include:{
                model:Diets, 
                attributes:["name"]}
            })
        response = await response  //// es una promesa por lo tanto await

        if(response.dataValues.title){
            dataId ={
                id:response.dataValues?.id,
                title:response.dataValues?.title,
                image:response.dataValues?.image ,
                healthScore:response.dataValues?.healthScore,
                summary:response.dataValues?.summary,
                instructions:response.dataValues?.instructions,
                ingredients:response.dataValues?.ingredients,
                equipment:response.dataValues?.equipment,
                diets:response.dataValues.diets?.map(ele=>ele.name)
            }
        return dataId
        }
    }

    // ********************     API     ********************
    
        let responseApi = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}&addRecipeInformation=true`);
        responseApi = await responseApi.data;

        if(responseApi.title){
            let datosIngredientes=[]
            let datosequipment=[]
            dataId = {
                id: responseApi?.id,
                title: responseApi?.title,
                image: responseApi?.image,
                healthScore:responseApi?.healthScore,
                summary:responseApi?.summary.replace(/<[^>]+>/g, ''),
                instructions: responseApi.analyzedInstructions[0]?.steps.map(ele=>ele).map(ele=>ele.step),

                ingredients:responseApi.analyzedInstructions[0]?.steps.map(ele=>ele).map(ele=>ele.ingredients.map(ele=>{
                    if(datosIngredientes.indexOf(ele.name)===-1) datosIngredientes.push(ele.name)
                    return datosIngredientes
                })),

                equipment:responseApi.analyzedInstructions[0]?.steps.map(ele=>ele).map(ele=>ele.equipment).filter(ele=>ele.length!==0).map(ele=>ele.map(ele=>{
                    if(datosequipment.indexOf(ele.name)===-1) datosequipment.push(ele.name)
                    return datosequipment
                })),

                diets:responseApi?.diets
            };
        return dataId  
}
}

module.exports = {byForId}
