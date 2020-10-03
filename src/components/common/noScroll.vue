<template>
    <div class="ysz-no-scroll" ref="wrap">
        <div class="ysz-no-scroll__wrap">
            <div :style="{width: w, height: h}"><slot></slot></div>
        </div>
    </div>
</template>

<script>
import utils from '../../utils'
export default {
    name: 'noScroll',
    data(){return {w: "auto", h: "auto"}},
    mounted(){
        this.render({width: this.$refs.wrap.offsetWidth, height: this.$refs.wrap.offsetHeight})
        utils.resize(this.$refs.wrap, this.render)
    },
    methods: {
        render(position){
            this.w = position.width + 'px'
            this.h = position.height + 'px'
        }
    }
}
</script>

