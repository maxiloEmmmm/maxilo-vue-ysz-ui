<script lang="jsx">
import utils from '../../utils'
export default {
    render() {
        return <div class="ysz-no-scroll" ref="wrap">
            <div class="ysz-no-scroll__wrap" ref="wrap_scroll">
                <div style={{width: this.w, height: this.h}}><div ref="context">{this.$slots.default()}</div></div>
            </div>
        </div>
    },
    name: 'noScroll',
    data(){return {w: "auto", h: "auto", top: 0}},
    mounted(){
        this.render({width: this.$refs.wrap.offsetWidth, height: this.$refs.wrap.offsetHeight})
        utils.resize(this.$refs.wrap, this.render)
    },
    props: {
        scrollTop: {
            type: Number,
            default: 0
        }
    },
    watch: {
        scrollTop() {
            this.reScrollTop()
        }
    },
    emits: ['scrollTop'],
    methods: {
        render(position){
            this.w = position.width + 'px'
            this.h = position.height + 'px'
            this.reScrollTop()
        },
        reScrollTop() {
            this.$nextTick(() => {
                this.$refs.wrap_scroll.scrollTop = (this.scrollTop / 100) * ((this.$refs.context).scrollHeight - parseInt(this.h))
                this.$emit('scrollTop', this.$refs.wrap_scroll.scrollTop)
            })
        }
    }
}
</script>

