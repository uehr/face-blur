import * as editor from "./image-editor.js"
const fadeInPreviewSec = 2

$(window).on('load', async () => {
    let canvas = $("#image-buffer");
    let preview = $("#preview-image")
    let selectedFileName

    $("input[type=file]").change(function () {
        fileToEditor(this.files[0])
    })

    if (!window.FileReader) {
        alert("Not support file API")
        return false
    }

    $("#download-btn").click(() => {
        const canvas = document.getElementById("image-buffer");
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = selectedFileName;
        link.click();
    })

    const isValidFile = file => {
        if (file.type.indexOf("image") < 0) {
            alert("Please select image file")
            return false
        } else if (!file.name.match(".jpg|.jpeg|.png")) {
            alert("Please select a file in JPEG / PNG format")
            return false
        }

        return true
    }

    const fileToEditor = file => {
        const fr = new FileReader()
        selectedFileName = file.name
        let image = new Image();

        if (file == null || !isValidFile(file)) return false

        let ctx = canvas[0].getContext('2d');
        fr.onload = function (evt) {
            image.onload = function () {
                const width = image.naturalWidth
                const height = image.naturalHeight
                canvas.attr('width', width);
                canvas.attr('height', height);
                ctx.drawImage(image, 0, 0, width, height);
            }
            image.src = evt.target.result;
            new Promise(res => {
                res(preview.attr("src", evt.target.result))
            }).then(_ => {
                editor.showPreview(fadeInPreviewSec)
                setTimeout(() => {
                    editor.blurFace()
                }, fadeInPreviewSec * 1000)
            })
        }

        fr.readAsDataURL(file);
    }

    const cancelEvent = event => {
        event.preventDefault()
        event.stopPropagation()
        return false
    }

    const handleDroppedFile = event => {
        var file = event.originalEvent.dataTransfer.files[0]
        fileToEditor(file)
        cancelEvent(event)
        return false
    }

    const droppable = $("#file-select-form")
    droppable.bind("dragenter", cancelEvent)
    droppable.bind("dragover", cancelEvent)
    droppable.bind("drop", handleDroppedFile)
})