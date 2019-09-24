<template>
    <div class="mxl-t-modal" v-show="show">
        <div class="content" :style="_style.content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'yszModal',
    props: {
        size: {default: 65},
        show: {default: false}
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

<style lang="scss">
    .mxl-t-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1050;
        pointer-events: none;
        .content {
            pointer-events: auto;
            margin: 1.75em auto;
        }
    }
</style>
