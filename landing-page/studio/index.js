const NIGEL = (() => {
	// Webfuse Widget
	(function (w, e, b, f, u, s) {
		w[f] = w[f] || {
			initSpace: function () {
				return new Promise(resolve => {
					w[f].q = arguments;
					w[f].resolve = resolve;
				});
			},
		};
		u = e.createElement(b);
		s = e.getElementsByTagName(b)[0];
		u.async = 1;
		u.src = "https://webfu.se/surfly.js";
		s.parentNode.insertBefore(u, s);
	})(window, document, "script", "Webfuse");


	document.addEventListener("DOMContentLoaded", () => {
		const demoOverlayElement = document.querySelector("#demo-overlay ");
		const demoOverlayImageElement = demoOverlayElement.querySelector("img");
		const demoOverlaySpanElement = demoOverlayElement.querySelector("span");

		demoOverlayElement.addEventListener("click", () => {
			demoOverlayElement.classList.remove("active");
		});

		[ ...document.querySelectorAll("#demo li") ]
			.forEach(demoElement => {
				demoElement.addEventListener("click", () => {
					console.log(demoElement)
					demoOverlayImageElement.setAttribute("src", demoElement.querySelector("img").getAttribute("src"));
					demoOverlaySpanElement.textContent = demoElement.getAttribute("data-query");

					demoOverlayElement.classList.add("active");
				});
			});
	});


	return {
		call(query) {
			query = query.trim();

			if(!query.length) return;

			document.body.classList.add("session");

			webfuse
				.initSpace(
					"{{.WEBFUSE_WIDGET_KEY}}",
					"{{.WEBFUSE_SPACE_ID}}",
					{
						metadata: {
							query
						}
					}
				)
				.then(async space => {
					console.debug(space);

					const webfuseSession = space.session();

					webfuseSession
					.on("session_started", () => {});

					await webfuseSession.start();
				})
				.catch(error => {
					console.error(error);
				});
		}
	};
})();