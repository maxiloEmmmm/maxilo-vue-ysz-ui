import components from './src/components/weui'
import './src/sass/weui.scss'
import * as config from "./src/config"
const install = function (vue) {
    components.map(component => {
        vue.component(component.name, component)
    })
}

if (window.Vue) {
    Vue.use(install)
}

export default {
    install,
    config
}