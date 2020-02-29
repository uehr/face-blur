const splashQuery = "#splash"
const splashLogoQuery = "#splash-logo"

export const start = async () => {
    return $(splashQuery).fadeIn()
}

export const finish = async (blurSec, fadeoutSec) => {
    return (() => {
        blurElement(splashLogoQuery, blurSec)
        $(splashLogoQuery).fadeOut(blurSec * 1000)
        setTimeout(() => {
            $(splashQuery).fadeOut(fadeoutSec * 1000)
        }, blurSec * 1000)
    })()
}

const blurElement = (query, sec) => {
    $(query).css("animation", `blur ${sec}s`)
}