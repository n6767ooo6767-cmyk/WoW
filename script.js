document.getElementById('generate-btn').addEventListener('click', async () => {
    const promptInput = document.getElementById('prompt-input').value;
    const messageDisplay = document.getElementById('ai-message');
    
    if (!promptInput) {
        alert("Пожалуйста, введите запрос!");
        return;
    }

    messageDisplay.innerText = "Генерация...";
    
    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "nvidia/nemotron-3-ultra-550b-a55b:free",
                "messages": [{"role": "user", "content": promptInput}]
            })
        });

        const data = await response.json();
        messageDisplay.innerText = data.choices[0].message.content;
    } catch (error) {
        messageDisplay.innerText = "Ошибка: не удалось связаться с ИИ. Проверьте ключ в секретах.";
        console.error(error);
    }
});
