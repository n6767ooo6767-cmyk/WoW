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
    btn.style.visibility = 'hidden'; // Скрываем букву на панели, как будто мы её "взяли"
    currentAnswer.push(char);
    
    const answerDiv = document.getElementById('answer');
    const slot = document.createElement('div');
    slot.className = 'letter-slot';
    slot.innerText = char;
    answerDiv.appendChild(slot);
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
