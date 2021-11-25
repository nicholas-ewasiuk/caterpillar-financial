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
      url: 'http://localhost:3001/users/datasets',
      method: 'POST',
      data: {
        revenuesData: revenuesValues,
        expensesData: expensesValues,
        usernameData: username,
        datasetTitle: datasetTitle
      }
    })

  });


  $('.drop-down-form').submit(function (event) {
    event.preventDefault();

    const datasetName = $('#drop-down-datasets').val();

    $.ajax({
      url: 'http://localhost:3001/datasets',
      method: 'GET',
      data: datasetName
    }).then((result) => {
      //result is an array where array[0] is the revenues data and array[1] is the expense data

      for (let i = 2; i < revenuesArray.length; i++) {
        let tmpValueId = "#" + revenuesArray[i];

        $(`${tmpValueId}`).remove();
      }

      for (let i = 2; i < expensesArray.length; i++) {
        let tmpValueId = "#" + expensesArray[i];

        $(`${tmpValueId}`).remove();
      }

      expensesArray = ["#text-expense0", "#num-expense0"];
      revenuesArray = ["#text-revenue0", "#num-revenue0"];

      let revCounter = result[0].length - 1;
      let expCounter = result[1].length - 1;

      while (revCounter > 0) {
        const idText = "#text-revenue" + revenueCounter;
        const idNum = "#num-revenue" + revenueCounter;

        appendRevenueInputElements(idText, idNum);

        revenuesArray.push(idText, idNum);

        revenueCounter++;

        revCounter--;
      }

      while (expCounter > 0) {
        const idText = "#text-expense" + expenseCounter;
        const idNum = "#num-expense" + expenseCounter;

        appendExpenseInputElements(idText, idNum);

        expensesArray.push(idText, idNum);

        expenseCounter++;

        expCounter--;
      }


      for (let i = 0; i < revenuesArray.length; i++) {
        
        if (i % 2 === 0) {
          $(`${revenuesArray[i]}`).val(`${result[0][i / 2].revenue_name}`);
          $(`${revenuesArray[i + 1]}`).val(`${result[0][i / 2].amount}`);
        }
      }

      for (let i = 0; i < expensesArray.length; i++) {

        if (i % 2 === 0) {
          $(`${expensesArray[i]}`).val(`${result[1][i / 2].expense_name}`);
          $(`${expensesArray[i + 1]}`).val(`${result[1][i / 2].amount}`);
        }
      }

      $('#dataset-title').val($("#drop-down-datasets").val())

    }).catch((err) => {
      console.log("catch error", err)
    })

  })



  document.addEventListener('input', updateCircle);

  function updateCircle(event) {
    console.clear();
    const scale = 25;

    let totalRevenue = 0;
    let totalExpense = 0;

    let inputNumber;
    let amount = 0;

    let circleRadius;
    const circle = document.getElementById('circle-visual');
    const balance = document.getElementById('balance');

    for (let i = 0; i < revenueCounter; i++) {
      inputNumber = document.getElementById(`num-revenue${i}`)
      amount = Number(inputNumber.value);
      totalRevenue += amount;
    }

    for (let i = 0; i < expenseCounter; i++) {
      inputNumber = document.getElementById(`num-expense${i}`)
      amount = Number(inputNumber.value);
      totalExpense += amount;
    }

    if (totalExpense > totalRevenue) {
      circle.setAttribute('fill', 'chocolate');
      balance.innerHTML=(totalExpense - totalRevenue);
      circleRadius = scale * (totalExpense - totalRevenue) / totalExpense;
    } else if (totalRevenue > totalExpense) {
      circle.setAttribute('fill', 'green');
      balance.innerHTML=(totalExpense - totalRevenue);
      circleRadius = scale * (totalRevenue - totalExpense) / totalRevenue;
    }

    circle.setAttribute('r', `${circleRadius}`);

    console.log(`revenue: ${totalRevenue} expense: ${totalExpense} radius: ${circleRadius}`);
  }
});



// [
//   { revenuetype: "asdasd", amount: 1231231 },
//   { revenuetype: "sdfs", amount: 1242143231 },
//   { revenuetype: "asdasdsfasfd", amount: 1223431 }
// ]