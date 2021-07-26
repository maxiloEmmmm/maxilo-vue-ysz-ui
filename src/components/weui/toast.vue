<script lang="jsx">
import Vue from 'vue'
export default {
    name: 'yszWeuiToast',
    data(){
        return {
            store: {
                timer: null,
                render: false
            }
        }
    },
    props: {
        show: {
            type: Boolean,
            default: false
        },
        duration: {
            type: Number,
            default: 1.5
        },
        msg: {
            type: String,
            default: '已完成'
        },
        type: {
            type: String,
            default: 'success',
            validator(val){ 
                return ['success', 'info', 'loading', 'info', 'search', 'cancle', 'clear', 'circle', 'waiting'].includes(val)
            }
        }
    },
    watch: {
        show: {
            handler(val){
                val ? this.startClose() : this.stopClose()
            },
            immediate: true
        },
        duration(){
            this.restartClose()
        }
    },
    model: {
        prop: 'show',
        event: 'show-change'
    },
    render(){
        if(!this.store.render) {
            this.store.render = true
            const div = document.createElement('div')
            document.body.appendChild(div)
            const self = this
            let iconSlot = this.$slots.icon ? this.$slots.icon[0] : false
            new Vue({
                el: div,
                render(){
                    return <div v-show={self.show}>
                        <div class="weui-mask_transparent"></div>
                        <div class="weui-toast">
                            {iconSlot 
                                ? iconSlot
                                : <i class={'weui-icon-' + self.type + ' weui-icon_toast'} style="font-size:55px"></i>}
                            <p class="weui-toast__content">{self.$slots.default || self.msg}</p>
                        </div>
                    </div>
                }
            })
        }

        return h('div', {style: 'display: none'}, [this._t('icon')])
    },
    methods: {
        startClose(){
            if(!this.store.timer) {
                this.store.timer = setTimeout(() => {
                    this.$emit('show-change', false)
                }, this.duration * 1000)
            }
        },
        stopClose(){
            if(this.store.timer) {
                clearTimeout(this.store.timer)
                this.store.timer = null
            }
        },
        restartClose(){
            this.stopClose()
            this.startClose()
        }
    }
}
</script>

