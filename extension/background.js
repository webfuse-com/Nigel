const CONFIG = {
    offset: 40,
    size: {
        width: 350,
        height: 400
    }
};

const STATE = {
    isMobile: false
};


function repositionPopup(windowSize = {}) {
    const isMobile = windowSize.width < (CONFIG.size.width + 2 * CONFIG.offset);
    const offset = isMobile ? 0 : CONFIG.offset;

    browser.browserAction.setPopupPosition({
        [ isMobile ? "bottom" : "top" ]: `${offset}px`,
        right: `${offset}px`
    });
}


repositionPopup();

browser.browserAction.resizePopup(CONFIG.size.width, CONFIG.size.height);
browser.browserAction.setPopupStyles({
    backgroundColor: "transparent",
});
browser.browserAction.detachPopup();
browser.browserAction.openPopup();


browser.runtime.onMessage
    .addListener(message => {
        if (message.type !== "resize") return;

        repositionPopup(message.size);
    });