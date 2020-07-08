function mouseClick(event, url, realEvent) {
    if (realEvent != undefined) {
        realEvent.cancelable = true;
        realEvent.preventDefault();
    }
    if (event.button == 1 || event.button == 2)
        window.open(url);
}