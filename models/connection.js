import dotenv from 'dotenv';
import {Pool} from 'pg';
import config from '../config/config';

dotenv.config();

const env = process.env.NODE_ENV;

export class Model {
    constructor(table) {
        this.table = table;
        this.pool = new Pool({
            connectionString: config.databaseUrl[env]
        });
    }

    async insert(columns, selector, values) {
        const query = `INSERT INTO ${this.table} (${columns}) VALUES (${selector}) returning *`;
        try {
        const { rows } = await this.pool.query(query, values);
        return rows;
        } catch (err) {
        throw err;
        }
    }
    
    async select(columns, clause, values) {
        const query = `SELECT ${columns} FROM ${this.table} WHERE ${clause} returning *`;
        try {
        const { rows } = await this.pool.query(query, values);
        return rows;
        } catch (err) {
        throw err;
        }
    }
    
    async remove(clause) {
        const query = `DELETE FROM ${this.table} WHERE ${clause} returning *`;
        try {
        const { rows } = await this.pool.query(query);
        return rows;
        } catch (err) {
        throw err;
        }
    }
    
};