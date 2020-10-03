<template>
    <ul :class="{nav: dep == 1}">
        <li v-for="nav in _navs" :key="nav.key">
            <a @click.stop="toggle(nav)" href="javascript:void(0)" :class="{active: current == nav.key}">
                <div class="d-nav__item-icon"><div :class="{'d-nav__item-icon__dot': dep == 1, 'd-nav__item-icon__line': dep > 1}"></div></div>
                <div class="d-nav__item-label">{{ nav.title }}</div>
                <div v-if="nav.hasChild" class="d-nav__item-open" :class="{active: active[nav.key]}">&lt;</div>
            </a>
            <dashboard-slide @touch="nav => touch(nav)" v-show="active[nav.key]" v-if="nav.hasChild" :dep="dep+1" class="d-nav__child" :navs="nav.children"></dashboard-slide>
        </li>
    </ul>
</template>

<style lang="scss" scoped>
@import '../../sass/dashboard.scss';
</style>

<script>
import utils from "../../utils"
export default {
    name: "dashboardSlide",
    data(){
        return {
            active: {},
            current: "",
        }
    },
    props: {
        navs: {type: Array},
        dep: {type: Number, default: 1}
    },
    computed: {
        _navs(){return this.navs.map(nav => {
            nav.key = nav.key || utils.random("nav-item-")
            nav.hasChild = Array.isArray(nav.children) && nav.children.length > 0
            return nav
        })}
    },
    methods: {
        setCurrent(nav){
            this.current = nav.key
        },
        touch(nav){
            this.$emit("touch", {...nav})
        },
        toggle(nav){
            if(!nav.hasChild) {
                this.touch(nav)
                this.setCurrent(nav)
                return
            }
            let open = !this.active[nav.key]
            this.$set(this.active, nav.key, open)
            open && this.setCurrent(nav)
        }
    }
}
</script>