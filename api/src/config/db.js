import pg from 'pg'

const { Pool } = pg

export const pool = new Pool({
    host: process.env.DB_HOST,
    password: process.env.DB_PASS,
    user: process.env.DB_USER,
    database: process.env.DB_NAME
})


