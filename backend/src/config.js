require('dotenv').config();

const config = {
  port: parseInt(process.env.PORT, 10) || 3000,
  verifyToken: process.env.VERIFY_TOKEN,
  pageAccessToken: process.env.PAGE_ACCESS_TOKEN,
  graphApiVersion: process.env.GRAPH_API_VERSION || 'v21.0',

  get graphBaseUrl() {
    return `https://graph.facebook.com/${this.graphApiVersion}`;
  },
};

const requiredVars = ['VERIFY_TOKEN', 'PAGE_ACCESS_TOKEN'];
for (const varName of requiredVars) {
  if (!process.env[varName]) {
    console.error(`Missing required environment variable: ${varName}`);
    process.exit(1);
  }
}

module.exports = config;
