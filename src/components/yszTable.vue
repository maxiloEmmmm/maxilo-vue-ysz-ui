<script>
import utils from "../utils"
export default {
    name: 'yszTable',
    render(){
        const {$scopedSlots, $utils} = this
        return <div class="flex">
                <table class="border-collapse w-full" ref="loading">
                    {/* 表头 */}
                    <thead v-show={!this.isCard}>
                        {/* 表头渲染 */}
                        <tr class="active" style="cursor: pointer">
                            {/* 表头列渲染 */}
                            {this._show_ths.map((th, thIndex) => 
                                <th class="border border-gray-400" key={thIndex}
                                    vOn:click={e => !th.sort ? '' : this.toSort(th.field, this.sort[0] === th.field ? (this.sort[1] == 'desc' ? 'asc' : 'desc') : 'asc')}
                                    style={th._style} class={[th.sort ? 'mxl-table-th-sort' : '', this.sort[0] === th.field ? (this.sort[1] === 'asc' ? 'mxl-table-sort-asc' : 'mxl-table-sort-desc') : '']}>
                                    {th.thSlot || th.thRender 
                                        ? (th.thRender ? th.thRender(th).children : $scopedSlots[th.thSlot](th))
                                        : th.title }
                                </th>
                            )}
                        </tr>
                    </thead>
                    {/* 表 */}
                    <tbody class="mxl-table-tbody">
                        {/* 行渲染 */}
                        {this.viewer.map((view, viewIndex) => 
                            [<tr key={viewIndex + '_show_th'} vOn:click={e => {}}>
                                    {/* 列渲染 */}
                                    {this._show_ths.map((th, thIndex) => {
                                        if(th.tdSlot || th.tdRender) {
                                            if(th.tdRender) {
                                                let option = th.tdRender({th, view, viewIndex, thIndex})
                                                let rowSpan = this.utils.get(option, "attrs.row", 1)
                                                let colSpan = this.utils.get(option, "attrs.col", 1)
                                                return !rowSpan || !colSpan ? null : <td class="border border-gray-400" key={`${th.field}thIndex`} style={th._style} rowspan={rowSpan} colspan={colSpan}>
                                                    {option.children}
                                                </td>
                                            }else {
                                                return <td class="border border-gray-400" key={thIndex} style={th._style}>
                                                    {$scopedSlots[th.tdSlot]({th, view, viewIndex, thIndex})}
                                                </td>
                                            }
                                        }else {
                                            return <td class="border border-gray-400" key={thIndex} style={th._style}>
                                                {this.utils.get(view, th.field)}
                                            </td>
                                        }
                                    })}
                                </tr>,
                                /* 处理隐藏数据列 */
                                this._hasHideThs
                                    ? <tr v-show={this.hideTrShow[viewIndex]} key={viewIndex + '_hide_th'}>
                                        <td colspan={this._th_len}>
                                            {/* 自定义渲染 */}
                                            {this.tdHideSlot 
                                                ? $scopedSlots[tdHideSlot]({ths: this._hide_ths, view, viewIndex})
                                                /* 规规矩矩来 */
                                                : <dl class="dl-horizontal">
                                                    {this._hide_ths.map((th, thIndex) => 
                                                        /* 标题渲染 */
                                                        [
                                                            <dt key={thIndex + '_dt'}>
                                                                {th.thSlot || th.thRender
                                                                    ? (th.thRender ? th.thRender({th, view, viewIndex}).children : $scopedSlots[th.thSlot]({th, view, viewIndex}))
                                                                    : th.title }
                                                                {/* sort */}
                                                                {th.sort
                                                                    ? <template>
                                                                        <i class={['fa', 'fa-caret-up', 'hand', 'noActiveSort', {activeSort: this.sort[0] === th.field && this.sort[1] === 'asc'}]} aria-hidden="true" vOn:click={e => this.toSort(th.field, 'asc')}></i>
                                                                        <i class={['fa', 'fa-caret-down', 'hand', 'noActiveSort', {activeSort: this.sort[0] === th.field && this.sort[1] === 'desc'}]} aria-hidden="true" vOn:click={e => this.toSort(th.field, 'desc')}></i>
                                                                    </template>
                                                                    : null }
                                                            </dt>,
                                                            {/* 数据渲染 */},
                                                            <dd key={thIndex + '_dd'}>
                                                                {th.tdSlot || th.tdRender
                                                                    ? (th.tdRender ? th.tdRender({th, view, viewIndex}).children : $scopedSlots[th.tdSlot]({th, view, viewIndex}))
                                                                    : view[th.field] }
                                                            </dd>]
                                                    )}
                                                    <dd class="text-right"><button size="xs" vOn:click={e => this.toggleHide(viewIndex)}>收起</button></dd>
                                                </dl>}
                                        </td>
                                    </tr>
                                    : null
                            ]
                        )}
                    </tbody>
                    {/* 表脚 */}
                    <tfoot>
                        <tr>
                            <td colspan={this._th_len} class="text-center">
                                {!this._has_viewer
                                    ? <tw-alert title="暂无数据"></tw-alert>
                                    : ($scopedSlots.foot ? $scopedSlots.foot() : null)}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
    },
    data(){
        return {
            utils,
            /* 总数据数目 */
            dsTotal: 1,
            /* 隐藏数据显示控制 */
            hideTrShow: [],
            /* 卡片模式 */
            isCard: false,
            /* 排序字段及排序方法 */
            sort: [],
            /* 当前页 */
            currentPage: 1,
        };
    },
    computed: {
        /* 展示数据 */
        viewer(){
            return this.data;
        },
        _has_viewer(){
            return this.viewer.length !== 0;
        },
        /* 表头基础样式 */
        _th_style(){
            return {
                //background: '#fff'
            };
        },
        /* 工具列样式 */
        _th_tool_style(){
            return Object.assign({}, {
                width: this.toolColWidth
            }, this._th_style);
        },
        /* 最终表头 */
        _ths(){
            return this.ths.map(v => {
                let tmp = {
                    textAlign: v.align ? v.align : 'center',
                    position: 'relative'
                };
                if(v.width !== undefined) {
                    tmp.width = v.width;
                }
                /* 表头样式 */
                v._style = Object.assign({}, tmp, this._th_style);
                return v;
            });
        },
        /* 需隐藏列 */
        _hide_ths(){
            return this.isCard ? this._ths : this._ths.filter(v => v.hide);
        },
        /* 需显示列 */
        _show_ths(){
            return this.isCard ? [] : this._ths.filter(v => !v.hide);
        },
        /* 存在需隐藏的列 */
        _hasHideThs(){
            return this.isCard || this._hide_ths.length !== 0;
        },
        /* 是否添加帮助列: 复选 及 展开隐藏开关 */
        _needHelpTh(){
            return this._hasHideThs || this.useCheck;
        },
        /* 表头数 */
        _th_len(){
            return this._show_ths.length
        },
        /* 是否存在已展开 */
        _hasOpening(){
            return Object.keys(this.hideTrShow).filter(v => this.hideTrShow[v]).length !== 0;
        },
        _list_item_size(){
            return this.is_edit ? this.dsTotal : this.listItemSize
        },
        /* 根据显示条数计算页数 */
        _pageCount(){
            return this._list_item_size == 0 ? this.dsTotal : Math.ceil(this.dsTotal / this._list_item_size);
        }
    },
    props: {
        /* 表头 */
        ths: {
            default(){
                return [];
            }
        },
        /* 基础数据 */
        data: {
            default(){
                return [];
            }
        },
        /* 隐藏列自渲染槽名 */
        tdHideSlot: {
            default: ''
        },
        page: {},
        newRowBtnClass: {
            default: ''
        },
        tableClass: {
            default: ''
        },
        rowKey: {
            type: String
        }
    },
    async mounted () {
        window.addEventListener('resize', this.listenCard);
    },
    methods: {
        /* 排序刷新 */
        async toSort(field, order) {
            this.sort = [field, order];
            this.$emit("action-sort")
        },
        /* 用于async模块获取请求参数 */
        getParams(){
            return {
                orderField: this.sort[0],
                orderBy: this.sort[1],
                page: this.currentPage,
                start: (this.currentPage - 1) * this._list_item_size,
                limit: this._list_item_size
            };
        },
        /* 切换页 */
        async changePage(n){
            this.currentPage = n;
            this.$emit("action-page-change")
        },
        /* 表格自渲染 */
        fieldRender(slot, th, view, index, thIndex){
            return this.$scopedSlots[slot]({th, view, index, thIndex});
        },
        /* 反转隐藏数据列显示 */
        toggleHide(index){
            this.$set(this.hideTrShow, index, !this.hideTrShow[index]);
        },
        /* 监听卡片视图 */
        async listenCard(){
            await this.$nextTick();
            let len = document.body.clientWidth < 768;
            let tmp = {};
            this.viewer.forEach((v, k) => {
                tmp[k] = len;
            });
            this.hideTrShow = tmp;
            this.isCard = len;
        },
    }
};
</script>

<style lang="scss">
    .mxl-table-wrapper {
        & .__edit-area {
            display: flex;
            margin-bottom: 10px;
        }
    }
    .ant-popover {
        //fix: bootstrap modal.
        z-index:1050 !important;
    }
    /* 收起按钮 */
    .hideToggleBtn {
        text-align: right;
    }
    /* 小型分页 */
    .mxl-table-pagination-xs {
        padding: 3px 6px !important;
    }
    /* 手型 */
    .hand {
        cursor: pointer;
    }
    /* 没激活的排序 */
    .noActiveSort {
        color: #cecece;
    }

    .mxl-table-pagination-no-m {
        margin: 0;
    }

    .mxl-table-no-data-alert {
        margin-bottom: 0;
    }

    .mxl-table-tbody td {
        vertical-align: middle !important;
    }

    .mxl-table-th-sort:after, .mxl-table-th-sort:before {
        position: absolute;
        bottom: .9em;
        display: block;
        opacity: .3;
    }

    .mxl-table-th-sort:before {
        right: 1em;
        content: "\2191";
    }

    .mxl-table-th-sort:after {
        right: .5em;
        content: "\2193";
    }

    /* 激活的排序 */
    .mxl-table-sort-desc:after, .mxl-table-sort-asc:before{
        opacity: 1;
    }
</style>

