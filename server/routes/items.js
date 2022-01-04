import { Router } from "express";
import { getById, getByQuery } from "../controller/items";

const router = Router();

/**
 * Declares routes of items path
 */
export default () => {
  router.get("/items", getByQuery);
  router.get("/items/:id", getById);

  return router;
};
