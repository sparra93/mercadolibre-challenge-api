import items from "./items";

/**
 * @param  {object} router - Express router object
 * Declares routes of application
 */
export default (router) => {
  router.use("/api", items());

  return router;
};
