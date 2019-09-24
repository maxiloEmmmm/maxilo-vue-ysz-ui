<template>
    <div class="weui-cell">
        <div class="weui-cell__hd"><label for="" class="weui-label"><slot name="label"></slot></label></div>
        <div class="weui-cell__bd">
            <slot></slot>
        </div>
        <div class="weui-cell__ft">
            <slot name="ft"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'yszWeuiCell'
}
</script>

