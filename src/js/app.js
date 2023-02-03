import * as flsFunctions from "./files/isWebP.js";

window.addEventListener("load", async () => {
    if ("serviceWorker" in navigator) {
        try {
            const reg = await navigator.serviceWorker.register("sw.js");
            // console.log("Service worker register success", reg);
        } catch (e) {
            console.log("Service worker register fail");
        }
    }
});

flsFunctions.isWebp();
