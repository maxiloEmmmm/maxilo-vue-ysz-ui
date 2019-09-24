<template>
    <div class="ysz-no-scroll" ref="wrap">
        <div class="ysz-no-scroll__wrap">
            <div ref="content"><slot></slot></div>
        </div>
    </div>
</template>

<script>
import utils from '../utils'
export default {
    name: 'yszNoScroll',
    mounted(){
        this.render({width: this.$refs.wrap.offsetWidth, height: this.$refs.wrap.offsetHeight})
        utils.resize(this.$refs.wrap, this.render)
    },
    methods: {
        render(position){
            this.$refs.content.style.width = position.width + 'px'
            this.$refs.content.style.height = position.height + 'px'
        }
    }
}
</script>

