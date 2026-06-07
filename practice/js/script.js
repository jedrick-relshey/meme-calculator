const display = document.getElementById("display");
const fullscreenResult = document.getElementById("fullscreenResult");
const resultVideo = document.getElementById("resultVideo");
const closeResult = document.getElementById("closeResult");

let input = "";

function updateDisplay(value) {
    display.innerText = value || "0";
}

function append(value) {
    input += value;
    updateDisplay(input);
}

function clearDisplay() {
    input = "";
    updateDisplay("0");
}

function calculate() {
    if (input.trim() === "") {
        return;
    }

    showFullscreenResult();
    clearDisplay();
}

function showFullscreenResult() {
    fullscreenResult.classList.add("active");
    fullscreenResult.setAttribute("aria-hidden", "false");

    resultVideo.currentTime = 0;
    resultVideo.muted = false;

    const playPromise = resultVideo.play();
    if (playPromise) {
        playPromise.catch(() => {
            resultVideo.muted = true;
            resultVideo.play();
        });
    }

    if (fullscreenResult.requestFullscreen) {
        fullscreenResult.requestFullscreen().catch(() => {});
    }
}

function hideFullscreenResult() {
    resultVideo.pause();
    fullscreenResult.classList.remove("active");
    fullscreenResult.setAttribute("aria-hidden", "true");

    if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
    }
}

closeResult.addEventListener("click", hideFullscreenResult);

document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (key === "Escape") {
        hideFullscreenResult();
        return;
    }

    if (key === "Enter" || key === "=") {
        event.preventDefault();
        calculate();
        return;
    }

    if (key === "Backspace") {
        input = input.slice(0, -1);
        updateDisplay(input);
        return;
    }

    if (key.toLowerCase() === "c") {
        clearDisplay();
        return;
    }

    if (/^[0-9+\-*/.]$/.test(key)) {
        append(key);
    }
});
