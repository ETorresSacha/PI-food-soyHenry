const { byForId } = require('../controllers/recipesId');

const recipeId = async(req,res)=>{
    try {
        const { id } = req.params;

          // ********************     API     ********************
          if(isNaN(id)){
              const recipe= await byForId(id)
              return res.status(200).json(recipe)
          }

          // ********************      BD      ********************
        const recipe= await byForId(id)
        return res.status(200).json(recipe) 
    }
    catch (error) {
        return res.status(404).json({error:"The recipe with that ID was not found."});
    }
}

module.exports = {recipeId}