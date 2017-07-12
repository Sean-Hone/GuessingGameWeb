var num;
var guess = 0;
var $numBox = $('#numbox');
var $guessBut = $('#guessBut');
var $restart = $('#restart');
var win = false;

var r;
var g;
var b;

reset();

$guessBut.on('click', process);
$restart.on('click', reset);

function process(){ //deals with all logic and checks when the guess button is clicked
    if(!win){ //if they haven't correctly guessed yet
        guess = parseInt($numBox.val());

        //checks guess is  valid
        if(isNaN(guess)){
            alert("Guess must be a number");
        }
        else {guess = Math.floor(guess);}

        if(guess<1 || guess>100){
            alert("Guess must be between 1 and 100");
        }

        else{ //if valid guess go through game logic
            $numBox.val("");
            if(guess === num){
                $('#status').html("Congratgulations you guessed it. Press Restart");
                flash('g',$guessBut); //guess button flashes green when correct
                win = true;
            }
            else if(guess < num){
                $('#status').html(guess + " is lower than my number");
                flash('r',$guessBut); //guess button flashes red when incorrect
            }
            else if(guess > num){
                $('#status').html(guess + " is higher than my number");
                flash('r',$guessBut); //guess button flashes red when incorrect
            }

        }
    }
    else{
        $numBox.val("");
    }
}

//generates teh random number
function generateNum(){
    num = Math.floor(Math.random()*100)+1;
    console.log(num); //left in to allow people to check game logic
    $numBox.val("");
}

//sets up game to its beginning state when restart pressed
function reset(){
    generateNum();
    $('#status').html("Have a guess!");
    if(win){
        flash('g', $restart); //guess button flashes green if they have won the game
        win = false;
    }
    else{
        flash('r', $restart); //guess button flashes red when they havent won the game
    }

}

//flash aniation takes color to flash and the button to perform it on.
//will increase passed color every 10 miliseconds using css rgb.
//then once it reaches max will increase back to original num
function flash(color, button){
    r=220;
    g=220;
    b=220;

    if(color==='g'){
        var light = true;
        var animation = setInterval(changeColG,10, button);
    }
    else if(color==='r'){
        var light = true;
        var animation = setInterval(changeColR,10, button);
    }

    function changeColG(button){
        if(g<255 && light) g++;
        else if(g>220){
            light = false;
            g--;
        }
        else{
            clearInterval(animation);
            return;
        }
        button.css("background-color", "rgb(" + r + "," + g + "," + b + ")" );
    }

    function changeColR(button){
        if(r<255 && light) r++;
        else if(r>220){
            light = false;
            r--;
        }
        else{
            clearInterval(animation);
            return;
        }
        button.css("background-color", "rgb(" + r + "," + g + "," + b + ")" );
    }
}
