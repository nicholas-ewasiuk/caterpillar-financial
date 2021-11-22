const Router = require('express-promise-router');

const db = require('../db');

const router = new Router();

/* GET home page. */
router.get('/visualizer', function(req, res, next) {
  res.render('visualizer', { title: 'Express' });
});

module.exports = router;
