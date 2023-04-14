const express = require('express');
const cors = require('cors');

const db = require('../src/db');
const appRoutes = require('./routes');
const app = express();

app.use(express.json());
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);

try {
  db.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

app.get('/', (req,res) => {
  return res.send({data: 'Welcome APIs'});
});

app.use("/api/v1", appRoutes);


/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).send({message: err.message});
  return;
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

module.exports = app;
