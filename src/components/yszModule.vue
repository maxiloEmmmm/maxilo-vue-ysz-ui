<template>
    <div class="ysz-module">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'yszModule',
}
</script>

<style lang="scss" scoped>
    .ysz-module {
        margin-bottom: 20px; display: flex; flex-grow: 1;
        flex-direction: column; box-shadow: 0px 0px 13px 0px rgba(82, 63, 105, 0.05);
        background-color: #ffffff; border-radius: 4px;
    }
</style>