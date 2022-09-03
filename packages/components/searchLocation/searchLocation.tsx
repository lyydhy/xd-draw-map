import {defineComponent, toRefs, h, Fragment} from 'vue-demi'
const React = { createElement: h, Fragment: Fragment }
import "./searchLocation.css"
export default defineComponent({
    name: 'searchLocation',
    emits: ['change'],
    setup(prop, ctx) {
        let props = toRefs(prop)

        return () => <div class="searchLocation">
            <input type="text" class="searchLocation-input" placeholder="请输入搜索关键字" />
            <div class="searchLocation-result" ></div>
        </div>
    }
})
