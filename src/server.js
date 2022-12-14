'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');

// Esoteric Resources
const errorHandler = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404.js');
const authRoutes = require('./routes/routes.js');
const logger = require('./middleware/logger.js');

const v1Routes = require('./routes/v1.js');

// Prepare the express app
const app = express();

// App Level MW
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use('/api/v1', v1Routes);


// Routes
app.get('/', (request, response) => {
  try {
    response.status(200).send('Proof of life');
  } catch(e) {
    console.log(e);
  }
});

app.use(authRoutes);

// Catchalls
app.use(notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  start: port => {
    if (!port) { throw new Error('Missing Port'); }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};
