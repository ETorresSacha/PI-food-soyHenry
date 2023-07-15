const { Router } = require('express');
const { recipeId } = require('../handlers/handler.recipeId');
const { typeDiets } = require('../handlers/handler.typesDiets');
const { crearRecipe } = require('../handlers/handler.createRecipe');
const { recipeNames } = require('../handlers/handler.recipeName');
const { updateRecipe } = require('../handlers/handler.updateRecipe');
const { deleteRecipe } = require('../handlers/handler.deleteRecipe');


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// RECIPE
router.get('/recipe/:id',recipeId)
router.get('/recipe',recipeNames)
router.post('/createRecipe',crearRecipe)
router.get('/diets',typeDiets)
//------------------------------//
router.put('/recipe/:id',updateRecipe)
router.delete('/recipe/:id',deleteRecipe)




module.exports = router;



