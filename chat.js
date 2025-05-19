document.getElementById("chat-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const message = document.getElementById("message").value;

  fetch("send_message.php", {
    method: "POST",
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: "message=" + encodeURIComponent(message)
  }).then(() => {
    document.getElementById("message").value = "";
    loadMessages();
  });
});

function loadMessages() {
  fetch("get_messages.php")
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("messages");
      container.innerHTML = data.map(msg => `<div>${msg.content}</div>`).join("");
      container.scrollTop = container.scrollHeight;
    });
}

setInterval(loadMessages, 2000);
loadMessages();
