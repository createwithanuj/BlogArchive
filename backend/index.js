const express = require('express');
const mongoose = require('mongoose');
const logger = require('./utils/logger');
const {mongoURL, PORT} = require('./utils/config');

const app = express();

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
});

const Blog = mongoose.model('Blog', blogSchema);


mongoose.connect(mongoURL)
    .then(() => {
        logger.info('Connected to MongoDB');
    })
    .catch(error => {
        logger.error('Error connecting to MongoDB:', error.message);
    });

app.use(express.json());

app.get('/api/blogs', (request, response) => {
    Blog.find({})
    .then(blogs => {
        response.json(blogs);
    }
    )
    .catch(error => {
        logger.error('Error fetching blogs:', error.message);
        response.status(500).json({ error: 'Internal Server Error' });
    }
    );
})

app.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body);

    blog.save()
        .then(savedBlog => {
            response.status(201).json(savedBlog);
        })
        .catch(error => {
            logger.error('Error saving blog:', error.message);
            response.status(400).json({ error: 'Bad Request' });
        });
}
);

app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});

