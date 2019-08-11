var gamePattern = [];
var userPattern = [];
var buttonColours = ["green", "red", "yellow", "blue"];
var exclamation = ["Nice!", "Got It!", "Awesome!", "Way to Go!"];
var randomColour;
var chosenColour;
var gameStarted = false;
var level = 1;

if (gameStarted === false) {
  startGame();
}

//User click input - animate and play button sound
$(".btn").click(function() {
  chosenColour = $(this).attr("id");
  userPattern.push(chosenColour);
  makeSound(chosenColour);
  animatePress(chosenColour);

  checkAnswer(userPattern.length-1);
});

function startGame() {
  $(document).keydown(function() {
    gameStarted = true;
    $(document).unbind("keydown");
    nextLevel();
  });
}

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  level++;
  return randomNumber;
}

function animatePress(color) {
  $("."+color).addClass("pressed");
  setTimeout(function() {
    $("."+color).removeClass("pressed");
  }, 50);
}

function animateBackground() {
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
}

function makeSound(trigger) {
  switch(trigger) {
    case "green":
    var greenSound = new Audio("sounds/green.mp3");
    greenSound.play();
    break;

    case "red":
    var redSound = new Audio("sounds/red.mp3");
    redSound.play();
    break;

    case "yellow":
    var yellowSound = new Audio("sounds/yellow.mp3");
    yellowSound.play();
    break;

    case "blue":
    var blueSound = new Audio("sounds/blue.mp3");
    blueSound.play();
    break;

    case "wrong":
    var wrongSound = new Audio("sounds/wrong.mp3");
    wrongSound.play();
    break;

    default: break;
  }
}

function checkAnswer(index) {
  if (userPattern[index] === gamePattern[index]) {
    if (userPattern.length === gamePattern.length) {
      userPattern = [];
      var randomNumber = Math.floor(Math.random() * 4);
      $("#level-title").text(exclamation[randomNumber]);
      setTimeout(nextLevel, 1000);
    }
  }
  else {
    $("#level-title").text("Game Over. Press Any Key to Restart.");
    makeSound("wrong");
    animateBackground();

    level = 1;
    userPattern = [];
    gamePattern = [];
    gameStarted = false;

    startGame();
  }
}

function nextLevel() {
  $("#level-title").text("Level "+level);
  randomColour = buttonColours[nextSequence()];
  gamePattern.push(randomColour);
  $("#"+randomColour).fadeTo(100, 0.3, function() {
    makeSound(randomColour);
    $(this).fadeTo(100, 1);
  });
}
