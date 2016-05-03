(function() {
    var chatInput = document.getElementById("chat-input");
    var sendButton = document.getElementById("send-btn");
    var messageContainer = document.getElementById("msg-container");
    sendButton.addEventListener("click", sendChat);
    chatInput.addEventListener("keypress", function(event) {
        if (event.keyCode === 13) {
            sendChat();
        }
    });
    var sock = new SockJS('/chat');

    function ChatCtrl($scope) {
        $scope.messages = [];
        $scope.sendMessage = function() {
            sock.send($scope.messageText);
            $scope.messageText = "";
        };

        sock.onmessage = function(e) {
            $scope.messages.push(e.data);
            $scope.$apply();
        };
    }

    function sendChat() {
        var messageText = chatInput.value.trim();
        if (messageText === "") {
            return;
        }
        var chatMarkup = createChatMarkup(messageText);
        messageContainer.appendChild(chatMarkup);
        chatInput.value = "";
    }
    function createChatMarkup(messageText) {
        // <div class="msg msg-alt">
        //   <p>messageText</p>
        //   <span class="timestamp">12:00 AM</span>
        //  </div>
        var spanElement = document.createElement("span");
        var pElement = document.createElement("p");
        var divElement = document.createElement("div");
        pElement.textContent = messageText;
        spanElement.textContent = new Date().toLocaleTimeString();
        spanElement.className = "timestamp";
        divElement.className = "msg msg-alt";
        divElement.appendChild(pElement);
        divElement.appendChild(spanElement);
        return divElement;
    }
})();
//# sourceMappingURL=homepage.js.map