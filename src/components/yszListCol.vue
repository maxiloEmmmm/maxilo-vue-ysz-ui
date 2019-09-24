<template>
    <div class="mxl-t-list-col">
        <slot></slot>
    </div>
</template>

<style lang="scss">
    .mxl-t-list-col {
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
    }
</style>

<script>
export default {
    name: 'yszListCol'
}
</script>