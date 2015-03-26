var express = require('express');
var router = express.Router();

router.get(['/'], (req, res) => {
  res.render('frontpage');
});


router.get(['/admin', '/admin/*'], (req, res) => {
 res.render('admin');
});

// GET search page.
router.get(['/rank', '/rank/*'], (req, res) => {
  res.render('rank');
});

// Fallback route : redirect non-targeted routes to /search/
router.get('*', (req, res) => res.redirect('/'));

module.exports = router;
