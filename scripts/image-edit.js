$(window).on('load', async () => {
    document.getElementById("download").onclick = _ => {
        let canvas = document.getElementById("image-buffer");
        let link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "test.png";
        link.click();
    }
})