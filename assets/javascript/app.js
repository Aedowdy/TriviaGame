var panel = $('#quiz-area');
var countStartNumber = 30;

//CLICK EVENTS

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

//Question set

var questions = [{
  question: "Who played the lead role of 'Mad' Max Rockatansky in the series 1st run of three films?",
  answers: ["arnold schwarzenegger", "Tom Hardy", "Mel Gibson", "Jim Carrey"],
  correctAnswer: "Mel Gibson",
  image:"assets/images/madmax.gif"
}, {
  question: "What was the name of the famous hotel in John Wick?",
  answers: ["Holiday Inn", "The Continental", "Hilton", "The Sawyer"],
  correctAnswer: "The Continental",
  image:"assets/images/johnwick.gif"
}, {
  question: "The name of the Alien race in the movie Edge of Tomorrow were called what?",
  answers: ["Faceless", "The Avengers", "Borg", "Mimics"],
  correctAnswer: "Mimics",
  image:"assets/images/edge.gif"
}, {
  question: "Tony Stark is a character from what movie?",
  answers: ["Iron Man", "Batman", "The Hulk", "Star Wars"],
  correctAnswer: "Iron Man",
  image:"assets/images/ironman.gif"
}, {
  question: "What was the name of the king who led an army to fight against the Spartans in the movie 300?",
  answers: ["King Leonidas", "King Aurthur", "King Kong", "King Xerxes"],
  correctAnswer: "King Xerxes",
  image:"assets/images/sparta.gif"
}, {
  question: "What was the name given to the raptor that fought with the main characters in Jurrasic World?",
  answers: ["Red", "Pink", "Blue", "Alpha"],
  correctAnswer: "Blue",
  image:"assets/images/raptor.gif"
}, {
  question: "Who was not in The Expendables 3?",
  answers: ["Sylvester Stallone", "Jason Statham", "Ben affleck", "Terry Crews"],
  correctAnswer: "Ben affleck",
  image:"assets/images/arnold.gif"
}, {
  question: "In what movie did Denzel Washington play a blind man who had to fight his way across America in a post apocalyptic world?",
  answers: ["Dawn Of The Planet Of The Apes", "The Book Of Eli", "After Earth", "The Road"],
  correctAnswer: "The Book Of Eli",
  image:"assets/images/eli.gif"
}];


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
    panel.html('<h2>Nice Try!</h2>');
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
    panel.html('<h2>Your Awesome!</h2>');
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