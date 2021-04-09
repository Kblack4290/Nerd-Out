const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');



router.get('/', withAuth, async (req, res) => {

    try {
        const commentData = await Comment.findAll({

            include: [{ model: Post }, { model: Comment }]
        })
        res.status(200).json(commentData);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {

    try {
        const commentData = await Comment.findOne({
            where: { 
                id: req.params.id,
                user_id: req.session.user_id,
                comment_text: req.body.comment_text,
                post_id: req.body.post_id
            },
            include: [{ model: Post }, { model: Comment }],
        });

        if (!commentData) {
            res.status(404).json({ message: 'No comments found!' })
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }

});


router.post('/', withAuth, async (req, res) => {

    // Create a new comment
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
            comment_text: req.body.comment_text,
            post_id: req.body.post_id
        });

        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Deleting existing comment
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
                post_id: req.body.post_id,
                comment_text: req.body.comment_text,
            },
        });

        
        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;