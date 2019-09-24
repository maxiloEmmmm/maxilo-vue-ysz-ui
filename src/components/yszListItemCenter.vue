<template>
    <div class="ysz ysz-list-item-center">
        <div class="ysz-list-item-center__left-item"><slot name="left"></slot></div>
        <div class="ysz-list-item-center__center-item"><slot></slot></div>
        <div class="ysz-list-item-center__right-item"><slot name="right"></slot></div>
    </div>
</template>

<script>
export default {
    name: 'yszListItemCenter',
    props: {
        noP: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        _class(){
            return {
                'ysz-list-item-center__no-p': this.noP,
            }
        }
    }
}
</script>