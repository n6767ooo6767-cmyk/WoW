#!/usr/bin/env node
const { execSync } = require('child_process');
const { OpenAI } = require('openai');
const { Command } = require('commander');

const program = new Command();
const openai = new OpenAI({ apiKey: 'ТВОЙ_OPENAI_API_KEY' });

program.action(async () => {
  try {
    // Получаем изменения, которые добавлены в stage
    const diff = execSync('git diff --cached').toString();
    
    if (!diff) {
      console.log('Нет изменений для коммита!');
      return;
    }

    console.log('Думаю над коммитом...');

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{
        role: "system",
        content: "Ты — профессиональный разработчик. Напиши краткое и точное сообщение для git commit на основе diff. Используй Conventional Commits (fix:, feat:, refactor: и т.д.). Только текст коммита, без кавычек и лишних слов."
      }, {
        role: "user",
        content: diff
      }],
    });

    const commitMessage = completion.choices[0].message.content.trim();
    console.log(`\nПредлагаю: ${commitMessage}`);
    
    // Автоматический коммит
    execSync(`git commit -m "${commitMessage.replace(/"/g, '\\"')}"`);
    console.log('✅ Готово!');
    
  } catch (err) {
    console.error('Ошибка:', err.message);
  }
});

program.parse();
