const Comment = require('../models/comment')
const { body, validationResult } = require('express-validator')

exports.comment_post = [
    body('name').exists().withMessage("Name must be filled out.").trim().escape(),
    body('content').exists().withMessage("Content must be filled.").trim().escape(),
    (req, res, next) => {
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
            res.status(400).json(data);
            return;
        }
        const comment = new Comment(commentDetails)
        comment.save(function(err) {
            if (err) {
                next(err)
            }
            console.log("New comment: " + comment._id)
            res.status(201).json(comment._id)
        })
    }
]

exports.comment_delete = function(req, res, next) {
    Comment.findByIdAndDelete(req.params.commentId, function(err) {
        if (err) {
            return next(err)
        }
        res.status(201).json(req.params.commentId)
    })
}
