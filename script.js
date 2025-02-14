document.addEventListener("DOMContentLoaded", function () {
    const chatBox = document.querySelector(".chatbox"); 
    const textarea = document.querySelector("#user-input");
    const sendBtn = document.querySelector("#send-btn");

    const API_KEY = "sk-...v2IA"; // Mets ta clé OpenAI ici

    sendBtn.addEventListener("click", sendMessage);
    textarea.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Empêche le saut de ligne
            sendMessage();
        }
    });

    function sendMessage() {
        let userMessage = textarea.value.trim();
        if (userMessage === "") return; // Empêcher l'envoi d'un message vide

        addMessage(userMessage, "outgoing"); // Affiche le message de l'utilisateur
        textarea.value = "";

        fetchGPTResponse(userMessage); // Appelle l'API OpenAI
    }

    function addMessage(message, type) {
        let messageElement = document.createElement("li");
        messageElement.classList.add("chat", type);
        messageElement.innerHTML = `<p>${message}</p>`;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight; // Scroll vers le bas
    }

    async function fetchGPTResponse(userMessage) {
        addMessage("...", "incoming"); // Indicateur de chargement

        const API_URL = "https://api.openai.com/v1/chat/completions";

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${API_KEY}`
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [{ role: "user", content: userMessage }]
                })
            });

            if (!response.ok) {
                throw new Error(`Erreur API : ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            const botMessage = data.choices?.[0]?.message?.content || "Je ne comprends pas 🤖";

            // Remplace "..." par la réponse
            document.querySelector(".chat.incoming:last-child p").innerText = botMessage;
        } catch (error) {
            console.error("Erreur de connexion à OpenAI :", error);
            document.querySelector(".chat.incoming:last-child p").innerText = "❌ Erreur de connexion.";
        }
    }
});
