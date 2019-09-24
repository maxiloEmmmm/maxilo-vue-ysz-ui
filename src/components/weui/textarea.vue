<template>
    <textarea 
        class="weui-textarea" 
        :placeholder="placeholder" 
        :rows="rows"></textarea>
</template>

<script>
export default {
    name: 'yszWeuiTextarea',
    props: {
        placeholder: {
            type: String,
            default: '请输入'
        },
        rows: {
            type: Number,
            default: 3
        }
    }
}
</script>