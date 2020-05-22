<template>
    <div class="ysz-modal" v-show="show">
        <div class="content" :style="_style.content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'yszModal',
    props: {
        size: {default: 65, type: [String, Number]},
        show: {default: false, type: Boolean}
    },
    computed: {
        _style() {
            return {
                content: {
                    maxWidth: this.size+'%'
                }
            }
        }
    }
}
</script>
