const { Pool } = require('pg');
 
const pool = new Pool({
    host: 'localhost',
    user: 'rolando',
    password: 'rolas123',
    database: 'escuela',
    port: '5432'
});

module.exports = pool;