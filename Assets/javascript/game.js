//Global Variables 
//-----------------------------------------------------------


//Array
const lorems = ['lorem', 'ipsum', 'dolor', 'sit',
    'amet', 'consectetur', 'adipiscing', 'elit', 'sed',
    'do', 'eiusmod', 'tempor', 'incididunt', 'ut',
    'labore', 'et', 'dolore', 'magna', 'aliqua',
    'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi',
    'aliquip', 'ex', 'ea', 'commodo', 'consequat', 'duis',
    'aute', 'irure', 'dolor', 'reprehenderit', 'in',
    'voluptate', 'velit', 'esse', 'cillum', 'dolore',
    'eu', 'fugiat', 'nulla', 'pariatur', 'excepteur',
    'sint', 'occaecat', 'cupidatat', 'non', 'proident',
    'sunt', 'culpa', 'qui', 'officia', 'deserunt',
    'mollit', 'anim', 'id', 'est', 'laborum'];

var randomWord = "";
var lettersInWord = [];
var underscoreNum = 0;
var undersAndSuccesses = [];
var wrongLetters = [];

var winCount = 0;
var lossCount = 0;
var guessesLeft = randomWord.length;

var soundPlayer1 = new Audio('Assets/Wavs/BackgroundMuzak(MadebyAxel).wav');

//Functions  
//-----------------------------------------------------------
function startGame() {
    randomWord = lorems[Math.floor(Math.random() * lorems.length)];
    lettersInWord = randomWord.split("");
    underscoreNum = randomWord.length;

    guessesLeft = randomWord.length;
    wrongLetters = [];
    undersAndSuccesses = [];

    for (var i = 0; i < underscoreNum; i++) {
        undersAndSuccesses.push("_");
    }

    document.getElementById("underscores").innerHTML = undersAndSuccesses.join(" ");
    document.getElementById("guessesLeftNum").innerHTML = guessesLeft;
    document.getElementById("winsNum").innerHTML = winCount;
    document.getElementById("lossesNum").innerHTML = lossCount;

    console.log(randomWord);
    //console.log(lettersInWord);
    //console.log(underscoreNum);
    console.log(undersAndSuccesses);
    console.log(guessesLeft);
    setTimeout(function () {
        soundPlayer1.play();

    }, 4000)

}

//needs two startGame functions so audio doesn't overlap between "you win" audio and backgground music (set interval time needs to be longer for the longer "you win" track.)
function startGameLongerPause() {
    randomWord = lorems[Math.floor(Math.random() * lorems.length)];
    lettersInWord = randomWord.split("");
    underscoreNum = randomWord.length;

    guessesLeft = randomWord.length;
    wrongLetters = [];
    undersAndSuccesses = [];

    for (var i = 0; i < underscoreNum; i++) {
        undersAndSuccesses.push("_");
    }

    document.getElementById("underscores").innerHTML = undersAndSuccesses.join(" ");
    document.getElementById("guessesLeftNum").innerHTML = guessesLeft;
    document.getElementById("winsNum").innerHTML = winCount;
    document.getElementById("lossesNum").innerHTML = lossCount;

    console.log(randomWord);
    //console.log(lettersInWord);
    //console.log(underscoreNum);
    console.log(undersAndSuccesses);
    console.log(guessesLeft);
    setTimeout(function () {
        soundPlayer1.play();

    }, 19500)

}




function checkLetters(letters) {
    var isLetterInWord = false;

    for (var i = 0; i < underscoreNum; i++) {
        if (randomWord[i] == letters) {
            isLetterInWord = true;
        }
    }
    if (isLetterInWord) {
        for (var i = 0; i < underscoreNum; i++) {
            if (randomWord[i] == letters) {
                undersAndSuccesses[i] = letters;
            }
        }
    }

    else {
        wrongLetters.push(letters);
        guessesLeft--
    }

    console.log(undersAndSuccesses);
    //console.log(guessesLeft);


}

function pauseAudio() {
    soundPlayer1.pause();
}

function roundComplete() {
    console.log("Win Count: " + winCount + " | Loss Count: " + lossCount + " Guesses Left: " + guessesLeft);

    document.getElementById("guessesLeftNum").innerHTML = guessesLeft;
    document.getElementById("underscores").innerHTML = undersAndSuccesses.join(" ");
    document.getElementById("lettersPlaced").innerHTML = wrongLetters.join(" ");



    //check if user won 
    if (lettersInWord.toString() == undersAndSuccesses.toString()) {
        winCount++;
        alert("You win!");

        document.getElementById("winsNum").innerHTML = winCount;
        var audio = new Audio('Assets/Wavs/MacPlus.wav');
        audio.play();



        pauseAudio();

        startGameLongerPause();


    }

    //check if user lost

    else if (guessesLeft == 0) {
        lossCount++;
        alert("You Lose!")

        document.getElementById("lossesNum").innerHTML = lossCount;



        var audio3 = new Audio('Assets/Wavs/sadtrumpet.wav');
        audio3.play();


        pauseAudio();

        startGame();

    }



}




//Main Processes 
//-----------------------------------------------------------
startGame();
soundPlayer1.play();

document.onkeyup = function (event) {
    var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    checkLetters(letterGuessed);
    roundComplete();


    console.log(letterGuessed);
}