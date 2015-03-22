var express = require('express');
var router = express.Router();

// GET search page.
router.get(['/admin', '/admin/*'], (req, res) => {
 res.render('admin');
});

// Fallback route : redirect non-targeted routes to /search/
router.get('*', (req, res) => res.redirect('/admin/'));

module.exports = router;
