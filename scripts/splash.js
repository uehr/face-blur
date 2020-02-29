const splashQuery = "#splash"
const splashLogoQuery = "#splash-logo"

export const start = async () => {
    return $(splashQuery).fadeIn()
}

export const finish = async (blurSec) => {
    return (() => {
        blurElement(splashLogoQuery, blurSec)
        $(splashLogoQuery).fadeOut(blurSec * 1000)
    })()
}

const blurElement = (query, sec) => {
    $(query).css("animation", `blur ${sec}s`)
}