const Router = require('express-promise-router');


const router = new Router();

module.exports = (db) => {

  router.get('/:id', function(req, res) {
    const user_id = req.params.id;

    res.render('user');
  });
 
  router.post('/:id', function(req, res) {
    console.log("reqbody",req.body)
  });

  return router;
}


