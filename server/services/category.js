/* eslint-disable camelcase */
import { get } from "axios";
import httpStatus from "http-status";

import config from "../config/config";

const { endpoint: { category: endpoints } } = config;

/**
 * @name getBestResultCategories
 * @param  {object} req - Express request object
 * @param  {object} res - Express response object
 * @param  {object} items - Dynamic object
 * Get categories of each product and sort them descending
 */
export const getBestResultCategories = async (req, res, items) => {
  try {
    const categories = items.map((item) => item.category_id);
    const categoriesToSearch = [...new Set(categories)];

    const promises = categoriesToSearch.map((categoryId) => get(`${endpoints.getCategory}/${categoryId}`));

    return Promise.all(promises).then((responses) => responses.map((response) => {
      const {
        data: {
          name,
          total_items_in_this_category: totals,
        },
      } = response;
      return {
        name,
        totals,
      };
    })
      .sort((a, b) => b.totals - a.totals)
      .map(({ name }) => name));
  } catch (error) {
    const {
      response: {
        data: {
          status = httpStatus.SERVICE_UNAVAILABLE,
          message,
          cause,
        },
      },
    } = error;
    return res.status(status).json({
      message,
      cause,
      status,
    });
  }
};

/**
 * @name getCategoriesByProduct
 * @param  {object} req - Express request object
 * @param  {object} res - Express response object
 * @param  {string} categoryId - Category of product
 * Get category of product and return root path
 */
export const getCategoriesByProduct = async (req, res, categoryId) => {
  try {
    const {
      data: {
        path_from_root,
      },
    } = await get(`${endpoints.getCategory}/${categoryId}`);
    return path_from_root.map(({ name }) => name);
  } catch (error) {
    const {
      response: {
        data: {
          status = httpStatus.SERVICE_UNAVAILABLE,
          message,
          cause,
        },
      },
    } = error;
    return res.status(status).json({
      message,
      cause,
      status,
    });
  }
};
