const API_KEY = 'CLE CHATGPT ICI';

document.getElementById('summarize').addEventListener('click', () => {
  document.getElementById('summary').textContent = 'Résumé en cours...';

  chrome.storage.local.get('videoUrl', async ({ videoUrl }) => {
    const prompt = `Fais un résumé de cette vidéo YouTube : ${videoUrl}`;

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7
      })
    });

    const data = await res.json();
    const message = data.choices?.[0]?.message?.content || 'Erreur de réponse';
    document.getElementById('summary').textContent = message;
  });
});
