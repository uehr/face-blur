import * as StackBlur from "./stackblur-es.js";
const previewQuery = "#preview"
const previewImageQuery = "#preview-image"
const downloadBtnQuery = "#download-btn"
const processingAnimeQuery = "#loading-spinner"
const btnSwitchSec = 1
const processingViewOpacity = 0.5
const minConfidence = 0.1
const maxResults = 500
const marginScale = 1


export const showPreview = sec => {
    $(previewQuery).show(sec * 1000)
    $(downloadBtnQuery).hide()
}

export const startProcessingView = async (sec, previewOpacity) => {
    return (() => {
        $(processingAnimeQuery).fadeIn(sec * 1000)
        $(previewImageQuery).animate({ opacity: previewOpacity, }, { duration: sec * 1000, })
    })()
}

export const finishProcessingView = async (sec) => {
    return (() => {
        $(downloadBtnQuery).fadeIn(sec * 1000)
        $(processingAnimeQuery).fadeOut(sec * 1000)
        $(previewImageQuery).animate({ opacity: 1, }, { duration: sec * 1000, })
    })()
}

// 顔の大きさに応じてぼかしをスケーリング
const blurScale = (w, h) => {
    return w / 5
}

export const blurFace = () => {
    const input = document.getElementById("image-buffer")
    const bufferCanvas = $("#image-buffer").get(0)
    let preview = $("#preview-image")

    startProcessingView(btnSwitchSec, processingViewOpacity)

    setTimeout(() => {
        faceapi.detectAllFaces(input, new faceapi.SsdMobilenetv1Options({
            minConfidence: minConfidence,
            maxResults: maxResults
        })).then(faces => {
            return new Promise(res => {
                if (faces.length) {
                    res(faces.forEach(face => {
                        const x = parseInt(face.box.left)
                        const y = parseInt(face.box.top)
                        const w = parseInt(face.box.width * marginScale)
                        const h = parseInt(face.box.height * marginScale)
                        const scale = blurScale(w, h)
                        StackBlur.canvasRGBA(bufferCanvas, x, y, w, h, scale)
                    }))
                } else {
                    alert("Unable to detect face")
                    res(false)
                }
            })
        }).then(_ => {
            preview.attr("src", bufferCanvas.toDataURL())
            finishProcessingView(btnSwitchSec)
        })
    }, btnSwitchSec * 1000)
}