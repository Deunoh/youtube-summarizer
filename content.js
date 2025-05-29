function saveVideoUrl() {
  const url = window.location.href;
  if (url.includes("youtube.com/watch")) {
    chrome.storage.local.set({ videoUrl: url }, () => {
      console.log("URL de la vidéo stockée :", url);
    });
  }
}

function addGeminiButton() {
  if (document.getElementById('gemini-resume-btn')) return;

  const btn = document.createElement('button');
  btn.id = 'gemini-resume-btn';
  btn.textContent = '📄 Résumer avec Gemini';
  btn.style.position = 'fixed';
  btn.style.top = '100px';
  btn.style.right = '20px';
  btn.style.zIndex = '9999';
  btn.style.padding = '10px';
  btn.style.background = '#34A853';
  btn.style.color = '#fff';
  btn.style.border = 'none';
  btn.style.borderRadius = '5px';
  btn.style.cursor = 'pointer';

  btn.onclick = () => {
    alert("Ouvre l'icône de l'extension pour voir le résumé 😉");
  };

  document.body.appendChild(btn);
}

// Appel au chargement de la page
setTimeout(() => {
  saveVideoUrl();
  addGeminiButton();
}, 2000);
