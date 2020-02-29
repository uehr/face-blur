$(window).on('load', async () => {
    let canvas = $("#image-buffer");
    let preview = $("#image-preview")

    $("input[type=file]").change(function () {
        fileToEditor(this.files[0])
    })

    if (!window.FileReader) {
        alert("File API がサポートされていません。")
        return false
    }

    const isValidFile = file => {
        if (file.type.indexOf("image") < 0) {
            alert("画像ファイルを選択してください")
            return false
        } else if (!file.name.match(".jpg|.jpeg|.png")) {
            alert("JPEG/PNG形式のファイルを選択してください")
            return false
        }

        return true
    }

    const fileToEditor = file => {
        const fr = new FileReader()
        const selectedFileName = file.name
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
            preview.attr("src", evt.target.result)
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