import * as StackBlur from "./stackblur-es.js";
import * as splash from "./splash.js"
const splashBlurSec = 2
const splashShowSec = 1
const splashFadeoutSec = 3

// 顔の大きさに応じてぼかしをスケーリング
const blurScale = (w, h) => {
    return (w * h) / 700
}

$(window).on('load', async () => {
    setTimeout(() => {
        splash.finish(splashBlurSec, splashFadeoutSec)
    }, splashShowSec * 1000)

    const minConfidence = 0.1
    const maxResults = 500
    const marginScale = 1
    let preview = $("#image-preview")
    await faceapi.loadSsdMobilenetv1Model('/models')

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
                    const scale = blurScale(w, h)
                    StackBlur.canvasRGBA(bufferCanvas, x, y, w, h, scale)
                }))
            })
        }).then(_ => {
            preview.attr("src", bufferCanvas.toDataURL())
        })

    })

    $("#download").click(() => {
        const canvas = document.getElementById("image-buffer");
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "test.png";
        link.click();
    })


});