import pg from "pg";
import 'dotenv/config';

// Using individual environment variables for AWS RDS
const db = new pg.Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: parseInt(process.env.PG_PORT),
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 15000, // Increased timeout for AWS RDS
    idleTimeoutMillis: 30000,
    max: 10, // Maximum connections in pool
});

db.on('connect', () => {
    console.log('Database pool connected');
});

db.on('error', (err) => {
    console.error('Database pool error:', err);
});

// Test connection on startup
db.query('SELECT NOW()')
    .then(result => {
        console.log('Database connection test successful:', result.rows[0].now);
    })
    .catch(err => {
        console.error('Database connection test failed:', err.message);
    });

export default db;