document.addEventListener("DOMContentLoaded", loadChatHistory);
function sendMessage(){
    const inputField = document.getElementById("messageInput");
    const message = inputField.value.trim();

    if (message === '') return; 

    addMessage(message, "user");;
    saveMessage(message, "user");
    inputField.value = '';

    setTimeout(() =>{
        const response = ["Hello! How can I help you today?", "I'm here to assist you!", "What do you need help with?", "How can I assist you?", "Hello! How can I help you?"];
        const botResponse = response[Math.floor(Math.random() * response.length)];
        addMessage(botResponse, "bot");
        saveMessage(botResponse, "bot");
    },1500);

}

function addMessage(text, sender) {
        const chatBox = document.getElementById('chatBox');
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);
        messageDiv.innerHTML = text + `<span class="timestamp">${getTime()}</span>`;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;  
    }

function getTime(){
    const now = new Date();
    return now.getHours() + ":" + String(now.getMinutes()).padStart(2, '0')
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

function saveMessage(text, sender){
    const messages = JSON.parse(sessionStorage.getItem("chatHistory")) || [];
    messages.push({ text, sender, time: getTime() });
    sessionStorage.setItem("chatHistory", JSON.stringify(messages));
}

function loadChatHistory(){
    const messages = JSON.parse(sessionStorage.getItem("chatHistory")) || [];
    messages.forEach(message => {
        addMessage(message.text, message.sender);
    })

}