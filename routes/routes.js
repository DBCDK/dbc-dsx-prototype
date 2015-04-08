var express = require('express');
var router = express.Router();

router.get(['/'], (req, res) => {
  res.render('frontpage');
});


router.get(['/admin', '/admin/*'], (req, res) => {
 res.render('admin');
});

router.get(['/rank', '/rank/*'], (req, res) => {
  res.render('rank');
});

router.get(['/search', '/search/*'], (req, res) => {
  res.render('search');
});

router.get(['/recommendations', '/recommendations/*'], (req, res) => {
  res.render('recommendations');
});

// Fallback route : redirect non-targeted routes to /search/
router.get('*', (req, res) => res.redirect('/'));

module.exports = router;
