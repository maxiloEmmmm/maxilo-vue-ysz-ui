<template>
    <div class="relative" :class="{
        border: !left && !head,
        [`py-${mini ? 1 : 3}`]: !head,
        [`px-${mini ? 2 : 4}`]: !head,
        'rounded-sm': !head,
        'rounded-t': head,
        [`border-${_type_color}-400`]: true,
        [`bg-${_type_color}-100`]: true,
        [`text-${_type_color}-700`]: true,
        [`border-l-4`]: left,
        [`border-${_type_color}-500`]: left,
    }">
        <strong class="font-bold pr-1" :class="{
            [`bg-${_type_color}-500`]: head,
            'text-white': head,
            'rounded-t': head,
            'px-4': head,
            'py-2': head,
            'block': head
        }" v-text="title"></strong>
        <span class="block" :class="{
            'sm:inline': !head,
            'border': head,
            'border-t-0': head,
            [`border-${_type_color}-400`]: head,
            'rounded-b': head,
            [`bg-${_type_color}-100`]: head,
            'px-4': head,
            'py-3': head,
            [`text-${_type_color}-700`]: head
        }" v-text="desc"></span>
        <div class="absolute top-0 bottom-0 right-0 px-2 py-3" v-if="close">
            <strong @click="onClose" class="font-bold cursor-pointer text-left" :class="_close_color">x</strong>
        </div>
    </div>
</template>

<script lang="jsx">
import typeMix from "./type"
export default {
    mixins: [typeMix],
    name: "tw-alert",
    props: {
        title: String,
        desc: String,
        left: {type: Boolean, default: false},
        head: {type: Boolean, default: false},
        close: {type: Boolean, default: false},
        mini: {type: Boolean, default: false},
    },
    methods: {
        onClose(){this.$emit("close")}
    }
}
</script>