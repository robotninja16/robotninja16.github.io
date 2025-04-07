let currentSlide = 0;

function onClick(event) {
    if (event.button !== 0) return;
    advanceSlide();
};

function setSlide() {
    let mainElement = document.getElementsByTagName("main")[0];
    Array.from(mainElement.children).forEach(child => child.style.display = "none");
    mainElement.children[currentSlide].style.display = "block";
}