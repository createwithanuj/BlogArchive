const express = require('express');
const mongoose = require('mongoose');
const config = require('./utils/config');
const logger = require('./utils/logger');
const notesRouter = require('./controllers/notes');
const middleware = require('./utils/middleware');
const cors = require('cors');

const app = express();

logger.info('Connecting to MongoDB...');

mongoose.connect(config.mongoURL)
.then(() => {
    logger.info('Connected to MongoDB');
})
.catch(error => {
    logger.error('Error connecting to MongoDB:', error.message);
});

app.use(express.json());
app.use(middleware.requestLogger);


app.use('/api/blogs', notesRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;