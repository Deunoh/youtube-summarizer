function addSummarizeBtn() {
  if (document.getElementById('chatgpt-resume-btn')) return;

  const btn = document.createElement('button');
  btn.id = 'chatgpt-resume-btn';
  btn.textContent = '📄 Résumer avec ChatGPT';
  btn.style.position = 'fixed';
  btn.style.top = '100px';
  btn.style.right = '20px';
  btn.style.zIndex = '9999';
  btn.style.padding = '10px';
  btn.style.background = '#10a37f';
  btn.style.color = '#fff';
  btn.style.border = 'none';
  btn.style.borderRadius = '5px';
  btn.style.cursor = 'pointer';

  btn.onclick = () => {
    const url = window.location.href;
    chrome.storage.local.set({ videoUrl: url }, () => {
      chrome.runtime.sendMessage({ action: 'openPopup' });
    });
  };

  document.body.appendChild(btn);
}

setTimeout(addSummarizeBtn, 2000);
