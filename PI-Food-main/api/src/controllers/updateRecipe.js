const {Recipe,Diets} = require('../db')

const updataRecipeData = async(id)=>{

    let updateData = await Recipe.findByPk(id,{include:{
        model:Diets, 
        attributes:["name"],
        through:{
            attributes:[]
        }}})

        updateData = await updateData
        return   updateData
    }

module.exports ={updataRecipeData}
