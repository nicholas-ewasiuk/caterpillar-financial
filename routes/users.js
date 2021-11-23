const Router = require('express-promise-router');


const router = new Router();

module.exports = (db) => {
  /* GET users listing. */
  router.get('/', function(req, res, next) {
    //db.query(`SELECT ....`)
    //  .then(data => {
    // })
    res.send('respond with a resource');
  });
  
  // router.get('/:id', async (req, res) => {
  //   const { id } = req.params
  //   const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [id])
  //   res.end(rows[0])
  // })

  return router;
}


