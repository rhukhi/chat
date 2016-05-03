angular.module("chatApp", [])
    .controller('ChatCtrl', ChatCtrl);

var sock = new SockJS('/chat');
function ChatCtrl($scope) {
  $scope.messages = [];
  $scope.sendMessage = function() {
    var msg = {};
    msg.userID = $scope.username;
    msg.body  = $scope.messageText;
     
    sock.send(JSON.stringify(msg));
    $scope.messageText = "";
  };

  sock.onmessage = function(e) {
    console.log(e);

    var data = JSON.parse(e.data);
    
    if (data.event === "connected") {
        $scope.username = data.userID

    }
    
    if (data.event === "text" && data.body !== '') {
        $scope.messages.push(data);
    }
    
    $scope.$apply();
  };
}
