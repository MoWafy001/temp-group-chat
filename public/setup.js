console.log("hello1");

// functions
const getName = () => {
    const val = document.querySelector("#input-name input").value.trim();
    if (!val || val == "") return

    console.log("Welcome", val);
    username = val
    document.querySelector("#input-name").remove()
    startChat();
}

const displayMessage = (message, user = username) => {
    const messagesContainer = document.querySelector(".messages");

    m = document.createElement("span");
    m.className = "message";
    if (user === "room") m.classList.add("notice");
    else if (user === username) m.classList.add("me-message");

    m.innerHTML = `<span style="padding-left:0" class="badge">${user}:</span> <span class="message-body">${message}</span>`;

    messagesContainer.appendChild(m);
    messagesContainer.scrollTo(0, messagesContainer.scrollTopMax)

    if (user === username) {
        sendMessage(message);
    }
}


// Event listeners
// input name
document.querySelector("#input-name input").onkeyup = (e) => {
    if (e.key != "Enter") return;
    getName();
};
// submit the name
document.querySelector("#input-name-submit").onclick = getName;

// chat input
document.querySelector("#chat-input").onkeyup = (e) => {
    if (!username) return

    const { key, target } = e;
    if (key != "Enter") return;

    const val = target.value.trim();
    if (!val || val == "") return;
    target.value = "";

    displayMessage(val);

}

document.querySelector("#roomlink").onclick = (e) => {
    e.preventDefault();
    const link = e.target.href;

    var copyText = document.getElementById("myInput");

    navigator.clipboard.writeText(link);

    /* Alert the copied text */
    alert("The link has been copied to your clipboard: " + link);
}