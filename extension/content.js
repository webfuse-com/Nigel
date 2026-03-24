const CUSTOM_TOOLS = {
	async domSnapshot() {
		return (
			await browser
				.webfuseSession
				.automation
				.see
				.domSnapshot({
					root: "body",
					webfuseIDs: true
				})
		).slice(0, 2 ** 13.97);
	},
	getCurrentLocation() {
		return document.location.href;
	},
	injectCode(args) {
		console.debug(args.code);

        try {
			new Function(args.code)();
		} catch(err) {
			return err?.message ?? err.toString() ;
		}
	}
};



function propagateSize() {
	browser.runtime.sendMessage({
		type: "resize",
		size: {
			width: window.innerWidth,
			height: window.innerHeight
		}
	});
}


propagateSize();

window.addEventListener("resize", propagateSize);



browser.runtime.onMessage.addListener(message => {
	switch (message.type) {
		case "automate": {
			let scope;
			if (message.automationScope === "custom") {
				scope = CUSTOM_TOOLS;
			} else {
				scope = message.automationScope
					? browser.webfuseSession.automation[message.automationScope]
					: browser.webfuseSession.automation;
			}

			return scope[message.automationMethod](message.args);
		}
	}
});