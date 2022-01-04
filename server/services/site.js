import { get } from "axios";
import httpStatus from "http-status";

import config from "../config/config";

const { endpoint: { sites: endpoints } } = config;
/**
 * @param  {object} req - Express request object
 * @param  {object} res - Express response object
 * @param  {string} siteId - Site id Ex. MLA
 * Get site information
 */
export default async (req, res, siteId) => {
  try {
    const { data } = await get(`${endpoints.getInformation}/${siteId}`);
    return data;
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
