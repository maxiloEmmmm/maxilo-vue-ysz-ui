<script>
import utils from '../utils.js'

export default {
    name: 'yszActive',
    data(){
        return {
            res: {}
        }
    },
    props: {
        event: {
            type: String,
            default: 'click'
        },
        class_key: {
            type: String,
            default: 'active'
        },
        relation: {
            type: Function,
            default: null
        },
        alone: {
            type: Boolean,
            default: true  
        },
        value: {
            type: Object,
            default(){
                return {};
            }
        }
    },
    render(h){
        this.$slots.default.forEach((v, i) => {
            let model = utils.get(v, 'data.attrs.model', false) ? v.data.attrs.model : i
            v.__active_model = model
            this.$set(this.res, model, this.res[model] === undefined ? false : this.res[model])
            let defEvent = utils.get(v, 'data.on.' + this.event, undefined)
            let hasDefEvent = !!defEvent
            utils.set(v, 'data.on.' + this.event, (e) => {
                this.$set(this.res, model, !this.res[model]);
                if(this.res[model] && this.alone) {
                    Object.keys(this.res).forEach(q => {
                        if(q != model) {
                            this.$set(this.res, q, false);
                        }
                    })
                }
                if(this.relation) {
                    this.res = this.relation(model, this.res);
                }
                this.$emit('input', this.res);
                this.$emit('click', model, this.res[model]);
                this.$slots.default.forEach(p => {
                    if(this.res[p.__active_model]) {
                        p.elm.classList.add(this.class_key);
                    }else {
                        p.elm.classList.remove(this.class_key)
                    }
                })
                if(hasDefEvent) {
                    return defEvent(e);
                }
            })
        })
        return h('div', this.$slots.default)
    }
}
</script>
