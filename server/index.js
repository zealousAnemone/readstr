const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, '../dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');
const { Pool } = require('pg');


const connectionString = {
  connectionString: process.env.DATABASE_URL,
  ssl: true,
};

const pool = new Pool(connectionString);

pool.on('connect', () => console.log('connected to db'));


// client.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
//   console.log(err ? err.stack : res.rows[0].message);
//   client.end();
// });

// client.connect();

app.use(express.static(DIST_DIR));
app.get('/', (req, res) => {
  res.sendFile(HTML_FILE);
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
