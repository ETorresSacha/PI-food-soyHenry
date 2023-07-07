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
 const recipeName = async(name)=>{
    let data
    if(name!==undefined){
        const minusculaname= name.toLowerCase()
        const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${minusculaname}&number=2&addRecipeInformation=true`);
        data = response.data.results;
    }

    else{
        const responsealldata = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=5&addRecipeInformation=true`);
        data=responsealldata.data.results

    }


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
  
   
    data=data.map(ele=>{   
        const retornarData ={
            id:ele.id,
            title:ele.title,
            image:ele.image,
            healthScore:ele.healthScore,
            summary:ele.summary,
            analyzedInstructions:ele.analyzedInstructions[0].steps,
            diets:ele.diets,
        }

        return retornarData
    })


    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    const agrupar = data.map(elementoInstuccion=>{
        let ingredients=[]
        let equipment=[]


    let steps = elementoInstuccion.analyzedInstructions.map(ele=>ele.step)

    let ingredientsArray = elementoInstuccion.analyzedInstructions.map(ele=>ele.ingredients.map(ele=>ele.name))
    for(let i=0;i<ingredientsArray.length;i++){
        ingredientsArray[i].map(ele=>{
            if(ingredients.indexOf(ele)===-1) ingredients.push(ele)
            })
    }

    let equipmentArray = elementoInstuccion.analyzedInstructions.map(ele=>ele.equipment.map(ele=>ele.name))
    for(let i=0;i<equipmentArray.length;i++){
        equipmentArray[i].map(ele=>{
            if(equipment.indexOf(ele)===-1) equipment.push(ele)
            })
    }

    const analyzedInstructions=[{steps:steps},{ingredients:ingredients},{equioamiento:equipment}]
    return analyzedInstructions

    })
    
    console.log(agrupar)
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    return data
 }
 

 const recipeNames = async(req,res)=>{
    
    //! POR NAME
     const {name}  = req.query; 

     try{
         if(name){

                // ********************     API     ********************
                const data = await recipeName(name) // LLamamos a la función
               
                // ********************     BD     ********************
                let response = await Recipe.findAll({
                    where: {title: {
                        [Op.like]: `%${name}%`
                    }},
                    include:{
                            model:Diets, 
                            attributes:["name"]}
                        });
                response = await response  //// es una promesa por lo tanto await

                let dataBD=response.map(ele=>{
                     const valoresFinale ={
                        id:ele.dataValues.id,
                        title:ele.dataValues.title,
                        image:ele.dataValues.image ,
                        healthScore:ele.dataValues.healthScore,
                        summary:ele.dataValues.summary,
                        analyzedInstructions:ele.dataValues.analyzedInstructions,
                        diets:ele.dataValues.diets.map(ele=>ele.name)
                    }
                    return valoresFinale
                })
                

                // ********************     RESULT     ********************
                let dataForName= [...data,...dataBD] 
                if(dataForName.length!==0) return res.status(200).json(dataForName);

                return res.status(404).json({error:'Recipe Not found'});
        }
    //! SI NO EXISTE UN NAME

        // ********************     API     ********************
        const data = await recipeName() // LLamamos a la función


        // ********************     BD     ********************
        let response = await Recipe.findAll({
            include:{
                    model:Diets, 
                    attributes:["name"]}
                });
        response = await response  //// es una promesa por lo tanto await

        let dataBD=response.map(ele=>{
             const valoresFinale ={
                id:ele.dataValues.id,
                title:ele.dataValues.title,
                image:ele.dataValues.image ,
                healthScore:ele.dataValues.healthScore,
                summary:ele.dataValues.summary,
                analyzedInstructions:ele.dataValues.analyzedInstructions,
                diets:ele.dataValues.diets.map(ele=>ele.name)
            }
            return valoresFinale
        })


        // ********************     RESULT     ********************
        return res.status(200).json([...data,...dataBD]);  
    

    } catch(error){
       return res.status(500).json({error: error.message});
    }
    

 }

 module.exports={recipeNames}

 //!falta ordenar y comprobar los pedidos por api y sin api
