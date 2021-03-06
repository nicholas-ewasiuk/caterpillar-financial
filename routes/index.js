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
    
    db.query(`SELECT * FROM users WHERE email LIKE $1`, [req.body.email])
      .then(data => {
        if (data.rows[0]) {
          const user_id = data.rows[0].id;
  
          res.redirect('/users/' + encodeURIComponent(user_id));

        } else {
          // it's just a blank error page with this message
          // res.status(403).send("403: e-mail cannot be found, <a href='/login'>back to login</a>");

          res.redirect('login');

        }
      })
      
  })


  router.get('/datasets', function(req, res) {

    const decoded = decodeURIComponent(req.url.split('?')[1]).split('&username=');

    const datasetName = decoded[0].split('datasetName=')[1]

    const username = decoded[1].trim()

    db.query(`SELECT id FROM users WHERE username=$1`, [username])
      .then(userIdData => {
        const userId = userIdData.rows[0].id
        
        db.query(`SELECT id FROM datasets WHERE dataset_name=$1 AND user_id=${userId}`, [datasetName])
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
      }) 

  });


  router.get('/collectall', function(req, res) {
    const username = decodeURIComponent(req.url.split('?')[1]).trim();
    let dataArray = [];

    db.query(`
    SELECT dataset_id, revenue_name, amount 
    FROM revenues 
    JOIN datasets ON datasets.id = dataset_id
    JOIN users ON users.id = user_id
    WHERE users.username=$1;
    `, [username])
      .then(revenuesSets => {
      dataArray.push(revenuesSets.rows);

      db.query(`
      SELECT dataset_id, expense_name, amount 
      FROM expenses 
      JOIN datasets ON datasets.id = dataset_id
      JOIN users ON users.id = user_id
      WHERE users.username=$1;
      `, [username])
        .then(expensesSets => {
          dataArray.push(expensesSets.rows);

          res.send(dataArray);
        })
    })
  });


  router.post('/delete', function(req, res) {

    const username = req.body.username;
    const datasetTitle = req.body.datasetTitle;

    if (username && datasetTitle) {

      db.query(`SELECT id FROM users WHERE username=$1`, [username])
        .then(userIdData => {

          const userId = userIdData.rows[0].id;

          db.query(`DELETE FROM datasets WHERE dataset_name=$1 AND user_id=${userId}`, [datasetTitle])
            .then(result => {

              const confirmation = true;

              res.send(confirmation)
            })
        })
    }
  })


  return router;
}


