const {Recipe} = require('../db')

const newData = async({id, title, image, summary, healthScore,instructions,ingredients,equipment,dietId})=>{
//console.log(id, title, image, summary,dietId,instructions,ingredients,equipment)
        //if(title===undefined|| image===undefined ||summary===undefined || healthScore===undefined || analyzedInstructions===undefined) return {error:'Missing data'}

        let newRecipe = await Recipe.create({
            id,
            title,
            image,
            healthScore,
            summary,
            instructions,
            ingredients,
            equipment
          });
          const newRecipes = await newRecipe.setDiets(dietId) //VER ESE TEMA DE ADD....
          return newRecipes
}

module.exports = {newData}