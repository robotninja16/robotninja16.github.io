function downloadImage(imageElement, defaultName) {
    imageElement.toBlob(function(blob) {
        var dummy = document.createElement('a');
        dummy.href = URL.createObjectURL(blob);
        dummy.download = defaultName + ' ' + new Date().toDateString() + '.png';
        dummy.click();
        dummy.remove();
    });
}