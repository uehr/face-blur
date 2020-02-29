import * as StackBlur from "./stackblur-es.js";
const previewQuery = "#preview"
const blurBtnQuery = "#blur-btn"
const downloadBtnQuery = "#download-btn"
const btnSwitchSec = 2

export const showPreview = sec => {
    $(previewQuery).show(sec * 1000)
    $(blurBtnQuery).fadeIn(sec * 1000)
    $(downloadBtnQuery).hide()
}

export const blurBtnToDownloadBtn = sec => {
    const btnAnimateMSec = sec / 2 * 1000
    $(blurBtnQuery).fadeOut(btnAnimateMSec)
    setTimeout(() => {
        $(downloadBtnQuery).fadeIn(btnAnimateMSec)
    }, btnAnimateMSec)
}

// 顔の大きさに応じてぼかしをスケーリング
const blurScale = (w, h) => {
    return (w * h) / 700
}

$(window).on('load', async () => {
    const minConfidence = 0.1
    const maxResults = 500
    const marginScale = 1
    let preview = $("#preview-image")

    $("#blur-btn").click(() => {
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
            blurBtnToDownloadBtn(btnSwitchSec)
        })

    })


})