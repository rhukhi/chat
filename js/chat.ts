(function() {
    let chatInput = document.getElementById("chat-input");
    let sendButton = document.getElementById("send-btn");
    let messageContainer = document.getElementById("msg-container")

    sendButton.addEventListener("click", sendChat);
    chatInput.addEventListener("keypress", (event) => {
        if (event.keyCode === 13) {
            sendChat();
        }
    })

    function sendChat() {
        let messageText: string = chatInput.value.trim();
        if (messageText === "") {
            return;
        }

        let chatMarkup: HTMLDivElement = createChatMarkup(messageText);

        messageContainer.appendChild(chatMarkup);
        chatInput.value = "";
    }

    function createChatMarkup(messageText: string): HTMLDivElement {
        // <div class="msg msg-alt">
        //   <p>messageText</p>
        //   <span class="timestamp">12:00 AM</span>
        //  </div>

        let spanElement = document.createElement("span");
        let pElement = document.createElement("p");
        let divElement = document.createElement("div");

        pElement.textContent = messageText;
        spanElement.textContent = new Date().toLocaleTimeString();

        spanElement.className = "timestamp";
        divElement.className = "msg msg-alt";

        divElement.appendChild(pElement);
        divElement.appendChild(spanElement);

        return divElement;
    }
})()