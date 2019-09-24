<script>
import Vue from 'vue'
export default {
    name: 'yszWeuiMsg',
    data(){
        return {
            store: {
                render: false
            }
        }
    },
    props: {
        show: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: '操作成功'
        },
        desc: {
            type: String,
            default: ''
        },
        btnEnable: {
            type: Boolean,
            default: true
        },
        btnText: {
            type: String,
            default: '确定'
        }
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
                    return <div class="weui-msg" v-show={self.show} style="position: fixed;left: 0; top: 0;right: 0;bottom: 0;z-index: 501;">
                        <div class="weui-msg__icon-area">
                            {iconSlot 
                                ? iconSlot
                                : <i class="weui-icon-success weui-icon_msg"></i>
                            }
                        </div>
                        <div class="weui-msg__text-area">
                            <h2 class="weui-msg__title">{self.$slots.title || self.title}</h2>
                            <p class="weui-msg__desc">{self.$slots.desc || self.desc}</p>
                        </div>
                        {
                            self.btnEnable 
                                ? <div class="weui-msg__opr-area">
                                    <p class="weui-btn-area">
                                        <a href="javascript:void(0);" class="weui-btn weui-btn_primary" onClick={self.click}>{self.btnText}</a>
                                    </p>
                                </div>
                                : ''
                        }
                    </div>
                }
            })
        }
        

        return h('div', {style: 'display: none'}, [this._t('icon'), this._t('title'), this._t('desc')])
    },
    methods: {
        click(){
            this.$emit('touch')
        }
    }
}
</script>

