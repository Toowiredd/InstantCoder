module.exports = {
  apiKey: process.env.VALTOWN_API_KEY,
  baseUrl: process.env.VALTOWN_BASE_URL || "https://api.valtown.com",
  timeout: 5000,
  retry: {
    retries: 3,
    factor: 2,
    minTimeout: 1000,
    maxTimeout: 5000,
  },
  logging: {
    level: "info",
    format: "json",
  },
};
