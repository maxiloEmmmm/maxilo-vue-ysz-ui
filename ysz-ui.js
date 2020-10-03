import components from './src/components'
import infiniteScroll from 'vue-infinite-scroll'
import './src/sass/index.scss'

import twComponents from './src/components/tw'
import './src/sass/tw.scss'

const install = function(vue){
    vue.use(infiniteScroll)
    
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