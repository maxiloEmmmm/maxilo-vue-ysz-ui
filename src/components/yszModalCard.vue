<template>
    <t-modal :show.sync="show">
        <t-card @close="hide" :title="title">
            <slot></slot>
            <slot slot="header" name="header"></slot>
        </t-card>
    </t-modal>
</template>

<script lang="jsx">
export default {
    name: 'yszModalCard',
    props: {
        show: {default: false, type: Boolean},
        title: {default: '', type: String},
        size: {default: 65, type: [String, Number]},
    },
    methods: {
        hide(){
            this.$emit('update:show', false)
        }
    }
}
</script>
