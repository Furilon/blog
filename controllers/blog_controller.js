const async = require('async');
const { body, validationResult } = require('express-validator');

const Blogpost = require('../models/blogpost');
const Comment = require('../models/comment');

exports.one_post_get = function (req, res, next) {
    async.parallel({
        blogpost: function(callback) {
            Blogpost.findById(req.params.postId).exec(callback)
        },
        comments: function(callback) {
            Comment.find({'post': req.params.postId}).exec(callback)
        },
    }, function(err, results) {
        if (err) {
            return next(err)
        }
        res.status(200).json({blogpost: results.blogpost, comments: results.comments})
    })
}

exports.posts_get = function (req, res) {
    async.parallel(
        {
            blogposts: function (callback) {
                Blogpost.find({}).exec(callback);
            },
        },
        function (err, results) {
            res.json(results.blogposts);
        }
    );
};

exports.posts_post = [
    body('title')
        .exists()
        .withMessage('Title must be filled.')
        .trim()
        .escape(),
    body('content')
        .exists()
        .withMessage('Content section must be filled.')
        .trim()
        .escape(),
    (req, res, next) => {
        console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const data = {
                errors: errors.array(),
                title: req.body.title,
                content: req.body.content,
            };
            console.log(data);
            res.status(400).json(data);
        } else {
            const blogpostDetail = {
                title: req.body.title,
                content: req.body.content,
                timestamp: Date.now(),
                published: false,
            };
            const blogpost = new Blogpost(blogpostDetail);
            blogpost.save(function (err) {
                if (err) {
                    next(err);
                }
                console.log(blogpost._id);
                res.status(201).json(blogpost._id);
            });
        }
    },
];

exports.posts_put = [
    body('title')
        .exists()
        .withMessage('Title must be filled.')
        .trim()
        .escape(),
    body('content')
        .exists()
        .withMessage('Content section must be filled.')
        .trim()
        .escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        const post = new Blogpost({
            id: req.params.id,
            title: req.body.title,
            content: req.body.content,
            timestamp: Date.now(),
            published: false,
        });
        if (!errors.isEmpty()) {
            const data = {
                errors: errors.array(),
                title: req.body.title,
                content: req.body.title,
            };
            res.status(400).json(data);
            return;
        }
        Blogpost.findByIdAndUpdate(req.params.postId, post, {}, function(err, thepost) {
            if (err) {
                return next(err);
            }
            res.redirect(thepost.url)
        });
    },
];

exports.posts_delete = function (req, res, next) {
    async.parallel(
        {
            blogpost: function (callback) {
                Blogpost.findById(req.params.postId).exec(callback);
            }
        },
        function (err, results) {
            if (err) {
                next(err);
            }
            Blogpost.findByIdAndDelete(req.params.postId, function deleteBlog(err) {
                if (err) {
                    next(err)
                }
                Comment.deleteMany({"post": req.params.postId}, function deleteComments(err) {
                    if (err) {
                        next(err)
                    }
                    res.status(200).json(results.blogpost._id).redirect('/posts');
                })
            })
        }
    );
};
