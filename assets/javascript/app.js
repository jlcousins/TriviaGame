var panel = $('#quiz-area');
var countStartNumber = 30;

$(document).on('click', '#start-over', function(e) {
    game.reset();
  });
  
  $(document).on('click', '.answer-button', function(e) {
    game.clicked(e);
  });
  
  $(document).on('click', '#start', function(e) {
    $('#subwrapper').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
    game.loadQuestion();
  });


var questions = [{
	question: "What travels around the Sun at an average speed of 185 miles per second.",
	answers: ["Earth", "Saturn", "Jupiter", "Mars"],
    correctAnswer: "Earth",
    image: "assets/images/earth.gif"
},{
	question: "How many moons does Neptune have?",
	answers: ["Eleven", "Eight", "Three", "Nine"],
    correctAnswer: "Eight",
    image: "assets/images/moon.gif"
},{
	question: "What is the name of the first satellite sent into space?",
	answers: ["Zoomracer", "Cadet Air", "Sputnik", "Stargaze"],
    correctAnswer: "Sputnik",
    image: "assets/images/sputnik.gif"
},{
	question: " Which is the first planet in the solar system from the sun?",
	answers: ["Venus", "Jupiter", "Saturn", "Mercury"],
    correctAnswer: "Mercury",
    image: "assets/images/mercury.gif"
},{
	question: "Which planet is sometimes called Earth's sister planet?",
	answers: ["Jupiter", "Mars", "Venus", "Pluto"],
    correctAnswer: "Venus",
    image: "assets/images/sister.gif"
},{
	question: "	From which areas of space can there be no escape?",
	answers: ["Black holes", "Milky Way", "Orbit Rush", "Star gaze"],
    correctAnswer: "Black Holes",
    image: "assets/images/blackhole.gif"
},{
	question: "How old is the sun?",
	answers: ["8 billin years old", "5 billion years old", "11 billion years old", "4 billion years old"],
    correctAnswer: "5 billion years old",
    image: "assets/images/old.gif"
},
];


var game = {
    questions:questions,
    currentQuestion:0,
    counter:countStartNumber,
    correct:0,
    incorrect:0,
    countdown: function(){
      game.counter--;
      $('#counter-number').html(game.counter);
  
      if (game.counter === 0){
        console.log('TIME UP');
        game.timeUp();
      }
    },
    loadQuestion: function(){
      timer = setInterval(game.countdown, 1000);
      panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
      for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
        panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
      }
    },
    nextQuestion: function(){
      game.counter = countStartNumber;
      $('#counter-number').html(game.counter);
      game.currentQuestion++;
      game.loadQuestion();
    },
    timeUp: function (){
      clearInterval(timer);
      $('#counter-number').html(game.counter);
  
      panel.html('<h2>Out of Time!</h2>');
      panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
      panel.append('<img src="' + questions[this.currentQuestion].image + '" />');
  
      if (game.currentQuestion === questions.length - 1){
        setTimeout(game.results, 3 * 1000);
      } else {
        setTimeout(game.nextQuestion, 3 * 1000);
      }
    },
    results: function() {
      clearInterval(timer);
  
      panel.html('<h2>All done, heres how you did!</h2>');
      $('#counter-number').html(game.counter);
      panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
      panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
      panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
      panel.append('<br><button id="start-over">Start Over?</button>');
    },
    clicked: function(e) {
      clearInterval(timer);
  
      if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
        this.answeredCorrectly();
      } else {
        this.answeredIncorrectly();
      }
    },
    answeredIncorrectly: function() {
      game.incorrect++;
      clearInterval(timer);
      panel.html('<h2>Nope!</h2>');
      panel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
      panel.append('<img src="' + questions[game.currentQuestion].image + '" />');
  
      if (game.currentQuestion === questions.length - 1){
        setTimeout(game.results, 3 * 1000);
      } else {
        setTimeout(game.nextQuestion, 3 * 1000);
      }
    },
    answeredCorrectly: function(){
      clearInterval(timer);
      game.correct++;
      panel.html('<h2>Correct!</h2>');
      panel.append('<img src="' + questions[game.currentQuestion].image + '" />');
  
      if (game.currentQuestion === questions.length - 1){
        setTimeout(game.results, 3 * 1000);
      } else {
        setTimeout(game.nextQuestion, 3 * 1000);
      }
    },
    reset: function(){
      this.currentQuestion = 0;
      this.counter = countStartNumber;
      this.correct = 0;
      this.incorrect = 0;
      this.loadQuestion();
    }
  };