const { deleteData } = require("../controllers/deleteRecipe")

const deleteRecipe =async(req,res)=>{
    const {id} = req.params
    try {
        await deleteData(id)
        return res.status(200).json({message:"La receta se elimininó correctamente.",data:id})
        
    } catch (error) {
        return res.status(404).json({error:"No se encontró la receta con este Id."})
    }
}

module.exports={deleteRecipe}