<template>
    <input class="weui-input" :type="type" :placeholder="placeholder">
</template>

<script lang="jsx">
export default {
    name: 'yszWeuiInput',
    props: {
        type: {
            type: String,
            default: 'text'
        },
        placeholder: {
            type: String,
            default: '请输入'
        }
    }
}
</script>