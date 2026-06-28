const sourceWord = "КАТАР";
let currentAnswer = [];

function initGame() {
    const container = document.getElementById('letters');
    sourceWord.split('').forEach((char, index) => {
        const btn = document.createElement('button');
        btn.innerText = char;
        btn.onclick = () => addToAnswer(char, btn);
        container.appendChild(btn);
    });
}

function addToAnswer(char, btn) {
    btn.style.opacity = '0.5';
    currentAnswer.push(char);
    const answerDiv = document.getElementById('answer');
    const span = document.createElement('span');
    span.innerText = char;
    answerDiv.appendChild(span);
}

function checkWord() {
    const word = currentAnswer.join('');
    const answerDiv = document.getElementById('answer');
    
    // Простая проверка: если слово есть в "базе" (можно дополнить массив)
    const validWords = ["ТАК", "РАТ", "КАРА", "ТРАК"];
    
    if (validWords.includes(word)) {
        answerDiv.className = 'correct';
        alert('Правильно!');
    } else {
        answerDiv.className = 'wrong';
        setTimeout(() => answerDiv.className = '', 500);
    }
}

initGame();
