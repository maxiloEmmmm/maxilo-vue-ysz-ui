<template>
    <a href="javascript:;" 
        :class="_class"><slot></slot></a>
</template>

<script lang="jsx">
export default {
    name: 'yszWeuibtn',
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        block: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: 'primary'
        },
        cell: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        },
        min: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        _class(){
            return {
                'weui-btn': true,
                'weui-btn_plain-disabled': this.disabled,
                ['weui-btn_' + (this.cell ? 'cell-' : '') + this.type]: true,
                'weui-btn_block': this.block,
                'weui-btn_loading': this.loading,
                'weui-btn_mini': this.min
            }
        }
    }
}
</script>