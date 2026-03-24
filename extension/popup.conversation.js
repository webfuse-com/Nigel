window.CONVERSATION = await (async () => {
    window.Conversation = (
        await import("https://cdn.jsdelivr.net/npm/@elevenlabs/client/+esm")
    ).Conversation;


    const DEFAULT_URL = "https://www.wikipedia.org";

    const STATE = {
        microphoneActive: false,
        conversation: null
    };


    startConversation();


    async function startConversation() {
        try {
            await navigator.mediaDevices.getUserMedia({ audio: true });
        } catch (e) {
            alert("Microphone permission required");

            return;
        }

        STATE.conversation = await window.Conversation.startSession({
            agentId: browser.webfuseSession.env.AGENT_KEY,
            connectionType: "websocket",
            clientTools: window.CLIENT_TOOLS,
            ...CONVERSATION_HANDLERS
        });

        document.querySelector("footer").classList.remove("passive");
    }


    return {
        async sendUserMessage(input) {
            const message = input.value.trim();

            if(!message.length) return;

            STATE.conversation.sendUserMessage(message);

            CONVERSATION_HANDLERS.onMessage({ role: "user", message });

            input.value = "";
        },
        toggleMicrophone(button) {
            STATE.microphoneActive = !STATE.microphoneActive;
            STATE.conversation.setMicMuted(STATE.microphoneActive);

            button.classList.toggle("active");
        },
        async endConversation() {
            UI.updateOrb("out");

            document.querySelector("footer").classList.add("passive");

            await STATE.conversation.endSession();
            await STATE.conversation?.connection?.room?.disconnect?.();

            STATE.conversation = null;

            goIdleUI("endSession");
        }
    };
})();
