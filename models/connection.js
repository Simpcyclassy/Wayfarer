import dotenv from 'dotenv';
import {Pool} from 'pg';
import config from '../config/config';

dotenv.config();

const env = process.env.NODE_ENV;

class Model {
    constructor(table){
        this.table = table;
        this.pool = new Pool({
            connectionString: config.databaseUrl[env]
        });
    }

};