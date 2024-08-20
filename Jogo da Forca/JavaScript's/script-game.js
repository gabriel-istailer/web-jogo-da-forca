var damageWord = 2;
var damageLetter = 1;
localStorage.setItem("life", "0");

var game = {
    setLevelGame: function(n1,n2){
        var storedWords = localStorage.getItem("words");
        var words = JSON.parse(storedWords);
        var levelWords = words.filter(function(word){
            return word.length > n1 && word.length < n2;
        });
        return levelWords;
    },
    getLevelGame: function(){
        var mode = localStorage.getItem("mode");
        var modeTitle = document.getElementById("modeTitle");
        modeTitle.classList.remove("easy","medium","hard");
        switch(mode){
            case "easy":
                modeTitle.innerHTML = "Fácil";
                modeTitle.classList.add("easy");
            return game.setLevelGame(1,6);
            case "medium":
                modeTitle.innerHTML = "Médio";
                modeTitle.classList.add("medium");
            return game.setLevelGame(5,10);
            case "hard":
                modeTitle.innerHTML = "Difícil";
                modeTitle.classList.add("hard");
            return game.setLevelGame(9,30);
            default:
                console.log(mode);
        }
    },
    getWord: function(){
        var levelWords = game.getLevelGame();
        var randWord = Math.floor(Math.random() * levelWords.length);
        var word = levelWords[randWord];
        var realWord = word;
        var viewWord = document.getElementById("viewWord");
        var infoWord = document.getElementById("infoWord");
        var hiddenWord = word.split("").map(function(){
            return "_";
        }).join("");
        viewWord.innerHTML = hiddenWord;
        infoWord.innerHTML = "Letras: " + realWord.length;
        console.log(realWord);        
        localStorage.setItem("realWord", realWord);
        localStorage.setItem("hiddenWord", hiddenWord);
    },
    setWin: function(){
        var viewWord = document.getElementById("viewWord");
        var word = localStorage.getItem("realWord");
        var infoGame = document.getElementById("infoGame");
        viewWord.innerHTML = word;
        infoGame.classList.add("win");
        infoGame.innerHTML = "Vitória!";
        sendGuessLetter.onclick = null;
        sendGuessWord.onclick = null;
    },
    setLose: function(){
        var viewWord = document.getElementById("viewWord");
        var word = localStorage.getItem("realWord");
        var infoGame = document.getElementById("infoGame");
        viewWord.innerHTML = word;
        infoGame.classList.add("lose");
        infoGame.innerHTML = "Derrota!";
        sendGuessLetter.onclick = null;
        sendGuessWord.onclick = null;
    },
    setDamage: function(n){
        var img = document.getElementById("img");
        var infoLife = document.getElementById("infoLife");
        var maxLife = 6;
        var life = parseInt(localStorage.getItem("life"), 10);
        life = life + n;
        img.src = "../Contents/frame " + life + ".png";
        if(life == maxLife){
            game.setLose();
        }
        infoLife.innerHTML = "Vidas: " + (maxLife - life);
        JSON.stringify(life);
        localStorage.setItem("life", life);
    },
    accents: function(){
        var accents = localStorage.getItem("accents");
        if(accents === "on"){
            return true;
        }else{
            return false;
        }
    },
    isLetter: function(letter){
        if(!isNaN(letter) || letter.length > 1 || letter === "" || letter === " " || letter === "-"){
            return false;
        }
        var realLetter = "";
        letter = letter.toLowerCase();
        realLetter = letter.toLowerCase();
        letter = letter.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
        if(alphabet.includes(letter)){
            return realLetter;
        }else{
            return false;
        }
    },
    isWord: function(word){
        var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","-"," "];
        var count = 0;
        var countLetter = 0;
        if(!isNaN(word) || word.length <= 1){
            return false;
        }
        word = word.toLowerCase();
        var realWord = word.toLowerCase();
        word = word.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        for (var i = 0; i < word.length; i++) {
            var firstLetter = word[0];
            var noSpacesHyphens = word.replace(/[\s-]/g, firstLetter);
            if(firstLetter === noSpacesHyphens[i]){
                countLetter = countLetter + 1;
            }
            if(alphabet.includes(word[i])) {
                count = count + 1;
            }
        }
        if(count !== word.length || word.length === countLetter){
            return false;
        }else{
            return realWord;
        }
    },
    setLetter: function(){
        var inputGuessLetter = document.getElementById("guessLetter");
        var guessLetter = inputGuessLetter.value;
        guessLetter = game.isLetter(guessLetter);
        var word = localStorage.getItem("realWord");
        var hiddenWord = localStorage.getItem("hiddenWord");
        var viewWord = document.getElementById("viewWord");
        var infoGame = document.getElementById("infoGame");
        inputGuessLetter.value = "";
        if(guessLetter !== false){
            var count = 0;
            infoGame.innerHTML = "-";
            hiddenWord = hiddenWord.split("");
            for(var i = 0; i < word.length; i++){
                if(game.accents()){
                    if(word[i] === guessLetter){
                        hiddenWord[i] = word[i];
                    }else{
                        count = count + 1;
                        if(count === word.length){
                            game.setDamage(damageLetter);
                        }
                    }
                }else{
                    var wordNoAccents = word.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                    var guessLetterNoAccents = guessLetter.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                    if(wordNoAccents[i] === guessLetterNoAccents){
                        hiddenWord[i] = word[i];
                    }else{
                        count = count + 1;
                        if(count === word.length){
                            game.setDamage(damageLetter);
                        }
                    }
                }
            }
            hiddenWord = hiddenWord.join("");
            if(hiddenWord === word){
                game.setWin();
            }
            localStorage.setItem("hiddenWord", hiddenWord);
            viewWord.innerHTML = hiddenWord;
        }else{
            infoGame.innerHTML = "Letra inválida!";
        }
    },
    setWord: function(){
        var inputGuessWord = document.getElementById("guessWord");
        var guessWord = inputGuessWord.value;
        var word = localStorage.getItem("realWord");

        var infoGame = document.getElementById("infoGame");
        inputGuessWord.value = "";
        if(game.isWord(guessWord) !== false){
            if(game.accents()){
                if(guessWord === word){
                    game.setWin();
                }else{
                    game.setDamage(damageWord);
                }
            }else{
                var wordNoAccents = word.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                var guessWordNoAccents = guessWord.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                if(guessWordNoAccents === wordNoAccents){
                    game.setWin();
                }else{
                    game.setDamage(damageWord);
                }
            }
        }else{
            infoGame.innerHTML = "Palavra inválida!"
        }
    }
}

function init(){
    var sendGuessLetter = document.getElementById("sendGuessLetter");
    var sendGuessWord = document.getElementById("sendGuessWord");
    var infoGame = document.getElementById("infoGame");
    infoGame.classList.remove("win","lose");

    game.getWord();
    console.log(game.getLevelGame());
    sendGuessLetter.onclick = game.setLetter;
    sendGuessWord.onclick = game.setWord;
}
window.onload = init;