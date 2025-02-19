function setBackgroundImage() {
    let hiddenBgImageInput = document.getElementById("upload-bg-img-input");
    hiddenBgImageInput.click();
}

function bgImageChosen() {
    let hiddenBgImageInput = document.getElementById("upload-bg-img-input");
    let bgImageElement = document.getElementById("bg-img");
    if (typeof hiddenBgImageInput === "object" && hiddenBgImageInput.files.length > 0) {
        bgImageElement.src = URL.createObjectURL(hiddenBgImageInput.files[0]);
        bgImageElement.alt = bgImageElement.title = hiddenBgImageInput.files[0].name;
    }
}

function removeBackgroundImage() {
    let bgImageElement = document.getElementById("bg-img");
    bgImageElement.src = "";
    bgImageElement.alt = bgImageElement.title = "";
}

function changeImageMode() {
    bgImageMode = (bgImageMode + 1) % bgImageModes.length;
    document.getElementById("change-img-mode-btn").innerText = "Change image mode (" + bgImageModes[bgImageMode] + ")";
}