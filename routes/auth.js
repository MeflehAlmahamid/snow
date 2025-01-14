const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();


router.get('/', (req, res) => {
  res.redirect('/login');
});

router.get('/login', (req, res) => {
  const errorMessage = req.session.errorMessage || '';
  req.session.errorMessage = null; 
  
  res.render('login', { errorMessage });
  });

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    req.session.errorMessage = 'Please fill in all fields';
    return res.redirect('/login');
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      req.session.errorMessage = 'Invalid username or password';
      return res.redirect('/login');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      req.session.errorMessage = 'Invalid username or password';
      return res.redirect('/login');
    }

    req.session.user = user;
    res.redirect('/dashboard');
  } catch (err) {
    req.session.errorMessage = 'An error occurred while logging in';
    return res.redirect('/login');
  }
});

// Register Page
router.get('/register', (req, res) => {
  const errorMessage = req.session.errorMessage || '';
  req.session.errorMessage = null;  

  res.render('register', { errorMessage });
});

// Register User
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      req.session.errorMessage = 'Please fill in all fields';
      return res.redirect('/register')
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.redirect('/login');
    } catch (err) {
      req.session.errorMessage = 'An error occurred while Register in';
      return res.redirect('/register');
    }
});

// Dashboard
router.get('/dashboard', (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    res.render('dashboard', { user: req.session.user });
});

// Logout
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Failed to log out');
        }
        res.redirect('/login');
    });
});

// accordions Page
router.get('/accordions', (req, res) => {
  const errorMessage = req.session.errorMessage || '';
  req.session.errorMessage = null;  

  res.render('accordions', { errorMessage });
});

// alerts Page
router.get('/alerts', (req, res) => {
  const errorMessage = req.session.errorMessage || '';
  req.session.errorMessage = null;  

  res.render('alerts', { errorMessage });
});

// chat Page
router.get('/chat', (req, res) => {
  const errorMessage = req.session.errorMessage || '';
  req.session.errorMessage = null;  

  res.render('chat', { errorMessage });
});

// contact Page
router.get('/contact', (req, res) => {
  const errorMessage = req.session.errorMessage || '';
  req.session.errorMessage = null;  

  res.render('contact', { errorMessage });
});

// ecommerce Page
router.get('/ecommerce', (req, res) => {
  const errorMessage = req.session.errorMessage || '';
  req.session.errorMessage = null;  

  res.render('ecommerce', { errorMessage });
});

// email Page
router.get('/email', (req, res) => {
  const errorMessage = req.session.errorMessage || '';
  req.session.errorMessage = null;  

  res.render('email', { errorMessage });
});

// projects Page
router.get('/projects', (req, res) => {
  const errorMessage = req.session.errorMessage || '';
  req.session.errorMessage = null;  

  res.render('projects', { errorMessage });
});

// invoice Page
router.get('/invoice', (req, res) => {
  const errorMessage = req.session.errorMessage || '';
  req.session.errorMessage = null;  

  res.render('invoice', { errorMessage });
});

// empty Page
router.get('/empty', (req, res) => {
  const errorMessage = req.session.errorMessage || '';
  req.session.errorMessage = null;  

  res.render('empty', { errorMessage });
});



module.exports = router;
