/* eslint-disable camelcase */
import { get } from "axios";
import httpStatus from "http-status";
import getResultItems from "../business/getResultsItems";
import { getBestResultCategories, getCategoriesByProduct } from "../services/category";
import getCurrencyInfo from "../services/currency";
import getSiteInfo from "../services/site";
import config from "../config/config";

const { endpoint: { item: endpoints } } = config;

/**
 * @name getByQuery
 * @param  {object} req - Express request object
 * @param  {object} res - Express response object
 * Get products items by query string
 */
export const getByQuery = async (req, res) => {
  const { query: { q: query } } = req;
  try {
    const {
      data: {
        site_id,
        results,
      },
      status,
    } = await get(`${endpoints.searchByQuery}?q=${query}`);
    const categories = await getBestResultCategories(req, res, results);
    const { default_currency_id } = await getSiteInfo(req, res, site_id);
    const currency = await getCurrencyInfo(req, res, default_currency_id);
    const props = { results, categories, currency };
    return res.status(status).json(getResultItems(props));
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
 * @name getById
 * @param  {object} req - Express request object
 * @param  {object} res - Express response object
 * Get product item by id
 */
export const getById = async (req, res) => {
  const { params: { id } } = req;
  try {
    const { data: item } = await get(`${endpoints.searchById}/${id}`);
    const { site_id, category_id } = item;
    const { data: description } = await get(`${endpoints.searchById}/${id}/description`);
    const categories = await getCategoriesByProduct(req, res, category_id);
    const { default_currency_id } = await getSiteInfo(req, res, site_id);
    const currency = await getCurrencyInfo(req, res, default_currency_id);
    const props = {
      results: [item], categories, currency, description,
    };

    return res.status(httpStatus.OK).json(getResultItems(props));
  } catch (error) {
    const {
      response: {
        status = httpStatus.SERVICE_UNAVAILABLE,
        data: {
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
