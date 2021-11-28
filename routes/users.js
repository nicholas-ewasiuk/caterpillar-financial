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

    
  });
 
  router.post('/:id', function(req, res) {
    // console.log("reqbody-------------",req.body)
    const revData = req.body["revenuesData[]"];
    const expData = req.body["expensesData[]"];
    const username = req.body.usernameData.trim();
    const datasetName = req.body.datasetTitle;
    

    db.query(`SELECT id FROM users WHERE username=$1`, [username])
      .then(result => {
        console.log("here-----", result)
        const userId = result.rows[0].id

        db.query(`INSERT INTO datasets (user_id, dataset_name) VALUES (${userId}, $1)`, [datasetName])
          .then(res => {

            db.query(`SELECT id FROM datasets WHERE dataset_name=$1`, [datasetName])
              .then(datasetId => {

                for (let i = 0; i < revData.length; i++) {
                  
                  if (i % 2 === 0) {
                    
                    db.query(`
                      INSERT INTO revenues (dataset_id, revenue_name, amount) VALUES (${datasetId.rows[0].id}, $1, $2);
                    `, [revData[i], revData[i + 1]])
                  }
                }
            
                for (let i = 0; i < expData.length; i++) {

                  if (i % 2 === 0) {
                    db.query(`
                      INSERT INTO expenses (dataset_id, expense_name, amount) VALUES (${datasetId.rows[0].id}, $1, $2);
                    `, [expData[i], expData[i + 1]])
                  }
                }

              })
          })

      })
  });

  return router;
}


