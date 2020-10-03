<template>
    <div class="ysz ysz-card">
        <div class="ysz-card__header">
            <span v-if="title" class="ysz-card__header-title"></span><slot name="header"></slot>
        </div>
        <div class="ysz-card__body">
            <slot></slot>
        </div>
        <div class="ysz-card__footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'yszCard',
    props: {
        title: {default: '', type: String},
    }
}
</script>