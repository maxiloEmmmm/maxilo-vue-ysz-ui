<template>
    <i @click="e => $emit('click', e)">
        <svg class="icon" aria-hidden="true">
            <use :xlink:href="_icon"></use>
        </svg>
    </i>
</template>

<script lang="jsx">
export default {
    name: 'yszALiFont',
    props: {
        icon: {
            default: ''
        }
    },
    computed: {
        _icon(){
            return '#icon-' + this.icon;
        }
    }
}
</script>
