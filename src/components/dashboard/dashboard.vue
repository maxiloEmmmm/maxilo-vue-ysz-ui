<template>
    <div  class="d-wrap relative">
        <div class="d-header fixed top-0 right-0">
            <div class="d-header__title">
                <div class="d-header__title-status">
                    <div class="items">
                        <tw-emotion size="lg" @click="onLogout">退出</tw-emotion>
                    </div>
                    
                </div>
            </div>
            <div class="d-header__status" @mousewheel="userWheel" ref="status" :style="{left: `${status_left}px`}">
                <div class="d-header__status-item">
                    <div @click="setCurrent(key)" v-for="(tab, key) in tabs" :key="key" :class="{active: key == current}">
                        <div class="d-header__status-item-title">{{ tab.title }}</div>
                        <div class="d-header__status-item-opear">
                            <div style="color:#ddd">|</div>
                            <div style="color:red" @click.stop="closeTab(tab)">x</div>
                            <div style="color:#ddd">|</div>
                            <div style="color:pink" @click="refreshTab(tab)">刷</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-slide">
            <div class="d-slide__title">
                <div class="d-slide__title-banner">{{this.title}}</div>
                <div>&lt;&lt;</div>
            </div>
            <no-scroll class="d-slide__list">
                <dashboard-slide @touch="touch" :navs="navs"></dashboard-slide>
            </no-scroll>
        </div>
        <div class="d-content">
            <div class="d-content-wrap">
                <iframe v-for="(tab, index) in tabs" :name="'w-'+index" :key="index" width="100%" height="100%" :src="u(tab.href)" frameborder="0" seamless :style="{display: current === index ? 'inline' : 'none'}"></iframe>
            </div>
        </div>
    </div>
</template>

<script>
import utils from '../../utils'
export default {
    name: 'dashboard',
    data(){return {
        tabs: {},
        current: "",
        status_left: 0
    }},
    props: {
        navs: {type: Array},
        title: {type: String, default: "-"}
    },
    methods: {
        onLogout(){
            this.$emit("logout")
        },
        u(path){
            if(/^https?/.test(path)) {
                return path
            }
            if(this.$app.make("router").mode == "hash") {
                let p = window.location.pathname
                if(path.slice(-1) == "/") {
                    p = path.slice(0, -1)
                }
                return window.location.origin + p + path
            }else {
                return `${window.location.origin}/${path}`
            }
        },
        touch(nav) {
            if(nav.open) {
                window.open(this.u(nav.href))
                return
            }
            let exist = Object.keys(this.tabs).filter(tab => nav.key == this.tabs[tab].key)[0]
            if(exist) {
                this.current = this.tabs[exist].__PAGE__
                return
            }
            let iframe = {...nav}
            iframe.__PAGE__ = utils.random("page-")
            this.$set(this.tabs, iframe.__PAGE__, iframe)
            this.current = iframe.__PAGE__
        },
        closeTab(nav){
            this.$delete(this.tabs, nav.__PAGE__)

            if(nav.__PAGE__ == this.current) {
                let last = Object.keys(this.tabs).slice(-1)
                if(last.length > 0) {
                    this.current = last[0]
                }
            }
        },
        refreshTab(nav){
            let src = document.all['w-' + nav.__PAGE__].src
            let d = src.split("#")
            let k = utils.random("")
            src = d[0]
            if(src.indexOf("?") == -1) {
                src += "?"
            }
            let path = src.split("?")
            let params = utils.parseURL(path[1])
            params["__IFRAME__"] = utils.random("")
            let nQ = []
            Object.keys(params).forEach(param => {
                nQ.push(`${param}=${params[param]}`)
            })
            nav.href = path[0] + "?" + nQ.join("&") + "#" + d[1]
        },
        setCurrent(key) {
            this.current = key
        },
        userWheel(e){ 
            let w = this.$refs.status.offsetWidth
            let sw = this.$refs.status.scrollWidth
            if(e.wheelDelta < 0) {
                let sy = sw - w
                if(sy > Math.abs(this.status_left)) {
                    let move = Math.abs(this.status_left - 25)
                    this.status_left -= move > sy ? sy : move
                }
            }else {
                if(this.status_left < 0) {
                    let move = Math.abs(this.status_left)
                    this.status_left += move >= 25 ? 25 : move 
                }
            }
        }
    }
}
</script>

<style >
body {background: #f2f3f8;}
</style>

<style lang="scss" scoped>
@import '../../sass/dashboard.scss';
</style>