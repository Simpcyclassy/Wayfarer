import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
    PG_HOST, PG_USER, PG_DATABASE, PG_PASSWORD, PG_PORT
} = process.env;

class Model {
    constructor(table) {
        this.table = table;
        this.pool = new Pool({
            host: PG_HOST,
            port: PG_PORT,
            user: PG_USER,
            password: PG_PASSWORD,
            database: PG_DATABASE
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
}

export default Model;
