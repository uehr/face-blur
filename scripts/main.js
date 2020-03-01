import * as splash from "./splash.js"
import * as futil from "./file-util.js"
const splashBlurSec = 2
const splashShowSec = 1
const splashFadeoutSec = 1

window.addEventListener("load", async () => {
    console.log("Preparing")
    await faceapi.loadSsdMobilenetv1Model('/models')
    splash.finish(splashBlurSec, splashFadeoutSec)
    console.log("Ready")
    futil.setFileListener()
}, false)