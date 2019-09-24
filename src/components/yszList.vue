<script>
import utils from '../utils.js'

export default {
    name: 'yszList',
    props: {
        row: {
            type: Boolean,
            default: false
        },
        noLine: {
            type: Boolean,
            default: false
        },
        group: {
            type: Number,
            default: 0
        }
    },
    functional: true,
    render(h, instance) {
        if(!instance.children) {
            instance.children = []
        }

        instance.children = instance.children.filter(v => {
            return v.tag !== undefined || v.text.replace(/^[\s]*.*?[\s]*$/, "").length !== 0
        })

        let child_nums = instance.children.length
        let direction = !instance.props.row ? 'column' : 'row'

        let _class = {
            'ysz': true,
            'ysz-list':  true,
            'ysz-list__row': instance.props.row,
            'ysz-list__group': hasGroup
        }

        let staticClass = utils.get(instance, 'data.staticClass')
        if(staticClass) {
            _class[staticClass] = true
        }

        let _style = {}

        let staticStyle = utils.get(instance, 'data.staticStyle')
        if(staticStyle) {
            _style = Object.assign({}, _style, staticStyle)
        }

        let hasGroup = instance.props.group != 0
        let group_percent = !hasGroup ? 0 : ((100 / instance.props.group).toFixed(6) + '%')
        return h('div', {
            class: _class,
            style: _style
        }, instance.children.map((val, k) => {
            let isLast = hasGroup ? (((k+1) % instance.props.group) === 0) : (child_nums == (k+1))
            let style = hasGroup ? {flexBasis: group_percent} : {}
            return h('div', {
                style,
                class: {
                    ['ysz-list__' + direction + '-wrapper']: true,
                    'ysz-list__wrapper-last': isLast,
                    'ysz-list__wrapper-no-line': instance.props.noLine
                }
            }, [utils.getSlot(instance.children, k, h)])
        }));
    }
}
</script>