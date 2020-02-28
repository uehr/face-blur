import * as StackBlur from "./stackblur-es.js";

$(window).on('load', async () => {
    await faceapi.loadSsdMobilenetv1Model('/models')
    const blurRadius = 15
    const minConfidence = 0.1
    const maxResults = 500
    const marginScale = 1.5
    let preview = $("#image-preview")
    let canvas = $("#image-buffer");

    $("#ufile").change(function () {
        if (!this.files.length) {
            alert('ファイルが選択されていません');
            return;
        }

        let file = this.files[0];
        let image = new Image();
        let fr = new FileReader();

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
    })

    $("#process").click(() => {
        const input = document.getElementById("image-buffer")
        const bufferCanvas = $("#image-buffer").get(0)

        faceapi.detectAllFaces(input, new faceapi.SsdMobilenetv1Options({
            minConfidence: minConfidence,
            maxResults: maxResults
        })).then(faces => {
            return new Promise(res => {
                res(faces.forEach(face => {
                    const x = parseInt(face.box.left)
                    const y = parseInt(face.box.top)
                    const w = parseInt(face.box.width * marginScale)
                    const h = parseInt(face.box.height * marginScale)
                    StackBlur.canvasRGBA(bufferCanvas, x, y, w, h, blurRadius)
                }))
            })
        }).then(_ => {
            preview.attr("src", bufferCanvas.toDataURL())
        })

    })
});