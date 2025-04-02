const blogRouter = require('express').Router();
const { request, response } = require('express');
const Blog = require('../models/blog');

blogRouter.get('/', async (request, response, next) => {
    Blog.find({})
    .then(blogs => {
        response.json(blogs);
    })
    .catch(error => {
        logger.error('Error fetching blogs:', error.message);
        next(error);
    });
}
);

blogRouter.post('/', (request, response, next) => {
    const blog = new Blog(request.body);

    blog.save()
        .then(savedBlog => {
            response.status(201).json(savedBlog);
        })
        .catch(error => {
            logger.error('Error saving blog:', error.message);
            next(error);
        });
}
);


module.exports = blogRouter;

