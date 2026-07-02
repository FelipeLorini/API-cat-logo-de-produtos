const mysql = require('mysql2/promise');
require('dotenv').config();


const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'loja',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


const testConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Conectado ao MySQL com sucesso!');
        console.log(`Banco: ${process.env.DB_NAME}`);
        connection.release();
        return true;
    } catch (error) {
        console.error('Erro ao conectar ao MySQL:', error.message);
        console.error('Verifique suas credenciais no arquivo .env');
        return false;
    }
};

module.exports = { pool, testConnection };