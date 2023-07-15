const { recipeNameAll } = require("../controllers/recipeName");

const recipeNames = async(req,res)=>{
    
    const {name}  = req.query; 

    try{
        // ********************     NAME     ********************
        if(name){
           const data=await recipeNameAll(name)
           return data.length!==0 ? res.status(200).json(data) 
           : res.status(404).json({error:"No recipe found with that description, please try another."})
        }
        
        // ********************     ALL     ********************
       else{
         const data=await recipeNameAll()
         return res.status(200).json(data)
       }
      
        

   } catch(error){
      return res.status(500).json({error: error.message});
   }
   

}

module.exports={recipeNames}