var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
$(document).keypress(function(){
    if (!started)
    {
        
        nextSequence();
        started = true;
    }
})

$(".btn").click(function()
{
    
    var userChosenColour = $(this).attr("id");
    $(this).addClass("pressed");
    setTimeout(()=>{
        $(this).removeClass("pressed"),100
    },100);
    
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})

function nextSequence(){
    started = true;
    level++;
    userClickedPattern=[];
    $("#level-title").text("Level " + level);
    var value = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[value];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(buttonName)
{
    var audio = new Audio("sounds/"+buttonName+".mp3");
    audio.play();
}

function checkAnswer(currentLevel)
{
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
        console.log("success");
        if (gamePattern.length === userClickedPattern.length)
        {
            setTimeout(function(){nextSequence();},1000);
        }
    }
    else 
    {
        console.log("failed");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");},200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();        
    }
}
function startOver()
{
    gamePattern = [];
    level = 0;
    started = false;
}

