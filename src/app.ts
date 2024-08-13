import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';

import recipeRoutes from './routes/recipe';
import getRecipeByCategoryRoutes from './routes/getRecipeByCategory';

const app = express();

app.use(json());

app.use('/recipes', recipeRoutes);
app.use('/recipesByCategory', getRecipeByCategoryRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(3000);
