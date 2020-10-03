import maxiloVue from 'maxilo-vue'
import App from './App.vue'
import mvyutw from '../../ysz-tw'
import mvyu from '../../ysz-ui'

let router = maxiloVue.make("router").getRoute()


router.add("/", () => import("./index.vue"))

router.add("/bilibili", () => import("./bilibili.vue"))
router.add("/test-tw", () => import("./test-tw.vue"))
router.add("/test", () => import("./test.vue"))

maxiloVue.vue.config.productionTip = true
maxiloVue.vue.use(mvyu)
maxiloVue.vue.use(mvyutw)
maxiloVue.target = App
maxiloVue.run()
