function downloadMazeImage() {
    document.getElementById("maze-canvas").toBlob(function(blob) {
        var dummy = document.createElement('a');
        dummy.href = URL.createObjectURL(blob);
        dummy.download = 'maze ' + new Date().toDateString() + '.png';
        dummy.click();
        dummy.remove();
    });
}