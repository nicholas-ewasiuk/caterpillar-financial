$(document).ready(function () {
  let revenueCounter = 1;
  let expenseCounter = 1;
  let expensesArray = ["text-expense0", "num-expense0"];
  let revenuesArray = ["text-revenue0", "num-revenue0"];
  let numExpenseArray = [["text-expense0","num-expense0"]];
  let numRevenueArray = [["text-revenue0","num-revenue0"]];

  const circleObjectArray = [];
  const textObjectArray = [];

  const createRevenueInputElements = function (t_id, n_id) {
    const newRevenueInputs = (`
      <aside class="${t_id}">
        <span>
          <input type="text" placeholder="source of revenue" id="${t_id}">
          <i class="fas fa-dollar-sign" id="dollar-sign"></i>
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
          <i class="fas fa-dollar-sign" id="dollar-sign"></i>
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
  };


  const appendRevenueInputElements = function (t_id, n_id) {
    $(".revenues").append(createRevenueInputElements(t_id, n_id));
  };

  const theContainerForm = document.querySelector(".user-form");
  theContainerForm.addEventListener('click', removeInputField);

  function removeInputField(event) {
    let target = event.target;
    
    if (target.className === 'fas fa-minus-circle') {
      const numArray = numRevenueArray.concat(numExpenseArray);
      const nearestAside = target.closest("aside");
      const textInput = nearestAside.firstElementChild.firstElementChild;
      const numInput = nearestAside.firstElementChild.lastElementChild;
      const filterItem = [textInput.id, numInput.id];

      if ( nearestAside.className.includes("revenue")) {
        const filterArray = numRevenueArray.filter(id => !arrayEquals(id, filterItem));
        numRevenueArray = filterArray;
      }

      if ( nearestAside.className.includes("expense")) {
        const filterArray = numExpenseArray.filter(id => !arrayEquals(id, filterItem));
        numExpenseArray = filterArray;
      }

      for (let i = 0; i < numArray.length; i++) {
        if (arrayEquals(numArray[i], filterItem)) {
          const filterCircleObjects = circleObjectArray.filter(item => circleObjectArray.indexOf(item) !== i);
          circleObjectArray.length = 0;

          const filterTextObjects = textObjectArray.filter(item => textObjectArray.indexOf(item) !== i);
          textObjectArray.length = 0;

          for (let item of filterCircleObjects) {
            circleObjectArray.push(item);
          }
          for ( let item of filterTextObjects) {
            textObjectArray.push(item);
          }
        }
      }
      nearestAside.remove();
      console.clear();
      console.log(circleObjectArray);
      console.log(textObjectArray);
      console.log(numRevenueArray, numExpenseArray);
      console.log(`revcount: ${revenueCounter}, expcount: ${expenseCounter}`);
      displayCircles(circleObjectArray, textObjectArray);
    }
  }

  //////Add revenue and expense fields/////////////
  $(".add-revenue").on("click", function (e) {
    const idText = "text-revenue" + revenueCounter;
    const idNum = "num-revenue" + revenueCounter;

    appendRevenueInputElements(idText, idNum);

    revenuesArray.push(idText, idNum);
    numRevenueArray.push([idText, idNum]);

    const svgContainer = document.getElementById('svg-container');

    const angle = Math.PI / 2;
    const radius = 0;
    const type = 'revenue';
    const amount = 0;
    const title = '';
    const x = (svgContainer.clientWidth / 2) + (Math.random() * (200 - 150) + 150);
    const y = (svgContainer.clientHeight / 2) + (Math.random() * (200 - 150) + 150);

    const circleObjectRevenueArray = circleObjectArray.filter(item => item['type'] === 'revenue');
    const circleObjectExpenseArray = circleObjectArray.filter(item => item['type'] === 'expense');

    circleObjectRevenueArray.push(new Circle(radius, angle, type, amount, title));
    circleObjectArray.length = 0;
    const newCircleObjectArray = circleObjectRevenueArray.concat(circleObjectExpenseArray);
    for (let item of newCircleObjectArray) {
      circleObjectArray.push(item);
    }

    const textObjectRevenueArray = textObjectArray.filter(item => item['type'] === 'revenue');
    const textObjectExpenseArray = textObjectArray.filter(item => item['type'] === 'expense');

    textObjectRevenueArray.push(new CircleLabel(x, y, title, type));
    textObjectArray.length = 0;
    const newTextObjectArray = textObjectRevenueArray.concat(textObjectExpenseArray);
    for (let item of newTextObjectArray) {
      textObjectArray.push(item);
    }

    revenueCounter++;

    console.clear();
    console.log(circleObjectArray);
    console.log(textObjectArray);
    console.log(`revcount: ${revenueCounter}, expcount: ${expenseCounter}`);
    displayCircles(circleObjectArray, textObjectArray);
    
  });

  $(".add-expense").on("click", function (e) {
    const idText = "text-expense" + expenseCounter;
    const idNum = "num-expense" + expenseCounter;

    appendExpenseInputElements(idText, idNum);

    expensesArray.push(idText, idNum);
    numExpenseArray.push([idText,idNum]);

    const svgContainer = document.getElementById('svg-container');

    const angle = Math.PI / 2;
    const radius = 0;
    const type = 'expense';
    const amount = 0;
    const title = '';
    const x = (svgContainer.clientWidth / 2) + (Math.random() * (200 - 150) + 150);
    const y = (svgContainer.clientHeight / 2) + (Math.random() * (200 - 150) + 150);

    circleObjectArray.push(new Circle(radius, angle, type, amount, title));
    textObjectArray.push(new CircleLabel(x, y, title, type));

    expenseCounter++;

    console.clear();
    console.log(circleObjectArray);
    console.log(textObjectArray);
    console.log(`revcount: ${revenueCounter}, expcount: ${expenseCounter}`);
    displayCircles(circleObjectArray, textObjectArray);
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
      intializeCircleArray();

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
  testButton.addEventListener('click', function(){intializeCircleArray();});


  function Circle(radius, angle, type, amount, title) {
    this.radius = radius || 0;
    this.angle = angle || 0;
    this.type = type || 'n/a';
    this.amount = amount || 0;
    this.title = title || '';
  }

  function CircleLabel(x, y, title, type) {
    this.x = x;
    this.y = y;
    this.title = title;
    this.type = type;
  }

  function updateCircleOnInput(event) {
    if (event.target.id.includes('num')) {
      updateCircleAmount(event);
    }
    if (event.target.id.includes('text')) {
      updateCircleText(event);
    }
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

  function intializeCircleArray() {
    circleObjectArray.length = 0;
    textObjectArray.length = 0;
    const numArray = numRevenueArray.concat(numExpenseArray);
    const totalRevenue = getTotalRevenue();
    const totalExpense = getTotalExpense();
    const totalAmount = totalExpense + totalRevenue;
    let x, y;
    let toggleY = false;

    for (let i = 0; i < numArray.length; i++) {
      const inputNumber = document.getElementById(`${numArray[i][1]}`);
      const inputText = document.getElementById(`${numArray[i][0]}`);
      const amount = Number(inputNumber.value);
      const title = inputText.value;
      
      const scale = 30000;
      let type;
      let radius = 0;

      if (i < numRevenueArray.length) {
        radius = Math.sqrt((amount / totalRevenue) * (totalRevenue / totalAmount) * scale);
        type = 'revenue';
      } else {
        radius = Math.sqrt((amount / totalExpense) * (totalExpense / totalAmount) * scale);
        type = 'expense';
      }

      const angle = Math.PI / 2;

      circleObjectArray.push(new Circle(radius, angle, type, amount, title));
      
      if (i === 0) {
        const svgContainer = document.getElementById('svg-container');
        x = (radius * 1.25) + 100;
        y = (svgContainer.clientHeight / 2) + 150;
        textObjectArray.push(new CircleLabel(x, y, title, type));
        continue;
      }

      let displaceX = radius * 2;
      let displaceY = 100 + (Math.random() * (200 - 150) + 150);
      x = x + displaceX;

      if (toggleY) {
        y = y + displaceY;
      } else {
        y = y - displaceY;
      }
      toggleY = !toggleY;
      
      textObjectArray.push(new CircleLabel(x, y, title, type));
    }
    console.clear();
    console.log(`x: ${x}, y: ${y}`);
    console.log(circleObjectArray);
    console.log(textObjectArray);
    displayCircles(circleObjectArray, textObjectArray);
  }

  function updateCircleAmount(event) {
    const numArray = numRevenueArray.concat(numExpenseArray);
    const target = event.target;
    const amount = target.value;

    for (let i = 0; i < numArray.length; i++) {
      for (let j = 0; j < numArray[i].length; j++) {
        if ( target.id === numArray[i][j]) {
          circleObjectArray[i]['amount'] = amount;
        }
      }
    }
    updateCircleRadius();
  }

  function updateCircleText(event) {
    const numArray = numRevenueArray.concat(numExpenseArray);
    const target = event.target;
    const title = target.value;

    for (let i = 0; i < numArray.length; i++) {
      for (let j = 0; j < numArray[i].length; j++) {
        if ( target.id === numArray[i][j]) {
          circleObjectArray[i]['title'] = title;
        }
      }
    }
    displayCircles(circleObjectArray, textObjectArray);
  }

  function updateCircleRadius() {
    const numArray = numRevenueArray.concat(numExpenseArray);
    const totalRevenue = getTotalRevenue();
    const totalExpense = getTotalExpense();
    const totalAmount = totalExpense + totalRevenue;
    let revenueCount = 0;

    for (let i = 0; i < circleObjectArray.length; i++) {
      let radius = 0;
      let scale = 30000;
      const item = circleObjectArray[i];
      let type = item['type'];

      if (type === 'revenue') {
        const inputNumber = document.getElementById(`${numArray[i][1]}`);
        const amount = Number(inputNumber.value);
        radius = Math.sqrt((amount / totalRevenue) * (totalRevenue / totalAmount) * scale);

        revenueCount++;
      }
      if (type === 'expense') {
        const inputNumber = document.getElementById(`${numArray[i][1]}`);
        const amount = Number(inputNumber.value);
        radius = Math.sqrt((amount / totalExpense) * (totalExpense / totalAmount) * scale);
      }
      circleObjectArray[i]['radius'] = radius;
    }
    displayCircles(circleObjectArray, textObjectArray);
  }

//////////////////Set element styles in here//////////////////////////////////
  function displayCircles(circleArray, textArray) {
    $("#circle-svg").empty();
    const ns = 'http://www.w3.org/2000/svg';
    let cx = 0;
    let cy = 0;
    
    for (let i = 0; i < circleArray.length; i++) {
      const svgContainer = document.getElementById('svg-container');
      const svgMain = document.getElementById('circle-svg');
      const { radius, type, title } = circleArray[i];
      const {x, y} = textArray[i];
      const id = `circ${i}`;

      const circleElement = document.createElementNS(ns, 'circle');
      circleElement.setAttribute('id', id);
      circleElement.setAttribute('r', radius);
      circleElement.setAttribute('fill-opacity', "0.9");
////text element
      const textElement = document.createElementNS(ns, 'text');
      textElement.setAttribute('id', `text${i}`);
      textElement.setAttribute('text-decoration', `underline`);
      textElement.setAttribute('fill', `#b8b8b8`);
      textElement.innerHTML = title;
////line element
      const lineElement = document.createElementNS(ns, 'line');
      if (title !== '') {
      lineElement.setAttribute('stroke', `#b8b8b8`);
      }
////circle element colors
      if (type === 'revenue') {
        circleElement.setAttribute('fill', "url('#revGradient')");
      } else if (type === 'expense') {
        circleElement.setAttribute('fill', "url('#expGradient')");
      }

      if (i === 0) {
        cx = radius + 100;
        cy = radius + (svgContainer.clientHeight / 2);
        circleElement.setAttribute('cx', cx);
        circleElement.setAttribute('cy', cy);
        textElement.setAttribute('x', x);
        textElement.setAttribute('y', y);
        lineElement.setAttribute('x1', `${cx + (radius / 2)}`);
        lineElement.setAttribute('y1', `${cy - (radius / 2)}`);
        lineElement.setAttribute('x2', `${x}`);
        lineElement.setAttribute('y2', `${y + 1}`);
        svgMain.append(circleElement);
        svgMain.append(textElement);
        svgMain.append(lineElement);
        continue;
      }

      const prevCircle = circleArray[i-1];

      let displaceX = Math.sin(prevCircle.angle) * (radius + prevCircle.radius);
      let displaceY = Math.cos(prevCircle.angle) * (radius + prevCircle.radius);

      cx = cx + displaceX;
      cy = cy + displaceY;

      circleElement.setAttribute('cx', cx);
      circleElement.setAttribute('cy', cy);
      textElement.setAttribute('x', x);
      textElement.setAttribute('y', y);
      lineElement.setAttribute('x1', `${cx + (radius / 2)}`);
      lineElement.setAttribute('y1', `${cy - (radius / 2)}`);
      lineElement.setAttribute('x2', `${x}`);
      lineElement.setAttribute('y2', `${y + 1}`);

      svgMain.append(circleElement);
      svgMain.append(textElement);
      svgMain.append(lineElement);
    }
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
  let clickedText, previousCircle;

  function mouseDownHandler(event) {
    const target = event.target;
    if (target.tagName === 'text') {
      event.preventDefault();
      textPressed = true;
      clickedText = target;
    }
    if (target.tagName === 'circle') {
      circlePressed = true;
      previousCircle = target.previousElementSibling.previousElementSibling.previousElementSibling;
    }
  }

  function mouseMoveHandler(event) {
    if (textPressed) {
      const textItem = textObjectArray[clickedText.getAttribute('id').replace('text', '')];
      textItem.x = event.offsetX;
      textItem.y = event.offsetY;
      displayCircles(circleObjectArray, textObjectArray);
    }
    if (circlePressed) {
      console.clear()
      const circle = circleObjectArray[previousCircle.getAttribute('id').replace('circ', '')];
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
      console.log(circleObjectArray);
      console.log(`x: ${x} y: ${y} angle: ${angle}`);
      displayCircles(circleObjectArray, textObjectArray);
    }
  }

  function mouseUpHandler(event) {
    textPressed = false;
    circlePressed = false;
  }
});