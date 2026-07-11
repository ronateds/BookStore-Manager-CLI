import 'dotenv/config';
import { Pool } from 'pg';
import fs from "fs";

const config = {
    host: process.env.PGHOST,
    port: Number(process.env.PGPORT),
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    max: 10,
    idleTimeoutMillis: 30000,
    ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync("./src/database/ca.pem").toString(),
    },
};

export const pool = new Pool(config);

pool.on('error', (err) => {
    console.log('Erro inesperado no pool', err);
});