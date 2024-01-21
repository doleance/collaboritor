const webSocket = new WebSocket("ws://localhost:3005");
let editor;

document.addEventListener("DOMContentLoaded", function() {
    editor = document.getElementById('code-editor-area');
    // TODO: töltsd be az összes eddigit;
    listenOnWSMessages();
    listenOnKeyPress();
});

function listenOnWSMessages() {
    webSocket.addEventListener("message", (event) => {
        const newCode = event.data;
        editor.value = newCode;
      });
}

function listenOnKeyPress() {
    editor.addEventListener('keyup', function (event) {
        webSocket.send(event.target.value);
    }, false);
}

function onRunCode() {
    // TODO: running tests. nope. code.
}