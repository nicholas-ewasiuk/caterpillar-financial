const Router = require('express-promise-router');


const router = new Router();


module.exports = (db) => {
  /* GET home page. */
  router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });

  router.get('/login', function(req, res) {
    res.render('login');
  });

  router.post('/login', function(req, res) {
    db.query(`SELECT * FROM users WHERE email LIKE '${req.body.email}'`)
      .then(data => {
        const user_id = data.rows[0].id;

        res.redirect('/users/' + encodeURIComponent(user_id));
      })
  });

  router.get('/users/:id', function(req, res) {
    const user_id = req.params.id;

    


    res.render('user');
  });

  return router;
}


