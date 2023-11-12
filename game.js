var buttonColours = ["red", "blue", "green", "yellow"] ;
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).on("keypress",function(){
    if(!started){
        $("#level-title").html("level "+level);
        nextSequence();
        started = true;
    }
    });

    $(".btn").on("click",function(){
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length-1);
    });

    function checkAnswer(currentLevel){
        if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
            if(userClickedPattern.length === gamePattern.length){
                setTimeout(function(){
                    nextSequence();
                },600);
            }
        }else{
            var sound = new Audio("sounds/wrong.mp3");
            sound.play();
            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over");
            },200);
            $("#level-title").html("Game Over, Press Any Key to Restart " );
            var currentLevel = level-1;
            $("#high-score").html("High Score: " + currentLevel);
            setTimeout(function(){
                $("#high-score").html(" ");
            },2000);
            startOver();

        }
    }

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").html("level "+ level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour  = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);       
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}   
function playSound(name){
    // var audio = new Audio("./sounds/"+randomChosenColour+"mp3");
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);

}
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;

}