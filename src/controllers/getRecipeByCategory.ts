import { RequestHandler } from 'express';
import { connect, query, disconnect } from '../dao/dao';
import { Recipe } from '../model/recipe';


export const getRecipeByCategory: RequestHandler<{ category: string }> = async (req, res, next) => {
    let resu = [];
    connect()
    query('SELECT * FROM recipe WHERE category LIKE $1', [req.params.category], (result) => {
        res.end(JSON.stringify(result.rows, null, 4))
        disconnect()
    })

};