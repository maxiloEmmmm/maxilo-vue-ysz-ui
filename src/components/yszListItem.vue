<template>
    <div class="ysz ysz-list-item" :class="_class" @click="e => $emit('click', e)">
        <div class="ysz-list-item__left-item" v-show="_show_left"><slot name="left"></slot></div>
        <div class="ysz-list-item__right-item" v-show="_show_right"><slot></slot></div>
    </div>
</template>

<script lang="jsx">
export default {
    name: 'yszListItem',
    props: {
        alone: {
            type: String,
            default: ''
        },
        start: {
            type: Boolean,
            default: false
        },
        end: {
            type: Boolean,
            default: false
        },
        left: {
            type: Boolean,
            default: false
        },
        center: {
            type: Boolean,
            default: false
        },
        noP: {
            type: Boolean,
            default: false
        },
        leftItemCenter: {
            type: Boolean,
            default: false
        },
        rightItemCenter: {
            type: Boolean,
            default: false
        },
        leftItemEnd: {
            type: Boolean,
            default: false
        },
        rightItemEnd: {
            type: Boolean,
            default: false
        },
        itemCenter: {
            type: Boolean,
            default: false
        },
        itemEnd: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        _class(){
            return {
                'ysz-list-item__center': this.center,
                'ysz-list-item__left': this.left || this.alone == 'left',
                'ysz-list-item__start': this.start,
                'ysz-list-item__end': this.end,
                'ysz-list-item__no-p': this.noP,
                'ysz-list-item__left-item-center': this.leftItemCenter,
                'ysz-list-item__left-item-end': this.leftItemEnd,
                'ysz-list-item__right-item-center': this.rightItemCenter,
                'ysz-list-item__right-item-end': this.rightItemEnd,
                'ysz-list-item__item-center': this.itemCenter,
            }
        },
        _show_left(){
            return this.alone != 'right'
        },
        _show_right(){
            return this.alone != 'left'
        }
    }
}
</script>