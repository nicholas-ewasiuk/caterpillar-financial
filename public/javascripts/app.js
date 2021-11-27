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
        let tmpValueId = revenuesArray[i];

        $(`${tmpValueId}`).remove();
      }

      for (let i = 2; i < expensesArray.length; i++) {
        let tmpValueId = expensesArray[i];

        $(`${tmpValueId}`).remove();
      }

      expensesArray = ["text-expense0", "num-expense0"];
      revenuesArray = ["text-revenue0", "num-revenue0"];

      let revCounter = result[0].length - 1;
      let expCounter = result[1].length - 1;

      while (revCounter > 0) {
        const idText = "text-revenue" + revenueCounter;
        const idNum = "num-revenue" + revenueCounter;

        appendRevenueInputElements(idText, idNum);

        revenuesArray.push(idText, idNum);

        revenueCounter++;

        revCounter--;
      }

      while (expCounter > 0) {
        const idText = "text-expense" + expenseCounter;
        const idNum = "num-expense" + expenseCounter;

        appendExpenseInputElements(idText, idNum);

        expensesArray.push(idText, idNum);

        expenseCounter++;

        expCounter--;
      }


      for (let i = 0; i < revenuesArray.length; i++) {

        if (i % 2 === 0) {
          $(`#${revenuesArray[i]}`).val(`${result[0][i / 2].revenue_name}`);
          $(`#${revenuesArray[i + 1]}`).val(`${result[0][i / 2].amount}`);
        }
      }

      for (let i = 0; i < expensesArray.length; i++) {

        if (i % 2 === 0) {
          $(`#${expensesArray[i]}`).val(`${result[1][i / 2].expense_name}`);
          $(`#${expensesArray[i + 1]}`).val(`${result[1][i / 2].amount}`);
        }
      }

      $('#dataset-title').val($("#drop-down-datasets").val())

    }).catch((err) => {
      console.log("catch error", err)
    })

  })


  $().on('click', function(e) {

    const username = $('.username').text();

    $.ajax({
      url: 'http://localhost:3001/collectall',
      method: 'GET',
      data: username
    })    
  }).then((result) => {

  })

  // document.addEventListener('input', updateCircle);

  // function updateCircle(event) {
  //   console.clear();
  //   const scale = 25;

  //   let totalRevenue = 0;
  //   let totalExpense = 0;

  //   let inputNumber;
  //   let amount = 0;

  //   let circleRadius;
  //   const circle = document.getElementById('circle-visual');
  //   const balance = document.getElementById('balance');

  //   for (let i = 0; i < revenueCounter; i++) {
  //     inputNumber = document.getElementById(`num-revenue${i}`)
  //     amount = Number(inputNumber.value);
  //     totalRevenue += amount;
  //   }

  //   for (let i = 0; i < expenseCounter; i++) {
  //     inputNumber = document.getElementById(`num-expense${i}`)
  //     amount = Number(inputNumber.value);
  //     totalExpense += amount;
  //   }

  //   if (totalExpense > totalRevenue) {
  //     circle.setAttribute('fill', '#ecc5bf');
  //     balance.innerHTML=(totalExpense - totalRevenue);
  //     circleRadius = scale * (totalExpense - totalRevenue) / totalExpense;
  //   } else if (totalRevenue > totalExpense) {
  //     circle.setAttribute('fill', '#d4fbc4');
  //     balance.innerHTML=(totalExpense - totalRevenue);
  //     circleRadius = scale * (totalRevenue - totalExpense) / totalRevenue;
  //   }

  //   circle.setAttribute('r', `${circleRadius}`);

  //   console.log(`revenue: ${totalRevenue} expense: ${totalExpense} radius: ${circleRadius} revcounter: ${revenueCounter} expcounter: ${expenseCounter}`);
  // }


  // CANVAS
  console.log('canvas reached');
  const canvas = document.querySelector('canvas');
  // console.log(canvas);

  canvas.width = window.innerWidth - 150;
  canvas.height = window.innerHeight;

  const c = canvas.getContext('2d');

  
  $('#num-revenue0').on('keyup', function() {
    let radius = Math.sqrt(Number($('#num-revenue0').val()));
    c.clearRect(0, 0, innerWidth, innerHeight)
    c.beginPath();
    c.arc(500, 300, radius, 0, 2 * Math.PI, false);
    c.fillStyle = "#d4fbc4";
    c.fill();
    c.stroke();
    c.closePath();
    console.log("here",radius);
  })


  // multiple random circles
  // for(let i = 0; i < 3; i++){
  //   const color = ["#d4fbc4", "#d8f1c4", "#e1dec1", "#e6d2c0", "#ecc5bf"];
  //   const x = Math.random() * window.innerWidth;
  //   const y = Math.random() * window.innerHeight;
  //   c.beginPath();
  //   c.arc(x, y, 100, 0, Math.PI * 2, false);
  //   c.fillStyle = "#d4fbc4"
  //   c.fill();
  // }


  // let x = Math.random() * innerWidth;
  // let y = Math.random() * innerHeight;
  // // velocity (+ equals right on the x axis - goes right)
  // // let xVelocity = (Math.random() - 0.5) * 12;
  // // let yVelocity = (Math.random() - 0.5) * 12;
  // let radius = 50;


  // const randomCircle = function(x, y, xVelocity, yVelocity, radius) {
  //   this.x = x;
  //   this.y = y;
  //   this.xVelocity = xVelocity;
  //   this.yVelocity = yVelocity;
  //   this.radius = radius;

  //   this.draw = function() {
  //     c.beginPath();
  //     c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
  //     c.fillStyle = "#d4fbc4"
  //     c.fill();
  //   }

  //   this.update = function(){
  //     if (this.x + radius > innerWidth || this.x - this.radius < 0) {
  //       this.xVelocity = - this.xVelocity;
  //     }
  //     if (this.y + radius > innerHeight || this.y - this.radius < 0) {
  //       this.yVelocity = - this.yVelocity;
  //     }
  //     x += this.xVelocity;
  //     y += this.yVelocity;

  //     this.draw();
  //   }
  // }
  // let newCircle = new randomCircle(100, 100, 20, 20, 80);


});


