import { get } from "axios";
import httpStatus from "http-status";

import config from "../config/config";

const { endpoint: { currency: endpoints } } = config;

/**
 * @param  {object} req - Express request object
 * @param  {object} res - Express response object
 * @param  {string} currencyId
 * Get currency information
 */
export default async (req, res, currencyId) => {
  try {
    const {
      data: {
        id: currency,
        decimal_places: decimal,
      },
    } = await get(`${endpoints.getCurrencyInfo}/${currencyId}`);
    return {
      currency,
      decimal,
    };
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
