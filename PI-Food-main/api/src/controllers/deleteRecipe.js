const {Recipe} = require('../db')

const deleteData =async(id)=>{
    const deleteDataAll = await Recipe.destroy({
        where:{id}
    })
    return deleteDataAll

}

module.exports={deleteData}