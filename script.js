async function sendMessage() {
  const input = document.getElementById('userInput').value;
  const responseDiv = document.getElementById('response');
  responseDiv.textContent = "Thinking...";

  const response = await fetch('/.netlify/functions/chatgpt', {
    method: 'POST',
    body: JSON.stringify({ message: input }),
    headers: { 'Content-Type': 'application/json' }
  });

  const data = await response.json();
  responseDiv.textContent = data.reply || "Sorry, something went wrong.";
}
