// -------------------------------------------------------------
//Esta configuración es para traer la apikey del archivo .env
require('dotenv').config();
const {apiKey} = process.env;
 // ------------------------------------------------------------


 //------------  IMPORTACIONES  -------------
 const axios = require('axios')
 const {Recipe,Diets} = require('../db');
const { Op } = require("sequelize");



 //-----------   CODIGO   -----------  
 const recipeNameAll = async(name)=>{
    let responseApi,responseBD

//! ********************     PEDIDO DE DATOS     ********************
    if(name!==undefined){

        const minusculaname= name.toLowerCase()

        // ********************     API     ********************
            responseApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${minusculaname}&number=100&addRecipeInformation=true`);
            responseApi = responseApi.data.results;

        // ********************     BD     ********************
            responseBD = await Recipe.findAll({
                where: {title: {
                    [Op.like]: `%${minusculaname}%`
                }},
                include:{
                        model:Diets, 
                        attributes:["name"]}
                    });
            responseBD = await responseBD  //// es una promesa por lo tanto await
    }

    else{
        // ********************     API     ********************
            responseApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=100&addRecipeInformation=true`);
            
            responseApi= await responseApi.data.results


        // ********************     BD     ********************
            responseBD = await Recipe.findAll({
                    include:{
                            model:Diets, 
                            attributes:["name"]}
                        });
            responseBD = await responseBD  //// es una promesa por lo tanto await

            }


    //TODO--> Opcional-->Se le agrega las dietas al final (Api)
    // let dietsArr=[]

    // data.map(ele=>{
    //     if(ele.vegetarian === true) {if(dietsArr.indexOf("vegetarian")===-1) dietsArr.push("vegetarian")}
    //     if(ele.vegan === true) {if(dietsArr.indexOf("vegan")===-1) dietsArr.push("vegan")}
    //     if(ele.glutenFree === true) {if(dietsArr.indexOf("gluten free")===-1) dietsArr.push("gluten free")}
    //     if(ele.dairyFree === true) {if(dietsArr.indexOf("dairy free")===-1) dietsArr.push("dairy free")}
    //     return dietsArr
    // })

    // dietsArr.map(el=>{
    //     if(ele.diets.indexOf(el)===-1) ele.diets.push(el)
    // })
  
  //! ********************     MODIFICANDO LOS DATOS     ********************
        // ********************     API     ********************
        
    let dataApi=responseApi.map(ele=>{   
        let datosIngredientes=[]
        let datosequipment=[]
        const retornarData ={
            id:ele?.id,
            title:ele?.title,
            image:ele?.image,
            healthScore:ele?.healthScore,
            summary:ele?.summary,
            instructions:ele.analyzedInstructions[0]?.steps.map(step =>step.step),
            ingredients:ele.analyzedInstructions[0]?.steps.map(ele =>ele.ingredients.map(ele=>ele).map(ele=>{
                if(datosIngredientes.indexOf(ele.name)===-1) datosIngredientes.push(ele.name)
                return datosIngredientes
            })),

            equipment:(ele.analyzedInstructions[0]?.steps.map(ele =>ele.equipment).filter(ele=>ele.length!==0).map(ele=>ele.map(ele=>{
                if(datosequipment.indexOf(ele.name)===-1) datosequipment.push(ele.name)
                return datosequipment
            }))),


            
            diets:ele?.diets,
        }
        return retornarData
    })


        // ********************     BD     ********************
    let dataBD=responseBD.map(ele=>{
        const valoresFinale ={
            id:ele.dataValues?.id,
            title:ele.dataValues?.title,
            image:ele.dataValues?.image ,
            healthScore:ele.dataValues?.healthScore,
            summary:ele.dataValues?.summary,
            instructions:ele.dataValues?.instructions,
            ingredients:ele.dataValues?.ingredients,
            equipment:ele.dataValues?.equipment,
            diets:ele.dataValues?.diets.map(ele=>ele.name)
        }
        return valoresFinale
    })

    return [...dataApi,...dataBD]
 }
 

 module.exports={recipeNameAll}


