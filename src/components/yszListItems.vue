<script>
import utils from '../utils.js'
export default {
    name: 'yszListItems',
    functional: true,
    render(h, instance) {
        let children = []
        if(instance.children) {
            children = instance.children
        }

        let _class = {}
        let staticClass = utils.get(instance, 'data.staticClass')
        if(staticClass) {
            _class[staticClass] = true
        }

        let _style = {}

        let staticStyle = utils.get(instance, 'data.staticStyle')
        if(staticStyle) {
            _style = Object.assign({}, _style, staticStyle)
        }

        let items = []
        let len = children.length
        for(let i = 0; i < len; i+=2) {
            items.push(<ysz-list-item class={_class} style={_style}>
                <template slot="left">{children[i]}</template>
                {children[i+1]}
            </ysz-list-item>)
        }
        return items
    }
}
</script>