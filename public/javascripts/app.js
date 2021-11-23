$(document).ready(function () {
  let revenueCounter = 1;
  let expanseCounter = 1;
  let expansesArray = [];
  let revenuesArray = [];


  const createRevenueInputElements = function (t_id, n_id) {
    const newRevenueInputs = (`
      <div class="title/value">
        <input type="text" placeholder="revenue type" name='${t_id}' id='${t_id}'>
        <input type="number" placeholder="value" name='${n_id}' id='${n_id}'>
      </div>
    `)

    return newRevenueInputs;
  };


  const createExpanseInputElements = function (t_id, n_id) {
    const newExpanseInputs = (`
      <div class="title/value">
        <input type="text" placeholder="expanse type" name='${t_id}' id='${t_id}'>
        <input type="number" placeholder="value" name='${n_id}' id='${n_id}'>
      </div>
    `)

    return newExpanseInputs;
  };


  const appendExpanseInputElements = function (t_id, n_id) {
    $(".expanses").append(createExpanseInputElements(t_id, n_id))
  }


  const appendRevenueInputElements = function (t_id, n_id) {
    $(".revenues").append(createRevenueInputElements(t_id, n_id));
  };


  $('.user-form').submit(function (event) {
    event.preventDefault();

    console.log("prevent default?")

  })


  $(".add-revenue").on("click", function (e) {
    const idText = "text-revenue" + revenueCounter;
    const idNum = "num-revenue" + revenueCounter;

    appendRevenueInputElements(idText, idNum);

    revenuesArray.push(idText, idNum);

    revenueCounter++;

  });

  $(".add-expanse").on("click", function (e) {
    const idText = "text-expanse" + expanseCounter;
    const idNum = "num-expanse" + expanseCounter;

    appendExpanseInputElements(idText, idNum);

    expansesArray.push(idText, idNum);

    expanseCounter++;
  })

  // const userForm = document.querySelector('.user-form');

  // userForm.addEventListener('click', addInputField);

  // function addInputField(event) {
  //   console.log("is it?")
  //   const target = event.target;
  //   if (target.className === 'add-revenue') {
  //     const idText = "text-revenue" + revenueCounter;
  //     const idNum = "num-revenue" + revenueCounter;

  //     appendRevenueInputElements(idText, idNum)

  //     revenuesArray.push(idText, idNum);

  //     revenueCounter++;
  //   }

  //   if (target.className === 'add-expanse') {
  //     const idText = "text-expanse" + expanseCounter;
  //     const idNum = "num-expanse" + expanseCounter;

  //     appendExpanseInputElements(idText, idNum)

  //     expansesArray.push(idText, idNum);

  //     expanseCounter++;
  //   }
  // }

});


// $.ajax({
//   url: '/api/movie-search',
//   method: 'GET',
//   data: inputData
// }).then((result) => {
//   return loadedMovies = result.map(movie => movie.title);

// }).then((moviesArray) => {
//   return moviesArray = moviesArray.map(movie => decoder(movie));

// }).then((res) => {
//   for (let movie of res) {
//     let movieSuggestion = document.createElement("option");
//     movieSuggestion.value = movie;
//     suggestions.appendChild(movieSuggestion);

//   }
// })

// $.ajax({
//   type: 'POST',
//   url: 'http://localhost:8080/api/search-result',
//   data: $(this).serialize()
// })
// .then((res) => {
//   let title = res[0]["title"];
//   $('#movie-input').val("");
//   appendMovie(title);

//   // delete from selected
//   const titleWithoutSpaces = title.replace(/\s+/g, '');
//   $(`.${titleWithoutSpaces}`).on("click", () => {
//     $(`#${titleWithoutSpaces}`).empty();
//   })
// })
// })




$.ajax({
  type: 'POST',
  url: 'http://localhost:8080/users/',
  data: $(this).serialize()
})
  .then((res) => {
    // I cant really test to see what this is doing cause i dont have control

    // let amount = res[0]["revenue-value"];
    $('#revenue-value').val("");
    appendRevenueInputElements(amount)

    const rmvHiddenChar = title.replace(/\s+/g, '');
    $(`.${removeHiddenCharacters}`).on("click", () => {
      $(`#${removeHiddenCharacters}`).empty();
    })
  })
// const revenueData = $('#revenue').serialize();
// $.ajax({
//   type: 'POST',
//   url: 'http://localhost:3080/users',
//   data: revenueData,
//   success: function (data) {
//     console.log("SUCCESS WE DID THE AJAX CALL ON CLIENT'S END")
//   },
//   error: function (error) {
//     console.log(error)
//   }
//   const titleWithoutSpaces = title.replace(/\s+/g, '');
//    $(`.${titleWithoutSpaces}`).on("click", () => {
//     $(`#${titleWithoutSpaces}`).empty();
//   })
// })