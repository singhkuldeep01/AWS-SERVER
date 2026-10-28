import express from 'express';
import cors from 'cors';
import ip from 'ip';
import mysql from 'mysql2/promise'; // Added: MySQL promise wrapper for ES modules

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());

// --- Added: MySQL Database Connection Pool ---
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'mysql-db', // Uses your custom bridge network container name by default
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'secretpassword',
  database: process.env.DB_NAME || 'mydb',
  waitForConnections: true,
  connectionLimit: 5,
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/ping' , (req, res)=>{

    // for(let i = 0 ; i < 1000000000 ; i++){
    //     // Simulate a delay
    // }

    res.json({
        ip: ip.address(),
        message: "pong",
        timestamp: new Date().toISOString()
    });   
})

app.get('/delay' , (req, res)=>{

    for(let i = 0 ; i < 1000000000 ; i++){
        // Simulate a delay
    }

    res.json({
        ip: ip.address(),
        message: "pong",
        timestamp: new Date().toISOString()
    });   
})

// --- Added: New route to test database connection ---
app.get('/db-test', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT 1 + 1 AS solution');
        res.json({
            status: 'connected',
            solution: rows[0].solution,
            timestamp: new Date().toISOString()
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});