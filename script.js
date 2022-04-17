function clearHighscores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
  }
    
  //document.getElementById("clear").onclick = clearHighscores;
  var questions = [
    {
      title: "Which one is a fruit:",
      choices: ["radish", "potato", "tomato", "steak"],
      answer: "tomato"
    },
    {
      title: "question",
      choices: ["words", "words", "words", "words"],
      answer: "answer"
    },
    {
      title: "question",
      choices: [
        "words",
        "words",
        "words",
        "all of the above"
      ],
      answer: "all of the above"
    },
    {
      title: "Question",
      choices: ["word", "word", "word", "word"],
      answer: "quotes"
    },
    {
      title:"Question",
      choices: ["words", "words", "word", "words"],
      answer: "words"
    }
  ];

  
  // variables to keep track of quiz state
  var currentQuestionIndex = 0;
  var time = questions.length * 20;
  var timerId;
  
  // variables to reference DOM elements
  var questionsEl = document.querySelector("#questions");
  var timerEl = document.querySelector("#time");
  var choicesEl = document.querySelector("#choices");
  var submitBtn = document.querySelector("#submit");
  var startBtn = document.querySelector("#start");
  var initialsEl = document.querySelector("#initials");
  var feedbackEl = document.querySelector("#feedback");
  
  // // sound effects
  // var sfxRight = new Audio("sound/sfx/correct.wav");
  // var sfxWrong = new Audio("sound/sfx/incorrect.wav");
  
  function BeginQuiz() {
    // hide start screen
    var startScreenEl = document.querySelector("#start-screen");
    startScreenEl.setAttribute("class", "hide");
  
    // un-hide questions section
    questionsEl.removeAttribute("class");
  
    // start timer
    timerId = setInterval(clockTick, 1300);
      time -= 20;
  
      if (time < 0) {
        time = 0;
      }
  
      // this will show new time
      timerEl.textContent = time;
  
      //here i want ot display wrong sound effect

      // play "wrong" sound effect
      //sfxWrong.play();
  
      feedbackEl.textContent = "Wrong!";
    } else {
      //here play correct sound effect

      // play "right" sound effect
      //sfxRight.play();
        feedbackEl.textContent = "Correct!";
    }
  
    // flash right/wrong feedback on page for half a second
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function() {
      feedbackEl.setAttribute("class", "feedback hide");
    }, 1000);
  
    // this will ask the next quesiton
    currentQuestionIndex++;
  
    // check if we've run out of questions
    if (currentQuestionIndex === questions.length) {
      quizEnd();
    } else {
      getQuestion();
    }
  }
  
  function quizEnd() {
    // stop timer
    clearInterval(timerId);
  
    // show end screen

    var endScreenEl = document.querySelector("#end-screen");
    //var endScreenEl = document.getElementById("end-screen");
    endScreenEl.removeAttribute("class");
  
    // show final score
    var finalScoreEl = document.querySelector("#final-score");
    finalScoreEl.textContent = time;
  
    // hide questions section
    questionsEl.setAttribute("class", "hide");
  }
  
  function clockTick() {
    // this will update the code.
    time--;
    timerEl.textContent = time;
  
    //this will indicated if users ran out of time.
    if (time <= 0) {
      quizEnd();
    }
  }
  
  // here is the function for saving hi score.

  function saveHiscore(event) {
    //console.log(event)

    event.preventDefault();
    // get value of input box
    var initials = initialsEl.value.trim();
  
    // make sure value wasn't empty
    if (initials !== "") {
      // get saved scores from localstorage, or if not any, set to empty array
      var highscores =
        JSON.parse(window.localStorage.getItem("highscores")) || [];
  
      // format new score object for current user
      var newScore = {
        score: time,
        initials: initials
      };
  
      // this .push function will save to localstorage
      highscores.push(newScore);
      window.localStorage.setItem("highscores", JSON.stringify(highscores));
      window.location.href = "/highscores.html"
      // want to display a list on the left side when they click "score sheet" to view results.

     }
  }
  
    function checkEnter(event) {
    // "13" represents the enter key
    if (event.key === "Enter") {
      saveHiscore();
    }
  }
  
  // user clicks button to submit initials
  //submitBtn.onclick = saveHiscore;
  
  // user clicks button to start quiz
  startBtn.addEventListener ("click" ,startQuiz);
  submitBtn.addEventListener("submit", saveHiscore);
  
  //initialsEl.onkeyup = checkForEnter;
  
  // below are my question js 

  // list of all questions, choices, and answers