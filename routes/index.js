const Router = require('express-promise-router');


const router = new Router();


module.exports = (db) => {
  /* GET home page. */
  router.get('/', function(req, res, next) {
    
    res.render('index', { title: 'Express' });
  });

  router.get('/login', function(req, res) {
    res.render('login');
  })

  router.post('/login', function(req, res) {
    
    db.query(`SELECT * FROM users WHERE email LIKE '${req.body.email}'`)
      .then(data => {
        const user_id = data.rows[0].id;

        res.redirect('/users/' + encodeURIComponent(user_id));
      })
  });


  router.get('/datasets', function(req, res) {
    const datasetName = decodeURIComponent(req.url.split('?')[1]);

    db.query(`SELECT id FROM datasets WHERE dataset_name='${datasetName}'`)
      .then(data => {
        const datasetId = data.rows[0].id;
        
        db.query(`SELECT revenue_name, amount FROM revenues WHERE dataset_id='${datasetId}'`)
          .then(revData => {
            const revenuesData = revData.rows;

            db.query(`SELECT expense_name, amount FROM expenses WHERE dataset_id='${datasetId}'`)
              .then(expData => {
                const expensesData = expData.rows;

                const dataArray = [ revenuesData, expensesData ];

                res.send(dataArray);
              })
          })
      })
  });


  router.get('/collectall', function(req, res) {
    const username = decodeURIComponent(req.url.split('?')[1]);
    let dataArray = [];

    db.query(`
    SELECT dataset_id, revenue_name, amount 
    FROM revenues 
    JOIN datasets ON datasets.id = dataset_id
    JOIN users ON users.id = user_id
    WHERE users.username='${username}';
    `)
      .then(revenuesSets => {
      dataArray.push(revenuesSets.rows);

      db.query(`
      SELECT dataset_id, expense_name, amount 
      FROM expenses 
      JOIN datasets ON datasets.id = dataset_id
      JOIN users ON users.id = user_id
      WHERE users.username='${username}';
      `)
        .then(expensesSets => {
          dataArray.push(expensesSets.rows);

          res.send(dataArray);
        })
    })
  })

  return router;
}


