const { deleteData } = require("../controllers/deleteRecipe")

const deleteRecipe =async(req,res)=>{
    const {id} = req.params
    try {
        await deleteData(id)
        return res.status(200).json({message:"The recipe was successfully deleted.",data:id})
        
    } catch (error) {
        return res.status(404).json({error:"No recipe found with this ID."})
    }
}

module.exports={deleteRecipe}