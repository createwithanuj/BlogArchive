const express = require('express');
const mongoose = require('mongoose');
const config = require('./utils/config');
const logger = require('./utils/logger');
const notesRouter = require('./controllers/notes');

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

app.use('/api/blogs', notesRouter);

module.exports = app;