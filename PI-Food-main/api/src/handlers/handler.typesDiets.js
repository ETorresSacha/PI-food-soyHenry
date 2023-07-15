const { typesDietsFuntion } = require('../controllers/typesDiets');
const {Diets} = require('../db')

const typeDiets = async(req,res)=>{
    try {

        // ********************   LLAMAMOS LAS DIETAS DE LA BD   ******************** 
        let response = await Diets.findAll();
        
        // ********************   SI NO EXISTEN DIETAS EN LA BD   ********************  
        if (response.length === 0){
            const arrayDiets = await typesDietsFuntion() // llamamos a la función
            arrayDiets.forEach(async(ele)=>{
                await Diets.create({
                    name:ele
                })   
            })
            return res.status(200).json(arrayDiets)
        }
        
        // ********************   SI EXISTEN DIETAS EN LA BD   ******************** 
        return res.status(200).json(response)
       
    } catch (error) {
        res.status(500).json({error:"No recipe found with that ID"})  
    }
 }

 module.exports={typeDiets}
