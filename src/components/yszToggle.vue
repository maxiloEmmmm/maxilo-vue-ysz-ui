<template>
    <div :class="value ? 'active' : ''" @click="touch"><slot></slot></div>
</template>

<script>
export default {
    name: 'yszToggle',
    props: {
        value: {
            default: false
        }
    },
    methods: {
        touch(){
            let x = !this.value;
            this.$emit('input', x);
            this.$emit('click', x);
        }
    }  
};
</script>

