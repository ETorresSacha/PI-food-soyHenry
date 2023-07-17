const { updataRecipeData } = require("../controllers/updateRecipe")

const updateRecipe =async(req,res)=>{
    const {id} = req.params

   try {
            const data = await updataRecipeData(id)
            data.set(req.body)  
            await data.save()
            return res.status(200).json(data)
            
        
     } catch (error) {
         return res.status(404).json({error:"The recipe with this Id was not found, try another one."})
     }
}

module.exports ={updateRecipe}
