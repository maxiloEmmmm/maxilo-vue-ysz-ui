const _default = "success"
import utils from "../../utils"
export default {
    props: {
        type: {type: String, default: _default},
    },
    computed: {
        _type() {return utils.arrayDefault(["success", "danger", "info"], this.type, _default)},
        _type_color() {
            return {
                success: "green",
                danger: "red",
                info: "blue",
            }[this._type]
        },
        _close_color(){return `text-${this._type == 'success' && this.head ? 'white' : this._type_color}`}
    }
}