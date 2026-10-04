const axios = require('axios');
const config = require('../config');

async function fetchLeadById(leadgenId) {
  const url = `${config.graphBaseUrl}/${leadgenId}`;

  const response = await axios.get(url, {
    params: {
      access_token: config.pageAccessToken,
    },
    timeout: 10000,
  });

  return response.data;
}

module.exports = { fetchLeadById };
