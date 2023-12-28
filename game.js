var buttonColors=["red", "blue", "green", "yellow"];
var gamePattern=[];
var randomChosenColor="";
var userPattern=[];
var userChosenColor="";
var started=false;
var level=0;

$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    sequence();
    started = true;
  }
});

$(".btn").click(function(){
userChosenColor=this.id;
var audio=new Audio(`sounds/${this.id}.mp3`);
audio.play();
userPattern.push(userChosenColor);
console.log(userPattern);
animatePress(this.id);
checkAnswer(userPattern.length-1);
});

function animatePress(currentcolor){
$("#"+currentcolor).addClass("pressed");
setTimeout(function(){$("#"+currentcolor).removeClass("pressed")}, 100);
}

function sequence(){
userPattern.length=0;
level++;
$("#level-title").text("Level " + level);
var randomNumber=Math.floor(Math.random()*4);
randomChosenColor=buttonColors[randomNumber];
gamePattern.push(randomChosenColor);
$("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
var audio=new Audio(`sounds/${randomChosenColor}.mp3`);
audio.play();
console.log(gamePattern);
}

function checkAnswer(length){
if (userPattern[length]===gamePattern[length]){
  if(userPattern.length===gamePattern.length){
    setTimeout(sequence,1000);
  }
}
else{
  var audio=new Audio("sounds/wrong.mp3");
  audio.play();
  $("body").addClass("game-over");
  setTimeout(function(){$("body").removeClass("game-over")}, 200);
  $("#level-title").text("Game Over,press any key to continue");
  level=0;
  gamePattern=[];
  userPattern=[];
  started=false;
}
}
