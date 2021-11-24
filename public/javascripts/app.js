$(document).ready(function () {
  let revenueCounter = 1;
  let expenseCounter = 1;
  let expensesArray = ["text-expense0", "num-expense0"];
  let revenuesArray = ["text-revenue0", "num-revenue0"];


  const createRevenueInputElements = function (t_id, n_id) {
    const newRevenueInputs = (`
      <div class="title/value">
        <input type="text" placeholder="revenue type" name='${t_id}' id='${t_id}'>
        <input type="number" placeholder="value" name='${n_id}' id='${n_id}'>
      </div>
    `)

    return newRevenueInputs;
  };


  const createExpenseInputElements = function (t_id, n_id) {
    const newExpenseInputs = (`
      <div class="title/value">
        <input type="text" placeholder="expense type" name='${t_id}' id='${t_id}'>
        <input type="number" placeholder="value" name='${n_id}' id='${n_id}'>
      </div>
    `)

    return newExpenseInputs;
  };


  const appendExpenseInputElements = function (t_id, n_id) {
    $(".expenses").append(createExpenseInputElements(t_id, n_id))
  }


  const appendRevenueInputElements = function (t_id, n_id) {
    $(".revenues").append(createRevenueInputElements(t_id, n_id));
  };


  $(".add-revenue").on("click", function (e) {
    const idText = "text-revenue" + revenueCounter;
    const idNum = "num-revenue" + revenueCounter;

    appendRevenueInputElements(idText, idNum);

    revenuesArray.push(idText, idNum);

    revenueCounter++;

  });

  $(".add-expense").on("click", function (e) {
    const idText = "text-expense" + expenseCounter;
    const idNum = "num-expense" + expenseCounter;

    appendExpenseInputElements(idText, idNum);

    expensesArray.push(idText, idNum);

    expenseCounter++;
  })

  
  $('.user-form').submit(function (event) {
    event.preventDefault();

    let revenuesValues = [];
    let expensesValues = []; 

    for (let i = 0; i < revenuesArray.length; i++) {
      let tmpValueId = "#" + revenuesArray[i];

      revenuesValues.push($(`${tmpValueId}`).val());
    }

    for (let i = 0; i < expensesArray.length; i++) {
      let tmpValueId = "#" + expensesArray[i];

      expensesValues.push($(`${tmpValueId}`).val());
    }

    const username = $('.username').text();
    const datasetTitle = $('#dataset-title').val();

    $.ajax({
      url: 'http://localhost:3000/users/datasets',
      method: 'POST',
      data: {
        revenuesData: revenuesValues,
        expensesData: expensesValues,
        usernameData: username,
        datasetTitle: datasetTitle
      }
    })


  });

});

