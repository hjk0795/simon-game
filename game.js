var audioBlue = new Audio("./sounds/blue.mp3");
var audioGreen = new Audio("./sounds/green.mp3");
var audioRed = new Audio("./sounds/red.mp3");
var audioYellow = new Audio("./sounds/yellow.mp3");
var audioWrong = new Audio("./sounds/wrong.mp3");

var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var levelCount = 0;
var gameStart = 0;
var userChosenColour;

function nextSequence() {
  return (randomNumber = Math.floor(Math.random() * 4));
}

function playSound(name) {
  switch (name) {
    case "red":
      audioRed.play();
      break;
    case "blue":
      audioBlue.play();
      break;
    case "green":
      audioGreen.play();
      break;
    case "yellow":
      audioYellow.play();
      break;
    default:
      audioWrong.play();
  }
}

function checkLevel(level) {
  $("#level-title").text("Level " + level);
}

function selectComputer() {
  var randomChosenColour = buttonColours[nextSequence()];
  gamePattern.push(randomChosenColour);

  playSound(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);

  levelCount++;
  checkLevel(levelCount);
  userClickedPattern = [];
}

function compareArray() {
  if (levelCount == userClickedPattern.length) {
    var is_same =
      gamePattern.length == userClickedPattern.length &&
      userClickedPattern.every(function (element, index) {
        return element === gamePattern[index];
      });

    if (is_same) {
      setTimeout(function () {
        selectComputer();
      }, 1000);
    }
  }

  for (let i = 0; i < userClickedPattern.length; i++) {
    if (gamePattern[i] != userClickedPattern[i]) {
      endGame();
    }
  }
}

function endGame() {
  $("body").addClass("game-over");
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 200);

  $("#level-title").text("Game Over, Press Any Key to Restart");
  levelCount = 0;
  gameStart = 0;
  gamePattern = [];
  userClickedPattern = [];
}

$(document).on("keydown", function () {
  if (gameStart == 0) {
    gameStart = 1;
    selectComputer();
  }
});

$(".btn").on("click", function (event) {
  if (gameStart == 1) {
    userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    $("#" + userChosenColour)
      .fadeOut(100)
      .fadeIn(100);

    compareArray();
  }
});
