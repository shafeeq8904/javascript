Real-time Chat Simulation

📌 Project Overview

This project is a simple real-time chat simulation built using HTML, CSS, and JavaScript without a backend. It simulates real-time messaging by displaying user messages instantly and responding with bot-generated messages after a short delay. The chat history is stored in session storage, ensuring messages persist during a session.

🎯 Features

✅ Real-time chat interface

✅ Bot-generated responses using setTimeout()

✅ Session storage to persist chat messages during a session

✅ Auto-scroll to the latest message

✅ Send messages using the Enter key

✅ Timestamps for messages

🚀 How It Works

The user types a message and presses Enter or clicks the Send button.

The message appears instantly in the chat window.

The message is stored in session storage.

After 1.5 seconds, the bot responds with a random message.

The chat history is loaded from session storage when the page is refreshed.

📜 Code Explanation

🔹 sendMessage() - Sending User Messages

Handles user input, displays the message, and saves it.

function sendMessage() {
    const inputField = document.getElementById('messageInput');
    const message = inputField.value.trim();
    if (message === "") return;

    addMessage(message, 'user');
    saveMessage(message, 'user');
    inputField.value = '';
}

🔹 addMessage() - Display Messages in the Chat Box

Creates a message element and appends it to the chat box.

function addMessage(text, sender) {
    const chatBox = document.getElementById('chatBox');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.innerHTML = text + `<span class="timestamp">${getTime()}</span>`;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

 saveMessage() - Store Messages in Session Storage

Ensures chat history persists during the session.

function saveMessage(text, sender) {
    const messages = JSON.parse(sessionStorage.getItem("chatHistory")) || [];
    messages.push({ text, sender, time: getTime() });
    sessionStorage.setItem("chatHistory", JSON.stringify(messages));
}

🔹 loadChatHistory() - Load Chat History on Page Refresh

Retrieves messages from session storage and displays them.

function loadChatHistory() {
    const messages = JSON.parse(sessionStorage.getItem("chatHistory")) || [];
    messages.forEach(msg => addMessage(msg.text, msg.sender));
}
document.addEventListener("DOMContentLoaded", loadChatHistory);

🔹 setTimeout() - Simulating Bot Responses

Generates a random bot response with a delay.

setTimeout(() => {
    const responses = ["Hello!", "How are you?", "Nice to chat with you!", "That's interesting!", "Tell me more!"];
    const botMessage = responses[Math.floor(Math.random() * responses.length)];
    addMessage(botMessage, 'bot');
    saveMessage(botMessage, 'bot');
}, 1500);