const { Pool } = require('pg');

const pool = new Pool({
    user: 'dba',
    host: 'atm.cym29xvypgne.us-east-2.rds.amazonaws.com',
    database: 'atm',
    password: 'bookdemobook',
    port: 5432,
  });

module.exports = {
    async query(text, params) {
        const start = Date.now()
        const res = await pool.query(text, params)
        const duration = Date.now() - start
        console.log('executed query', { text, duration, rows: res.rowCount })
        return res
    }
}