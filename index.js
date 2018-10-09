require('dotenv').config();


const express = require('express');

const bodyParser = require('body-parser');

const router = require('./app/routes');

const { errorHandler } = require('./app/middlewares');

const app = express();


// Cargamos los middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Load routes into app
app.use(router);
app.use(errorHandler);

app.listen(process.env.PORT, () => console.log(`Application listening on port ${process.env.PORT}!`));
