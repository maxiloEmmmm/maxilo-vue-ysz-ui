<script lang="jsx">
export default {
    name: 'yszWeuiCells',
    props: {
        title: {
            default: '',
            type: String
        }
    },
    functional: true,
    render(h, vm){
        let $slots = vm.slots()
        let $title = $slots.title
        let title = vm.props.title
        return [
            ($title || title) ? h('div', {class: 'weui-cells__title'}, [$title ? $title : title]) : '',
            h('div', {class: 'weui-cells weui-cells_form'}, [$slots.default]),
        ]
    }
}
</script>