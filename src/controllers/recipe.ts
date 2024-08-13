import { RequestHandler } from 'express';
import { connect, query, disconnect } from '../dao/dao';
import { Recipe } from '../model/recipe';


export const createRecipe: RequestHandler = (req, res, next) => {
  connect()
  query('INSERT INTO recipe (title, description,category,img,available) VALUES ($1, $2, $3, $4, $5)', [req.body.title, req.body.description, req.body.category, req.body.img, req.body.available], function () {
    disconnect()
  })

  res.status(201).json({ message: 'Created the Recipe.', createdRecipe: req.body.title });
};

export const getRecipes: RequestHandler = (req, res, next) => {
  connect()
  query('SELECT * FROM recipe ', [], (result) => {
    res.end(JSON.stringify(result.rows, null, 4))
    disconnect()
  })
};

export const getRecipe: RequestHandler<{ id: string }> = async (req, res, next) => {
  connect()
  query('SELECT * FROM recipe WHERE id=$1', [req.params.id], (result) => {
    res.end(JSON.stringify(result.rows, null, 4))
    disconnect()
  })

};

export const getRecipeByCategory: RequestHandler<{ category: string }> = async (req, res, next) => {
  connect()
  query('SELECT * FROM recipe WHERE category LIKE $1', [req.params.category], (result) => {
    res.end(JSON.stringify(result.rows, null, 4))
    disconnect()
  })

};



export const updateRecipe: RequestHandler<{ id: string }> = (req, res, next) => {
  let recipeId: string = '';
  connect()
  query('SELECT * FROM recipe WHERE id=$1', [req.params.id], (resp) => {
    recipeId = resp.rows[0].id;
    console.log(recipeId);
  })


  if (recipeId !== '') {
    throw new Error('Could not find Recipe!');
  }
  connect()
  query('UPDATE  recipe SET title= $1 ,description=$2, category=$3, img=$4, available=$5 WHERE id=$6', [req.body.title, req.body.description, req.body.category, req.body.img, req.body.available, req.params.id], function () {
    disconnect()
  })
  res.json({ message: 'Updated!', updatedRecipeId: req.params.id });
};

export const deleteRecipe: RequestHandler<{ id: string }> = (req, res, next) => {

  let recipeId: string = '';
  connect()
  query('SELECT * FROM recipe WHERE id=$1', [req.params.id], (resp) => {
    recipeId = resp.rows[0].id;
    console.log(Recipe);
  })


  if (recipeId !== '') {
    throw new Error('Could not find Recipe!');
  }

  query('DELETE  FROM recipe WHERE id=$1', [req.params.id], (result) => {
    disconnect()
  })

  res.json({ message: 'Recipe deleted!' });
};
