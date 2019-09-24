import components from './src/components'
import infiniteScroll from 'vue-infinite-scroll'
import './src/sass/index.scss'

const install = function(vue){
    vue.use(infiniteScroll)
    
    components.map(component => {
        vue.component(component.name, component)
    })
}

if (window.Vue) {
    Vue.use(install)
}

export default {
    install
}