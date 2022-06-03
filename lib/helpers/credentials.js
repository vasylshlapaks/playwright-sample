const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  alty_cmd_stage: {
    URL: process.env.ALTY_CMD_URL,
    LOGIN: process.env.ALTY_CMD_LOGIN,
    PASSWORD: process.env.ALTY_CMD_PASSWORD,
    EMAIL_FOR_RESTORE: process.env.ALTY_CMD_RESTORE,
  },

  ororo: {
    URL: 'https://ororo.tv',
    EMAIL: '11111@1secmail.com',
    PASSWORD: 'Pa$$w0rd!',
  },
};
