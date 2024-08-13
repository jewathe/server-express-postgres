import { Router } from 'express';

import { getRecipeByCategory } from '../controllers/getRecipeByCategory';

const router = Router();

router.get('/:category', getRecipeByCategory);



export default router;