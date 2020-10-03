<template>
    <div class="yw-fetch-wrap">
        <div class="loading-wrap">
            <div class="loader" v-show="loading"><div class="ball-grid-pulse"></div></div>
        </div>
        <slot class="yw-fetch-context"></slot>
    </div>
</template>

<script>
import "loaders.css"
export default {
    name: 'yszFetchWrap', 
    data(){
        return {
            loading:false
        };
    },
    props: {
        url: {
            type: String
        },
        handler: {
            type: Function,
            default(){return r => r}
        },
        errHandler: {
            type: Function,
            default(){return r => r}
        },
        page: {
            type: Number,
            default: 1
        },
        size: {
            type: Number,
            default: 10
        },
        pageKey: {
            type: String
        },
        pageSizeKey: {
            type: String,
            default: 'page_size'
        },
        engine: {
            // axios interface.
            type: [Function, Object],
            default(){return null}
        }
    },
    created(){
        this.fetch()
    },
    methods: {
        async fetch() {
            if(!this.engine) {console.log("fetch engine not found, fetch fail."); return}
            if(!this.url) {return false}
            this.loading = true
            try {
                let response = await this.engine.get(this.url, this.pageKey ? {params: {[this.pageKey]: this.page, [this.pageSizeKey]: this.size}} : {})
                this.handler(response)
            }catch(e){
                this.errHandler(e)
            }
            this.loading = false
        }
    }
}
</script>

<style lang="scss" scoped>
    .yw-fetch-wrap {position: relative;}
    .loading-wrap {top: 0; left: 0; right: 0; bottom: 0; position: absolute; text-align: center; z-index: 2; pointer-events: none}
    .yw-fetch-context {z-index: 1;}
</style>