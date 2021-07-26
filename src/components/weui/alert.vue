<script lang="jsx">
import Vue from 'vue'
export default {
    name: 'yszWeuiAlert',
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
        cancleBtnText: {
            type: String,
            default: '取消'
        },
        okBtnText: {
            type: String,
            default: '确定'
        },
        cancleBtnEnable: {
            type: Boolean,
            default: true
        }
    },
    render(){
        if(!this.store.render) {
            this.store.render = true
            const div = document.createElement('div')
            document.body.appendChild(div)
            const self = this

            new Vue({
                el: div,
                render(){
                    return <div class="js_dialog" v-show={self.show}>
                        <div class="weui-mask"></div>
                        <div class="weui-dialog" style="width:unset;max-width:unset">
                            <div class="weui-dialog__hd">{self.$slots.title || <strong class="weui-dialog__title">{self.title}</strong>}</div>
                            <div class="weui-dialog__bd">{self.$slots.desc || self.desc}</div>
                            <div class="weui-dialog__ft">
                                {self.cancleBtnEnable 
                                    ? <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default" onClick={self.cancleClick}>{self.cancleBtnText}</a>
                                    : ''
                                }
                                <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" onClick={self.okClick}>{self.okBtnText}</a>
                            </div>
                        </div>
                    </div>
                }
            })
        }

        return h('div', {style: 'display: none'}, [this._t('icon'), this._t('title'), this._t('desc')])
    },
    methods: {
        cancleClick(){
            this.$emit('cancle-touch')
        },
        okClick(){
            this.$emit('ok-touch')
        }
    }
}
</script>

