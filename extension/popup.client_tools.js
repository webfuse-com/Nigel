window.CLIENT_TOOLS = (() => {
    let idleTimeout;

    function defineTool(name, automationScope, automationMethod) {
        return {
            [name]: async args => {
                console.debug(`[${name}]`, args);

                clearTimeout(idleTimeout);

                UI.updateOrb("acting");
                UI.updateStatus("Acting");

                idleTimeout = setTimeout(() => {
                    UI.updateStatus("Idle");
                }, 3000);

                return await browser.tabs
                    .sendMessage(0, {
                        type: "automate",
                        automationScope,
                        automationMethod,
                        args
                    });
            }
        };
    }


    return {
        ...defineTool("navigate", null, "navigate"),
        ...defineTool("mouse_move", "act", "mouseMove"),
        ...defineTool("scroll", "act", "scroll"),
        ...defineTool("click", "act", "click"),
        ...defineTool("type", "act", "type"),
        ...defineTool("text_select", "act", "textSelect"),
        ...defineTool("take_dom_snapshot", "custom", "domSnapshot"),
        ...defineTool("get_current_location", "custom", "getCurrentLocation"),
        ...defineTool("inject_code", "custom", "injectCode"),
        ...defineTool("search_with_query", "custom", "searchWithQuery"),
    };
})();