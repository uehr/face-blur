import * as splash from "./splash.js"
const splashBlurSec = 2
const splashShowSec = 1
const splashFadeoutSec = 1

$(window).on('load', async () => {
    console.log("Preparing")
    await faceapi.loadSsdMobilenetv1Model('/models')
    splash.finish(splashBlurSec, splashFadeoutSec)
    console.log("Ready")
});