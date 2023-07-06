const { Router } = require('express');
const { recipeId } = require('../controllers/recipesId');
const { recipeNames } = require('../controllers/recipeName');
const { crearRecipe } = require('../controllers/crearRecipe');
const { typeDiets } = require('../controllers/typesDiets');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// RECIPE
router.get('/recipe/:id',recipeId)
router.get('/recipe',recipeNames)
router.post('/recipe',crearRecipe)
router.get('/diets',typeDiets)




module.exports = router;



