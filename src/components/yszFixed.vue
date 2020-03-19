<template>
    <div>
        <div ref="target">
            <slot></slot>
        </div>
        <div style="position:fixed" :style="_style.window_wrapper">
            <div ref="window">
                <slot name="sub"></slot>
            </div>
        </div>
    </div>
</template>

<script>
import utils from '../utils.js'

export default {
    name: 'yszFixed',
    data(){
        return {
            d: {
                v_width: 200,
                v_height: 300,
                w_width: 50,
                w_height: 50,
                t_top: 70,
                t_left: 70,
                t_bottom: 70,
                t_width: 0,
                t_height: 0
            },
            no_s: false
        };
    },
    mounted(){
        this.$set(this.d, 'v_width', document.body.offsetWidth);
        this.$set(this.d, 'v_height', document.body.offsetHeight);
        window.addEventListener('resize', () => {
            this.$set(this.d, 'v_width', document.body.offsetWidth);
            this.$set(this.d, 'v_height', document.body.offsetHeight);
            this.t();
        });
        this.$set(this.d, 'w_width', this.$refs.window.offsetWidth);
        this.$set(this.d, 'w_height', this.$refs.window.offsetHeight);
        utils.resize(this.$refs.window, this.r);
        utils.resize(this.$refs.target, this.t);
    },
    methods: {
        r(obj){
            this.$set(this.d, 'w_width', obj.width);
            this.$set(this.d, 'w_height', obj.height);
        },
        async t(){
            await this.$nextTick();
            let rect = this.$refs.target.getBoundingClientRect();
            this.$set(this.d, 't_width', rect.width);
            this.$set(this.d, 't_height', rect.height);
            this.$set(this.d, 't_left', rect.left);
            this.$set(this.d, 't_top', rect.top);
            this.$set(this.d, 't_bottom', rect.bottom);
        },
        getPosition(w){
            let top = 0;
            let left = 0;
            switch(w){
                case 'tl': {
                    left = this.d.t_left - this.d.w_width;
                    top = this._space_max.tl.h - this.d.w_height;
                }break;
                case 'tr': {
                    left = this.d.t_left + this.d.t_width;
                    top = this._space_max.tr.h - this.d.w_height;
                }break;
                case 'bl': {
                    left = this._space_max.bl.w - this.d.w_width;
                    top = this.d.t_top + this.d.t_height;
                }break;
                case 'br': {
                    left = this.d.t_left + this.d.t_width;
                    top = this.d.t_top + this.d.t_height;
                }
            }
            return {
                left,
                top
            }
        }
    },
    computed: {
        _space_max(){
            let right = this.d.v_width - this.d.t_left - this.d.t_width,
            left = this.d.t_left,
            top = this.d.t_top,
            bottom = this.d.v_height - this.d.t_top -this.d.t_height;
            return {
                tl: {
                    w: left,
                    h: top
                },
                tr: {
                    w: right,
                    h: top
                },
                bl: {
                    w: left,
                    h: bottom
                },
                br: {
                    w: right,
                    h: bottom
                }
            }
        },
        _ok_space(){
            return Object.keys(this._space_max).filter(v => {
                return this._space_max[v].w >= this.d.w_width
                && this._space_max[v].h >= this.d.w_height
            });
        },
        _one_space(){
            let res = ['tr', 'tl', 'bl', 'br'].filter(v => this._ok_space.includes(v)).shift();
            let top = 0;
            let left = 0;
            switch(res === undefined ? 'br' : res){
                case 'tl': {
                    left = this.d.t_left - this.d.w_width;
                    top = this._space_max.tl.h - this.d.w_height;
                }break;
                case 'tr': {
                    left = this.d.t_left + this.d.t_width;
                    top = this._space_max.tr.h - this.d.w_height;
                }break;
                case 'bl': {
                    left = this._space_max.bl.w - this.d.w_width;
                    top = this.d.t_top + this.d.t_height;
                }break;
                case 'br': {
                    left = this.d.t_left + this.d.t_width;
                    top = this.d.t_top + this.d.t_height;
                }
            }
            return {
                left,
                top
            }
        },
        _style(){
            return {
                window_wrapper: {
                    top: this._one_space.top + 'px',
                    left: this._one_space.left + 'px',
                }
            }
        },
        _half_left_w(){
            return this.d.t_left + this.d.t_width/2
        },
        _half_left_h(){
            return this.d.t_top + this.d.t_height/2
        }
    }
};
</script>


