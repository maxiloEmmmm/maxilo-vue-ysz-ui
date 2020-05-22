<template>
    <div class="ysz ysz-card">
        <div class="ysz-card__header">
            <div>
                {{title}}<slot name="header"></slot>
            </div>
            <div>
                <ysz-a-li-font icon="remove" @click="e => $emit('close', e)"></ysz-a-li-font>
            </div>
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