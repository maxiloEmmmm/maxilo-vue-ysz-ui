import components from './src/components'
import './src/sass/index.scss'

import twComponents from './src/components/tw'
import './src/sass/tw.scss'
const install = function(vue){
    components.map(component => {
        vue.component(component.name, component)
    })
    twComponents.map(component => {
        vue.component(component.name, component)
    })
}

if (window.Vue) {
    Vue.use(install)
}

export default {
    install
}