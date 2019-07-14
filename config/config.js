//separate different environments

import dotenv from 'dotenv';

dotenv.config();

const config = {
    port: process.env.PORT || 5000,
    env: process.env.NODE_ENV,

    databaseUrl: {
        production: process.env.DB_URL,
        development: process.env.DEVELOPMENT_URL,
        test: process.env.TEST_URL
    }
};

export default config;