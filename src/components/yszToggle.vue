<template>
    <div :class="val ? 'active' : ''" @click="touch"><slot></slot></div>
</template>

<script>
export default {
    name: 'yszToggle',
    props: {
        value: {
            default: false,
            type: Boolean
        }
    },
    data(){
        const v = !!this.$props.value
        return {
            val: v
        }
    },
    watch: {
        value(val){
            this.val = val
        }
    },
    methods: {
        touch(){
            this.val = !this.val;
            this.$emit('click', this.val);
            this.$emit('change', this.val);
        }
    },
    model: {
        prop: 'value',
        event: 'change'
    },
};
</script>

