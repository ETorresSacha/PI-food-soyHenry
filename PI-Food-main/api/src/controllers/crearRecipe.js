const {Recipe} = require('../db')

const newData = async({id, title, image, summary, healthScore,instructions,ingredients,equipment,dietId})=>{

        if(title===undefined|| image===undefined ||summary===undefined || healthScore===undefined || instructions===undefined) return {error:'Missing data'}

        let newRecipe = await Recipe.create({
            id,
            title,
            image,
            healthScore,
            summary,
            instructions,
          });
          await newRecipe.setDiets(dietId) //VER ESE TEMA DE ADD....
    
          return newRecipe
}

module.exports = {newData}