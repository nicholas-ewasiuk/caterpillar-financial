const Router = require('express-promise-router');
const router = new Router();

//'/users' Routes
module.exports = (db) => {

  router.get('/:id', function(req, res) {
    db.query(`SELECT username FROM users WHERE id='${req.params.id}'`)
      .then(data => {
        const username = data.rows[0].username;
        db.query(`SELECT dataset_name FROM datasets WHERE user_id='${req.params.id}'`)
        .then(datasetNames => {
          const templateVars = { username: username, datasetTitles: datasetNames.rows }
          res.render('user', templateVars);
        })

      })
<<<<<<< HEAD

    
=======
>>>>>>> a56253eb2418ad1395b3206343a3e49831a8a8df
  });
 
  router.post('/:id', function(req, res) {
    // console.log("reqbody-------------",req.body)
    const revData = req.body["revenuesData[]"];
    const expData = req.body["expensesData[]"];
    const username = req.body.usernameData;
    const datasetName = req.body.datasetTitle;
    
    db.query(`SELECT id FROM users WHERE username='${username}'`)
      .then(result => {
        const userId = result.rows[0].id

        db.query(`INSERT INTO datasets (user_id, dataset_name) VALUES (${userId}, '${datasetName}')`)
          .then(res => {

            db.query(`SELECT id FROM datasets WHERE dataset_name='${datasetName}'`)
              .then(datasetId => {

                for (let i = 0; i < revData.length; i++) {
                  
                  if (i % 2 === 0) {
                    
                    db.query(`
                      INSERT INTO revenues (dataset_id, revenue_name, amount) VALUES (${datasetId.rows[0].id}, '${revData[i]}', ${revData[i + 1]});
                    `)
                  }
                }
            
                for (let i = 0; i < expData.length; i++) {

                  if (i % 2 === 0) {
                    db.query(`
                      INSERT INTO expenses (dataset_id, expense_name, amount) VALUES (${datasetId.rows[0].id}, '${expData[i]}', ${expData[i + 1]});
                    `)
                  }
                }

              })
          })

      })
   
  });

  return router;
}


