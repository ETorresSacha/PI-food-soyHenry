const {Recipe} = require('../db')

const crearRecipe = async(req,res)=>{

    const { id, title, image, summary, healthScore,analyzedInstructions,dietId} = req.body;
 

        if(title===undefined|| image===undefined ||summary===undefined || healthScore===undefined || analyzedInstructions===undefined) return res.status(404).json({error:'Missing data'})
        let newRecipe = await Recipe.create({
            id,
            title,
            image,
            healthScore,
            summary,
            analyzedInstructions
          });

          const newRecipes = await newRecipe.setDiets(dietId)

          /* let recipe = await newRecipe.setDiet(id); */
          //console.log(newRecipe)

          return res.status(200).json(newRecipes);
}

module.exports = {crearRecipe}