import { Router } from 'express';

import { createRecipe, getRecipes, updateRecipe, deleteRecipe, getRecipe, getRecipeByCategory } from '../controllers/recipe';

const router = Router();

router.post('/', createRecipe);

router.get('/', getRecipes);
router.get('/:id', getRecipe);
router.put('/:id', updateRecipe);
router.delete('/:id', deleteRecipe);


export default router;