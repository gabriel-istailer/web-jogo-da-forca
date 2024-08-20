var words = ["sol", "lua", "mar", "flor", "céu", "rã", "gato", "rosa", "azul", "lápis", "livro", 
"brisa", "casa", "copo", "rato", "pão", "pé", "mão", "luz", "teto", "galho", "rede", "fino", "duro", 
"lã", "cor", "rei", "noite", "dia", "cão", "lata", "jato", "bola", "vento", "barco", "voo", "boca", "chão", 
"festa", "rua", "chuva", "solto", "rede", "fogo", "mesa", "dado", "lenha", "fuma", "barro", "papel", "abrigo", 
"bigorna", "correr", "divagar", "elefante", "fogueira", "girafa", "história", "ilustre", "jovial", "kleenex", 
"lamaçal", "máquina", "nozinho", "ouvido", "pálido", "queijo", "rochedo", "silêncio", "teclado", "urso", "verdade", 
"xadrez", "yoga", "zeloso", "árvore", "bússola", "céfiro", "dádiva", "êxito", "fiasco", "garganta", "hino", "ícone", 
"jovem", "kiwi", "lampião", "móvel", "névoa", "ocelote", "pássaro", "quasar", "relação", "solução", "travessa", 
"ultraje", "vácuo", "waffle", "xaxim", "yogurte", "zigzag", "automático", "biblioteca", "compositor", "desenvolver", 
"eletricidade", "fabricante", "governador", "hidromassagem", "independente", "justificativa", "kilometragem", 
"laboratório", "meteorologia", "notificação", "operacional", "paralelepípedo", "quantidade", "responsável", 
"sorveteiro", "transmissão", "ubiquitário", "variabilidade", "xadrezista", "abundante", "bolivariano", "caminhante", 
"determinante", "entusiasmo", "fotossíntese", "galvanoplastia", "hipopotomonstrosesquipedaliofobia", 
"inconstitucionalissimamente", "jacarandá", "kaleidoscópio", "linguiça", "macadâmia", "necessidade", "onipotente", 
"perspicácia", "quiropraxia", "radioterapia", "superposição", "tecnologia", "ultrapassar", "ventrículo", "xenofobia", 
"yakisoba", "ziguezagueante", "washingtoniano"];
localStorage.setItem("words", JSON.stringify(words));
var systemWord = {
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
    getWord: function(){
        var input = document.getElementById("textWord");
        var word = input.value;
        var levelWord = document.getElementById("levelWord");
        levelWord.classList.remove("easy","medium","hard");
        if(systemWord.isWord(word) !== false){
            words.push(systemWord.isWord(word));
            input.value = "";
            localStorage.setItem("words", JSON.stringify(words));
            levelWord.innerHTML = "Palavra adicionada!";
            //location.reload();
        }else{
            input.value = "";
            levelWord.innerHTML = "Palavra inválida!";
        }
    },
    takeOffWord: function(){
        var levelWord = document.getElementById("levelWord");
        levelWord.classList.remove("easy","medium","hard");
        if(words.length > 0){
            words.pop();
            localStorage.setItem("words", JSON.stringify(words));
            levelWord.innerHTML = "Palavra deletada!"
        }else{
            levelWord.innerHTML = "Não há nada à deletar!"
        }
        //location.reload();
    },
    showLevelWord: function(){
        var currentWord = document.getElementById("textWord").value;
        var levelWord = document.getElementById("levelWord");
        levelWord.classList.remove("easy","medium","hard");
        if(currentWord.length <= 5 && currentWord.length > 1){
            levelWord.innerHTML = "Fácil";
            levelWord.classList.add("easy");
        }else if(currentWord.length > 5 && currentWord.length < 10){
            levelWord.innerHTML = "Médio";
            levelWord.classList.add("medium");
        }else if(currentWord.length >= 10){
            levelWord.innerHTML = "Difícil";
            levelWord.classList.add("hard");
        }else{
            levelWord.innerHTML = "-";
        }
    }
};
function inputKeyPress(e){
    var addWord = document.getElementById("addWord");
    if(e.keyCode === 13){
        addWord.click();
        return false;
    }
}
function init(){
    var addWord = document.getElementById("addWord");
    var removeWord = document.getElementById("removeWord");
    var input = document.getElementById("textWord");

    var storedWords = localStorage.getItem("words");
    if (storedWords) {
        words = JSON.parse(storedWords);
        if(words.length > 0){
            console.log(words[words.length - 1]);
        }
    }

    input.oninput = systemWord.showLevelWord;
    input.onkeypress = inputKeyPress;
    addWord.onclick = systemWord.getWord;
    removeWord.onclick = systemWord.takeOffWord;
}
window.onload = init;
console.log(words);