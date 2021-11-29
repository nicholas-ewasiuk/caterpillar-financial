$(document).ready(function () {
  let revenueCounter = 1;
  let expenseCounter = 1;
  let expensesArray = ["text-expense0", "num-expense0"];
  let revenuesArray = ["text-revenue0", "num-revenue0"];
  let numExpenseArray = [["text-expense0","num-expense0"]];
  let numRevenueArray = [["text-revenue0","num-revenue0"]];

  const createRevenueInputElements = function (t_id, n_id) {
    const newRevenueInputs = (`
      <aside class="${t_id}">
        <span>
          <input type="text" placeholder="source of revenue" id="${t_id}">
          <input type="number" placeholder="amount" id="${n_id}">
        </span>
        <span id="add-delete">
          <i class="fas fa-minus-circle" ></i>
        </span>
      </aside>
    `)

    return newRevenueInputs;
  };


  const createExpenseInputElements = function (t_id, n_id) {
    const newExpenseInputs = (`
      <aside class="${t_id}">
        <span>
          <input type="text" placeholder="source of expense" id="${t_id}">
          <input type="number" placeholder="amount" id="${n_id}">
        </span>
        <span id="add-delete">
          <i class="fas fa-minus-circle" ></i>
        </span>
      </aside>
    `)

    return newExpenseInputs;
  };


  const appendExpenseInputElements = function (t_id, n_id) {
    $(".expenses").append(createExpenseInputElements(t_id, n_id))

    $(".fa-minus-circle").on("click", function(e) {
      let target = e.target;

      const nearestAside = target.closest("aside");
      const textInput = nearestAside.firstElementChild.firstElementChild;
      const numInput = nearestAside.firstElementChild.lastElementChild;

      const filterItem = [textInput.id, numInput.id];

      const filterArray = numExpenseArray.filter(id => !arrayEquals(id, filterItem));
      numExpenseArray = filterArray;

      nearestAside.remove();
      updateCircle();
    })
  }


  const appendRevenueInputElements = function (t_id, n_id) {
    $(".revenues").append(createRevenueInputElements(t_id, n_id));

    $(".fa-minus-circle").on("click", function(e) {
      let target = e.target;

      const nearestAside = target.closest("aside");
      const textInput = nearestAside.firstElementChild.firstElementChild;
      const numInput = nearestAside.firstElementChild.lastElementChild;

      const filterItem = [textInput.id, numInput.id];

      const filterArray = numRevenueArray.filter(id => !arrayEquals(id, filterItem));
      numRevenueArray = filterArray;
  
      nearestAside.remove();
      updateCircle();
    })
  };

  //////Add revenue and expense fields/////////////
  $(".add-revenue").on("click", function (e) {
    const idText = "text-revenue" + revenueCounter;
    const idNum = "num-revenue" + revenueCounter;
    // const idDelete = `"${revenueCounter}"`

    appendRevenueInputElements(idText, idNum);

    revenuesArray.push(idText, idNum);
    numRevenueArray.push([idText, idNum]);

    revenueCounter++;
    
  });

  $(".add-expense").on("click", function (e) {
    const idText = "text-expense" + expenseCounter;
    const idNum = "num-expense" + expenseCounter;
    // const idDelete = `"${expenseCounter}"`
    appendExpenseInputElements(idText, idNum);

    expensesArray.push(idText, idNum);
    numExpenseArray.push([idText,idNum]);

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

    // save form data
    $.ajax({
      url: 'http://localhost:3001/users/datasets',
      method: 'POST',
      data: {
        revenuesData: revenuesValues,
        expensesData: expensesValues,
        usernameData: username,
        datasetTitle: datasetTitle
      }
    }).then((result) => {
      if (result) {
        // dataset name already exists
        // show error message

        console.log("working?")
      } else {
        // show visual queue for when graph is saved

      }
    })
  });


  $('.drop-down-form').submit(function (event) {
    event.preventDefault();

    const datasetName = $('#drop-down-datasets').val();
    const username = $('.username').text();

    $.ajax({
      url: 'http://localhost:3001/datasets',
      method: 'GET',
      data: { datasetName: datasetName, username: username }
    }).then((result) => {
      //result is an array where array[0] is the revenues data and array[1] is the expense data

      for (let i = 2; i < revenuesArray.length; i++) {
        let tmpValueId = revenuesArray[i];

        $(`#${tmpValueId}`).remove();
        $(`.${tmpValueId}`).remove();
      }

      for (let i = 2; i < expensesArray.length; i++) {
        let tmpValueId = expensesArray[i];

        $(`#${tmpValueId}`).remove();
        $(`.${tmpValueId}`).remove();
      }

      expensesArray = ["text-expense0", "num-expense0"];
      revenuesArray = ["text-revenue0", "num-revenue0"];
      numExpenseArray = [["text-expense0","num-expense0"]];
      numRevenueArray = [["text-revenue0","num-revenue0"]];

      revenueCounter = 1;
      expenseCounter = 1;

      let revCounter = result[0].length - 1;
      let expCounter = result[1].length - 1;

      while (revCounter > 0) {
        const idText = "text-revenue" + revenueCounter;
        const idNum = "num-revenue" + revenueCounter;
        // const idDelete = `"${revenueCounter}"`

        appendRevenueInputElements(idText, idNum);

        revenuesArray.push(idText, idNum);
        numRevenueArray.push([idText, idNum]);

        revenueCounter++;

        revCounter--;
      }

      while (expCounter > 0) {
        const idText = "text-expense" + expenseCounter;
        const idNum = "num-expense" + expenseCounter;
        const idDelete = `"${expenseCounter}"`

        appendExpenseInputElements(idText, idNum);

        expensesArray.push(idText, idNum);
        numExpenseArray.push([idText,idNum]);

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
      updateCircle();
      
    }).catch((err) => {
      console.log("catch error", err)
    })
  })

  $('#view-all').on('click', function(e) {
    e.preventDefault();

    const username = $('.username').text();

    $.ajax({
      url: 'http://localhost:3001/collectall',
      method: 'GET',
      data: username
    }).then((results) => {
      //results is an array where results[0] has all revenue sets and the dataset_id from this user and results[1] has all expenses sets with the dataset_id
      console.log("view all results", results)
    })   
  })

  $('#delete-previous').on('click', function(e) {
    e.preventDefault();

    const username = $('.username').text().trim();
    const datasetTitle = $('#drop-down-datasets').val();

    $.ajax({
      url: 'http://localhost:3001/delete',
      method: 'POST',
      data: { username: username, datasetTitle: datasetTitle }
    }).then((confirmation) => {
      if (confirmation) {
        location.reload();
      }
    })

  })

  //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////circle vis code/////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////

  document.addEventListener('input', updateCircleOnInput);

  const testButton = document.getElementById('generate-button');
  testButton.addEventListener('click', function(){intializeCircleArray(circleObjectArray);});
  
  const circleObjectArray = [];

  function Circle(radius, angle, id, type) {
    this.radius = radius || 0;
    this.angle = angle || 0;
    this.id = id;
    this.type = type;
  }

  function getTotalRevenue() {
    const numArray = numRevenueArray.concat(numExpenseArray);
    let totalRevenue = 0;
    for (let i = 0; i < numArray.length; i++) {
      const inputNumber = document.getElementById(`${numArray[i][1]}`);
      if (i < numRevenueArray.length) {
        totalRevenue += Number(inputNumber.value);
      }
    }
    return totalRevenue;
  }

  function getTotalExpense() {
    const numArray = numRevenueArray.concat(numExpenseArray);
    let totalExpense = 0;
    for (let i = 0; i < numArray.length; i++) {
      const inputNumber = document.getElementById(`${numArray[i][1]}`);
      if (i >= numRevenueArray.length) {
        totalExpense += Number(inputNumber.value);
      }
    }
    return totalExpense;
  }

  function intializeCircleArray(targetArray) {
    targetArray.length = 0;
    const numArray = numRevenueArray.concat(numExpenseArray);
    const totalRevenue = getTotalRevenue();
    const totalExpense = getTotalExpense();
    const totalAmount = totalExpense + totalRevenue;

    for (let i = 0; i < numArray.length; i++) {
      const inputNumber = document.getElementById(`${numArray[i][1]}`);
      const amount = Number(inputNumber.value);
      
      const scale = 20000;
      const id = `circ${i}`;
      let type;
      let radius = 0;

      if (i < numRevenueArray.length) {
        radius = Math.sqrt((amount / totalRevenue) * (totalRevenue / totalAmount) * scale);
        type = 'revenue';
      } else {
        radius = Math.sqrt((amount / totalExpense) * (totalExpense / totalAmount) * scale);
        type = 'expense';
      }
      const angle = Math.PI / 4;
      targetArray.push(new Circle(radius, angle, id, type));
    }
    console.clear();
    console.log(targetArray);
    displayCircles(targetArray);
  }

  function updateCircleRadius(event) {
    //on amount input, get circle corresponding to the field
    //using input element id
    //set the corresponding array elements radius
    //call display circles function
    const target = event.target;
    const amount = target.value;
    let radius = 0;
    let scale = 20000;
    const index = target.id.slice(-1);
    const totalRevenue = getTotalRevenue();
    const totalExpense = getTotalExpense();
    const totalAmount = totalExpense + totalRevenue;

    if (target.id.includes('revenue')) {
      radius = Math.sqrt((amount / totalRevenue) * (totalRevenue / totalAmount) * scale);
    }
    if (target.id.includes('expense')) {
      radius = Math.sqrt((amount / totalExpense) * (totalExpense / totalAmount) * scale);
    }
    circleObjectArray[index]['radius'] = radius;
    displayCircles(circleObjectArray);
  }

  function displayCircles(srcArray) {
    $("#circle-svg").empty();
    const ns = 'http://www.w3.org/2000/svg';
    let cx = 0;
    let cy = 0;

    for (let i = 0; i < srcArray.length; i++) {
      const svgMain = document.getElementById('circle-svg');
      const { radius, id, type } = srcArray[i];

      const circleElement = document.createElementNS(ns, 'circle');
      circleElement.setAttribute('id', id);
      circleElement.setAttribute('r', radius);
      circleElement.setAttribute('fill-opacity', '0.5');

      if (i === 0) {
        cx = radius + 100;
        cy = radius + 100;
        circleElement.setAttribute('cx', cx);
        circleElement.setAttribute('cy', cy);
        svgMain.append(circleElement);
        continue;
      }

      const prevCircle = srcArray[i-1];

      let displaceX = Math.sin(prevCircle.angle) * (radius + prevCircle.radius);
      let displaceY = Math.cos(prevCircle.angle) * (radius + prevCircle.radius);

      cx = cx + displaceX;
      cy = cy + displaceY;

      circleElement.setAttribute('cx', cx);
      circleElement.setAttribute('cy', cy);
      svgMain.append(circleElement);
    }
  }

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

  function updateCircleOnInput(event) {
    if (event.target.placeholder === 'amount') {
      //updateCircle();
      updateCircleRadius(event);
    }
  }

  function updateCircle() {
    console.clear();
    
    console.log(numExpenseArray, numRevenueArray);
    $("#circle-svg").empty();

    const scale = 20000; //total area of all circles

    const ns = 'http://www.w3.org/2000/svg';

    let totalRevenue = 0;
    let totalExpense = 0;
    let totalAmount = 0;
    let amount = 0;

    let inputNumber, inputText, prevRadius;

    let direction = 0;
    let directionRate = 0.5;

    let radius, cx, cy, angleX, angleY, newCx, newCy, vecX, vecY, totalDist;
    let circleElement, textElement, lineElement;

    const svgMain = document.getElementById('circle-svg');

    const numArray = numRevenueArray.concat(numExpenseArray);


///Loop through input amounts and get total amounts for each
    for (let i = 0; i < numArray.length; i++) {
      inputNumber = document.getElementById(`${numArray[i][1]}`);
      if (i < numRevenueArray.length) {
        totalRevenue += Number(inputNumber.value);
      } else {
        totalExpense += Number(inputNumber.value);
      }
    }

///Get the total $$$ amount
    totalAmount = totalExpense + totalRevenue;

/////////////////////////////////////////////////////////////////////////////////
////Create all SVG elements. Proportion the circle radii and place elements//////
/////////////////////////////////////////////////////////////////////////////////

    for (let i = 0; i < numArray.length; i++) {

///Get values from input fields
      inputNumber = document.getElementById(`${numArray[i][1]}`);
      inputText = document.getElementById(`${numArray[i][0]}`);

      amount = Number(inputNumber.value);
      
///create circle svg element
      circleElement = document.createElementNS(ns, 'circle');

///create text svg element and assign value from text input field
      textElement = document.createElementNS(ns, 'text');
      textElement.setAttribute('text-decoration', `underline`);
      textElement.innerHTML = inputText.value;

///create line svg element
      lineElement = document.createElementNS(ns, 'line');
      lineElement.setAttribute('stroke', `black`);

///set the id attributes for each element
      circleElement.setAttribute('id', `${i}`);
      textElement.setAttribute('id', `text${i}`);
      lineElement.setAttribute('id', `line${i}`);

///Calculate propotional radius and set for circle element
      if (i < numRevenueArray.length) {
        radius = Math.sqrt((amount / totalRevenue) * (totalRevenue / totalAmount) * scale);
        circleElement.setAttribute('fill', 'green');
      } else {
        radius = Math.sqrt((amount / totalExpense) * (totalExpense / totalAmount) * scale);
        circleElement.setAttribute('fill', 'red');
      }

      circleElement.setAttribute('r', `${radius}`);
      circleElement.setAttribute('fill-opacity', '0.5');

//Set the first circle in top left corner
      if (i === 0) {
        circleElement.setAttribute('cx', `${radius + 100}`);
        circleElement.setAttribute('cy', `${radius + 100}`);
        prevRadius = Number(circleElement.getAttribute('r'));
        cx = Number(circleElement.getAttribute('cx'));
        cy = Number(circleElement.getAttribute('cy'));

        textElement.setAttribute('x', `${cx + (radius * 1.25)}`);
        textElement.setAttribute('y', `${cy - (radius * 1.25)}`);

        lineElement.setAttribute('x1', `${cx + (radius / 2)}`);
        lineElement.setAttribute('y1', `${cy - (radius / 2)}`);
        lineElement.setAttribute('x2', `${textElement.getAttribute('x')}`);
        lineElement.setAttribute('y2', `${Number(textElement.getAttribute('y')) + 1}`);

        ///Append all the elements to the DOM
        svgMain.append(circleElement);
        svgMain.append(textElement);
        svgMain.append(lineElement);
        continue;
      }
///For remaining circles, place each at random angle next to previous
      direction = Math.random();
      directionRate += 0.01;

      angleX = Math.sin(direction * Math.PI * directionRate);
      angleY = Math.cos(direction * Math.PI * directionRate);

      totalDist = radius + prevRadius;

      vecX = angleX * totalDist;
      vecY = angleY * totalDist;

      newCx = cx + vecX;
      newCy = cy + vecY;

      circleElement.setAttribute('cx', `${newCx}`);
      circleElement.setAttribute('cy', `${newCy}`);

      textElement.setAttribute('x', `${newCx + (radius * 1.25)}`);
      textElement.setAttribute('y', `${newCy - (radius * 1.25)}`);

      lineElement.setAttribute('x1', `${newCx + (radius / 2)}`);
      lineElement.setAttribute('y1', `${newCy - (radius / 2)}`);
      lineElement.setAttribute('x2', `${textElement.getAttribute('x')}`);
      lineElement.setAttribute('y2', `${Number(textElement.getAttribute('y')) + 1}`);


      cx = Number(circleElement.getAttribute('cx'));
      cy = Number(circleElement.getAttribute('cy'));

      prevRadius = Number(circleElement.getAttribute('r'));

///Append all the elements to the DOM
      svgMain.append(circleElement);
      svgMain.append(textElement);
      svgMain.append(lineElement);
    }
    console.log(`vecX: ${vecX} vecY: ${vecY} cx: ${newCx} cy: ${newCy}`);
  }

  function arrayEquals(a, b) {
    return Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index]);
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////Mouse inputs///////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////

  document.addEventListener('mouseup', mouseUpHandler);
  document.addEventListener('mousedown', mouseDownHandler);
  document.addEventListener('mousemove', mouseMoveHandler);

  let textPressed = false;
  let circlePressed = false;
  let clickedText, clickedCircle, previousCircle;

  function mouseDownHandler(event) {
    const target = event.target;

    if (target.tagName === 'text') {
      textPressed = true;
      clickedText = target;
      console.log(target);
    }
    if (target.tagName === 'circle') {
      circlePressed = true;
      clickedCircle = target;
      previousCircle = target.previousElementSibling;
    }
  }

  function mouseMoveHandler(event) {
    if (textPressed) {
      const lineElement = clickedText.nextElementSibling
      clickedText.setAttribute('x', event.offsetX);
      clickedText.setAttribute('y', event.offsetY);

      lineElement.setAttribute('x2', clickedText.getAttribute('x'));
      lineElement.setAttribute('y2', (Number(clickedText.getAttribute('y')) + 1));
    }
    if (circlePressed) {
      console.clear()
      const circle = circleObjectArray[previousCircle.getAttribute('id').slice(-1)];
      const cx = previousCircle.getAttribute('cx');
      const cy = previousCircle.getAttribute('cy');
      const x = event.offsetX - cx;
      const y = event.offsetY - cy;
      let angle = 0;

      if( y < 0 && x > 0) {
        angle = Math.PI + Math.atan(x / y);
      } else if( y < 0 && x < 0) {
        angle = Math.atan(x / y) - Math.PI;
      } else {
        angle = Math.atan(x / y);
      }
      circle.angle = angle;
      console.log(previousCircle);
      console.log(`x: ${x} y: ${y} angle: ${angle}`);
      displayCircles(circleObjectArray);
    }
  }

  function mouseUpHandler(event) {
    textPressed = false;
    circlePressed = false;
  }


  //////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////


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
  //     balance.innerHTML = (totalExpense - totalRevenue);
  //     circleRadius = scale * (totalExpense - totalRevenue) / totalExpense;
  //   } else if (totalRevenue > totalExpense) {
  //     circle.setAttribute('fill', '#d4fbc4');
  //     balance.innerHTML = (totalExpense - totalRevenue);
  //     circleRadius = scale * (totalRevenue - totalExpense) / totalRevenue;
  //   }

  //   circle.setAttribute('r', `${circleRadius}`);

  //   console.log(`revenue: ${totalRevenue} expense: ${totalExpense} radius: ${circleRadius} revcounter: ${revenueCounter} expcounter: ${expenseCounter}`);
  // }


  // // CANVAS
  // console.log('canvas reached');
  // const canvas = document.querySelector('canvas');
  // // console.log(canvas);

  // canvas.width = window.innerWidth - 150;
  // canvas.height = window.innerHeight;

  // const c = canvas.getContext('2d');


  // $('#num-revenue0').on('keyup', function() {
  //   let radius = Math.sqrt(Number($('#num-revenue0').val()));
  //   c.clearRect(0, 0, innerWidth, innerHeight)
  //   c.beginPath();
  //   c.arc(500, 300, radius, 0, 2 * Math.PI, false);
  //   c.fillStyle = "#d4fbc4";
  //   c.fill();
  //   c.stroke();
  //   c.closePath();
  //   console.log("here",radius);
  // })


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

