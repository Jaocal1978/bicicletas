import pg from 'pg';
const { Pool }  = pg;

const config = {
    user: process.env.USERDB, 
    host: process.env.HOST, 
    database: process.env.DATABASE, 
    password: process.env.PASS, 
    port: process.env.PORT, 
}

const pool = new Pool(config);

export const query = (text, params, callback) => 
{
    return pool.query(text, params, callback)
}