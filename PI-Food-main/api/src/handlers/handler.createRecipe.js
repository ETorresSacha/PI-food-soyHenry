const { newData } = require("../controllers/crearRecipe");

const crearRecipe = async(req,res)=>{
    try {

        const newRecipe = await newData(req.body)

        return res.status(200).json(newRecipe);
        
    } catch (error) {
        return res.status(500).json({error:error.message});
    }

    
}

module.exports = {crearRecipe}