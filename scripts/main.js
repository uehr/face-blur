import * as splash from "./splash.js"
import * as futil from "./file-select.js"
const splashBlurSec = 2
const splashShowSec = 1
const splashFadeoutSec = 1
const hoverActionQuery = "#file-select-form,a,button"

window.addEventListener("load", async () => {
    console.log("Preparing")
    await faceapi.loadSsdMobilenetv1Model('/models')
    splash.finish(splashBlurSec, splashFadeoutSec)
    console.log("Ready")
    futil.setFileListener()

    const isTouchDevice = (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);

    if (isTouchDevice) {
        $(hoverActionQuery).on("touchstart", function () {
            $(this).addClass("hover")
        })
        $(hoverActionQuery).on("touchend", function () {
            $(this).removeClass("hover")
        })
    } else {
        $(hoverActionQuery).hover(
            function () {
                $(this).addClass("hover")
            },
            function () {
                $(this).removeClass("hover")
            }
        )
    }
}, false)