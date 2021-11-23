const Router = require('express-promise-router');


const router = new Router();

module.exports = (db) => {
 
  router.get('/users/:id', function(req, res) {
    const user_id = req.params.id;

    


    res.render('user');
  });

  return router;
}


