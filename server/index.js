const express = require('express');
const path = require('path');
const pg = require('pg');

if (process.env.NODE_ENV === 'development') {
  pg.defaults.ssl = true;
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
}

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, '../dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');
// console.log(`node.env: ${JSON.stringify(process.env.NODE_ENV)}`);

const connectionUrl = process.env.NODE_ENV === 'development' ? process.env.TEMP_POSTGRES_URL : process.env.DATABASE_URL;

const pool = new pg.Pool({
  connectionString: connectionUrl,
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

app.use(express.static(DIST_DIR));

app.get('/', (req, res) => {
  res.sendFile(HTML_FILE);
});

app.get('/books', getBooks, (req, res) => res.status(200).json(res.locals.books));

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
