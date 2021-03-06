const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all post and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const post = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      post,
      logged_in: req.session.logged_in,
      homeActive: true,
      dashActive: false,
      loginActive: false,
    });
  } catch (err) {

    res.status(500).json(err);

  }
});

router.get('/post/:id', async (req, res) => {

  console.log(req.body);
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [

        User,
        {
          model: Comment,

          include: [
            User,
          ],
        },

      ],
    });
    if (postData) {

      const post = postData.get({ plain: true });
      console.log("COMMENT CREATE BODY")
      console.log(postData)
      res.render('comment', {
        post,
        logged_in: req.session.logged_in,
        logged_name: req.session.logged_name,
        logged_in: req.session.logged_in,
        homeActive: false,
        dashActive: false,
        loginActive: false,
      });
    }

  } catch (err) {
    res.status(500).json(err);
  }
});


// edit post
router.get('/edit/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    const post = postData.get({ plain: true });
    res.render('edit', {
      ...post,
      logged_in: req.session.logged_in,
      homeActive: false,
      loginActive: false,
      dashActive: false,
    });
  } catch (err) {

    res.status(500).json(err);
  }
});

// creating new post
router.get('/createPost', async (req, res) => {
  try {
    res.render('createPost', {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
      logged_in: req.session.logged_in,
      homeActive: false,
      dashActive: false,
      loginActive: false,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true,
      homeActive: false,
      dashActive: true,
      loginActive: false,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});


router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('signup');
});


module.exports = router;
