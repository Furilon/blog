const Comment = require('../models/comment')
const { body, validationResult } = require('express-validator');

exports.comment_post = [
    body('name').trim().escape(),
    body('content').trim().escape(),
    (req, res, next) => {
        console.log(req.body.name, req.body.content)
        const errors = validationResult(req);
        const commentDetails = {
            name: req.body.name,
            content: req.body.content,
            timestamp: Date.now(),
            post: req.params.postId,
        }
        if (!errors.isEmpty()) {
            data = {
                errors: errors.array(),
                name: req.body.name,
                content: req.body.content,
            }
            return res.json(data);
            
        }
        const comment = new Comment(commentDetails)
        comment.save(function(err) {
            if (err) {
                next(err)
            }
            console.log("New comment: " + comment._id)
            return res.json(comment._id);
        })
    }
]

exports.comment_delete = function(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findByIdAndDelete(req.params.commentId, function(err) {
            if (err) {
                return next(err)
            }
            res.status(201).json(req.params.commentId)
        })
    } else {
        res.status(400).send("You're not authenticated.")
    }
}
