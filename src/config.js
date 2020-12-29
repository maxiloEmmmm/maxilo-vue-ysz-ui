import utils from "./utils"

export const responsive = {
    size: {
        xs: 768,
        sm: 992,
        md: 1200
    },
    timeRange: 90,
    cb: [],
    current: "lg"
}

export const init = function () {
    window.addEventListener("resize", utils.debounce(function(e) {
        let w = window.innerWidth
        if(w < responsive.size.xs) {
            responsive.current = "xs"
        }else if(w < responsive.size.sm) {
            responsive.current = "sm"
        }else if(w < responsive.size.md) {
            responsive.current = "md"
        }else {
            responsive.current = "lg"
        } 
        responsive.cb.forEach(c => c(responsive.current))
    }, responsive.timeRange))

    const e = document.createEvent('Event')
    e.initEvent('resize', true, true)
    window.dispatchEvent(e)
}