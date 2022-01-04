import { config } from "dotenv";

config();
const ENV = process.env.NODE_ENV || "dev";
const HOST = {
  dev: {
    api: "https://api.mercadolibre.com",
  },
};
const ENDPOINTS = {
  dev: {
    item: {
      searchByQuery: `${HOST[ENV].api}/sites/MLA/search`,
      searchById: `${HOST[ENV].api}/items`,
      getDescription: `${HOST[ENV].api}/items`,
    },
    category: {
      getCategory: `${HOST[ENV].api}/categories`,
    },
    currency: {
      getCurrencyInfo: `${HOST[ENV].api}/currencies`,
    },
    sites: {
      getInformation: `${HOST[ENV].api}/sites`,
    },
  },
};

export default {
  endpoint: ENDPOINTS[ENV],
  host: HOST[ENV],
};
