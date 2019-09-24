<template>
    <t-modal :show.sync="show">
        <t-card @close="hide" :title="title" :action_align="action_align">
            <slot></slot>
            <slot slot="header" name="header"></slot>
        </t-card>
    </t-modal>
</template>

<script>
export default {
    name: 'yszModalCard',
    props: {
        show: {default: false},
        title: {default: ''},
        action_align: {default: 'right'},
        size: {default: 65},
    },
    methods: {
        hide(){
            this.$emit('update:show', false)
        }
    }
}
</script>
