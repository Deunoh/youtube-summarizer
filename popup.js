const GEMINI_API_KEY = "clé ici gemini"; 
const MODEL = "gemini-1.5-pro"; 

document.getElementById('summarize').addEventListener('click', () => {
  document.getElementById('summary').textContent = "Résumé en cours...";

  chrome.storage.local.get('videoUrl', async ({ videoUrl }) => {
    if (!videoUrl) {
      document.getElementById('summary').textContent = "URL de la vidéo introuvable.";
      return;
    }

    const prompt = `Fais un résumé de cette vidéo YouTube : ${videoUrl}`;

    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ]
        })
      });

      const data = await res.json();
      console.log("Réponse Gemini :", data);

      if (!res.ok) {
        document.getElementById('summary').textContent = `Erreur ${res.status} : ${data.error?.message || 'Erreur inconnue'}`;
        return;
      }

      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Aucune réponse.";
      document.getElementById('summary').textContent = text;

    } catch (err) {
      console.error("Erreur de requête :", err);
      document.getElementById('summary').textContent = "Erreur de connexion à Gemini.";
    }
  });
});
