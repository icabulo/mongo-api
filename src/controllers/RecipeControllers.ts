import { Request, Response, NextFunction } from "express";
import Recipe from "../models/recipeModel";

export const create = async (req: Request, res: Response) => {
  try {
    const item = new Recipe(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const items = await Recipe.find();
    if (items.length) return res.json(items);
    res.status(204);
  } catch (error) {
    res.status(500).json(error);
  }
};

//middleware to find a recipe from any attribute
// http://localhost:3001/recipe/:key/:value => {params: {key: "", value:""}}
export const find = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { key, value } = req.params;
    console.log("REQ PARAMS/>", req.params);
    const query: any = {};
    query[key] = value;
    console.log("Query/>", query);
    const items = await Recipe.find(query);
    console.log("FOUND/>", items);
    if (!items.length) return res.status(204).send();
    req.body.items = items; //dependency injection
    next();
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    console.log("get one***", req.body.items);
    console.log("BODY", req.body);
    res.json(req.body.items[0]);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    let item = req.body.items[0]; //will get the found item from the middleware injection
    console.log("BODY", req.body);
    console.log("ITEM BEFORE->", item);

    item = Object.assign(item, req.body);
    // item = { ...req.body.items[0], ...req.body };
    console.log("ITEM AFTER->", item);
    const newItem = await item.save();
    res.json(newItem);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteOne = async (req: Request, res: Response) => {
  try {
    let item = req.body.items[0];
    const deleted = await item.deleteOne();
    res.json(deleted);
  } catch (error) {
    res.status(500).json(error);
  }
};
