'use strict';

const aiPanel = document.getElementById('ai-panel');
const aiMessages = document.getElementById('ai-messages');
const aiInput = document.getElementById('ai-input');
const aiSendBtn = document.getElementById('ai-send-btn');
const aiCloseBtn = document.getElementById('ai-close-btn');

// ── AI panel toggle ──────────────────────────────────────────────────────────

function openAiPanel() {
  aiPanel.classList.remove('collapsed');
  aiInput.focus();
}

function closeAiPanel() {
  aiPanel.classList.add('collapsed');
}

function toggleAiPanel() {
  if (aiPanel.classList.contains('collapsed')) {
    openAiPanel();
  } else {
    closeAiPanel();
  }
}

// Listen for menu-triggered toggle
window.fastlook.onToggleAiPanel(toggleAiPanel);

aiCloseBtn.addEventListener('click', closeAiPanel);

// ── Messaging helpers ────────────────────────────────────────────────────────

function appendMessage(text, role) {
  const el = document.createElement('div');
  el.classList.add('ai-message', role);
  el.textContent = text;
  aiMessages.appendChild(el);
  aiMessages.scrollTop = aiMessages.scrollHeight;
}

// ── Send a message to the AI ─────────────────────────────────────────────────

async function sendMessage() {
  const prompt = aiInput.value.trim();
  if (!prompt) return;

  aiInput.value = '';
  aiSendBtn.disabled = true;
  appendMessage(prompt, 'user');

  try {
    // Placeholder response – replace with a real AI API call.
    const reply = await getAiReply(prompt);
    appendMessage(reply, 'assistant');
  } catch (err) {
    appendMessage('Error: ' + err.message, 'error');
  } finally {
    aiSendBtn.disabled = false;
    aiInput.focus();
  }
}

/**
 * Stub AI response handler.
 *
 * Replace this function with a real API call (e.g. OpenAI, Anthropic, Ollama)
 * to enable live AI assistance.
 *
 * @param {string} prompt
 * @returns {Promise<string>}
 */
async function getAiReply(prompt) {
  // Simulate network latency for the stub
  await new Promise((resolve) => setTimeout(resolve, 400));
  return `You asked: "${prompt}"\n\n(AI integration coming soon – replace getAiReply() in renderer.js with your preferred API.)`;
}

// ── Event listeners ──────────────────────────────────────────────────────────

aiSendBtn.addEventListener('click', sendMessage);

aiInput.addEventListener('keydown', (e) => {
  // Ctrl+Enter / Cmd+Enter submits
  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
    e.preventDefault();
    sendMessage();
  }
});
