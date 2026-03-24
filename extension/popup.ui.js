window.UI = {
    updateOrb(state) {
        document.querySelector("#orb").setAttribute("src", `./img/nigel-${state}.png`);
    },
    updateStatus(status) {
        document.querySelector("#status").textContent = status;
    }
};