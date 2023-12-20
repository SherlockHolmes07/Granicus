const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const postgres = require('postgres');
const db = require('./models');
const authRoutes = require('./routes/auth.routes');

require('dotenv').config();
// Enable All CORS Requests
app.use(cors());


let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

const sql = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: 'require',
  connection: {
    options: `project=${ENDPOINT_ID}`,
  },
});

async function getPgVersion() {
  const result = await sql`select version()`;
  console.log(result);
}

getPgVersion();

// Sync all defined models to the DB
db.sequelize.sync()
  .then(() => {
    console.log('Database sync complete.');
  })
  .catch((err) => {
    console.error('Unable to sync the database:', err);
  });


app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, Jain Census API!');
});

app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});