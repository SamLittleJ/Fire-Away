const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 3306;

app.use(cors());

const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'game_database'
});

db.connect((err) => { 
    if(err) {
        console.error('Database connection failed: ', err);
        return;
    }
    console.log('Connected to MySQL database');
});

app.get('/api/highscores', (req, res) => { 
    const query = "SELECT username, score FROM highscores ORDER BY score DESC LIMIT 10";
    db.query(query, (err, result) => {
        if(err) {
            console.error('Error fetching high scores: ', err);
            res.status(500).send('Server error');
            return;
        }
        res.json(result);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});