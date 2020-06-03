const express = require('express');
const path = require('path');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, '../dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const getBooks = (req, res, next) => {
  const text = 'SELECT * FROM public.books';
  pool.query(text, (err, response) => {
    if (err) {
      return next(err);
    }
    res.locals.books = response.rows;
    next();
  });
};

// client.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
//   console.log(err ? err.stack : res.rows[0].message);
//   client.end();
// });

// client.connect();

app.use(express.static(DIST_DIR));

app.get('/', (req, res) => {
  res.sendFile(HTML_FILE);
});

app.get('/books', getBooks, (req, res) => res.status(200).json(res.locals.books));

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
