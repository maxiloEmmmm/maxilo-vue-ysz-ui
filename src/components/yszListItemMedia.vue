<template>
    <ysz-list-item class="ysz-list-item-media">
        <span slot="left"><slot name="avatar"></slot></span>
        <ysz-list-item :left="true">
            <ysz-list-item-top :no-tm="true" slot="left">
                <span slot="top" class="ysz-list-item-media__title">
                    <slot name="title"></slot>
                </span>
                <span class="ysz-list-item-media__desc">
                    <slot></slot>
                </span>
            </ysz-list-item-top>
            <slot name="action"></slot>
        </ysz-list-item>
    </ysz-list-item>
</template>

<script>
export default {
    name: 'yszListItemMedia'
}
</script>

