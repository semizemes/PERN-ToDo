import pg from "pg";
import 'dotenv/config';

const db = new pg.Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 10000,
    idleTimeoutMillis: 30000,
});

db.on('connect', () => {
    console.log('Database pool connected');
});

db.on('error', (err) => {
    console.error('Database pool error:', err);
});

export default db;