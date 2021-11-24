const Router = require('express-promise-router');


const router = new Router();

//'/users' Routes
module.exports = (db) => {

  router.get('/:id', function(req, res) {

    db.query(`SELECT username FROM users WHERE id='${req.params.id}'`)
      .then(data => {
<<<<<<< HEAD
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
=======
        const templateVars = { username: data.rows[0].username }
        
        console.log(templateVars)
        res.render('user', templateVars);
      })

  });
 
  router.post('/:id', function(req, res) {
    console.log("reqbody-------------",req.body)
>>>>>>> 66b20241c6dd8fd84bca89b873e25f7e14e2b4f5


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


