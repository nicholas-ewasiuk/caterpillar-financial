const Router = require('express-promise-router');

const db = require('../db');

const router = new Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
