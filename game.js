
var buttonColours = ["red", "green", "blue", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

// Showing the chosen button to user
function playSound(name){
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColour){
  document.querySelector("#"+currentColour).classList.add("pressed");
  setTimeout(function(){
    document.querySelector("#"+currentColour).classList.remove("pressed");
  },100);
}

function startOver(){
  level = 0;
  started = false;
  gamePattern = [];
}
function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
    console.log("success");
  }

  else{
    console.log("wrong");
    playSound("wrong");
    document.querySelector("body").classList.add("game-over");
    setTimeout(function(){
      document.querySelector("body").classList.remove("game-over");
    },200);
    document.querySelector("#level-title").innerHTML = "Game Over, Press Any Key to Restart";
    startOver();
  }

  if(currentLevel == (gamePattern.length -1)){
    setTimeout(nextSequence,1000);
  }

}
for(var i=0;i<document.querySelectorAll(".btn").length;i++){
  document.querySelectorAll(".btn")[i].addEventListener("click",function(){
    var userChosenColour = this.getAttribute("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length -1);
  });
}
function nextSequence(){
  userClickedPattern =  [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  var colour = document.querySelector(".btn." + randomChosenColour);
  colour.classList.add("show");
  setTimeout(function() {
    colour.classList.remove("show");
  }, 500);
  playSound(randomChosenColour);
  level += 1;
  document.querySelector("h1").innerHTML = "level "+level;
}

document.addEventListener("keydown",function(){
  if(!started){
    nextSequence();
    started = true;
  }
});
