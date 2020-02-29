import * as splash from "./splash.js"
const splashBlurSec = 2
const splashShowSec = 1
const splashFadeoutSec = 1

$(window).on('load', async () => {
    setTimeout(() => {
        splash.finish(splashBlurSec, splashFadeoutSec)
    }, splashShowSec * 1000)

    await faceapi.loadSsdMobilenetv1Model('/models')
});