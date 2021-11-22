const Router = require('express-promise-router');


const router = new Router();


module.exports = (db) => {
  /* GET home page. */
  router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });

  return router;
}


