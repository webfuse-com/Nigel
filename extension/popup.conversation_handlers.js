window.CONVERSATION_HANDLERS = {
    onError(error) {
        console.error(error);
    },
    onStatusChange(data) {
        console.debug(data);

        UI.updateStatus(`${data.status.charAt(0).toUpperCase()}${data.status.slice(1)}`);
    },
    onModeChange(data) {
        console.debug(data);

        UI.updateOrb(data.mode);
    },
    onMessage(message) {
        console.debug(message);

        if(message.message.trim() === "...") return;

        const bubbleElement = document.createElement("LI");
        bubbleElement.className = message.role;
        bubbleElement.textContent = message.message.trim();

        const chatElement = document.querySelector("#chat");
        chatElement.appendChild(bubbleElement);

        bubbleElement.scrollIntoView();
    }
};