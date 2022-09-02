import drawMapPoint from "./drawMapPoint";


export default {
    // @ts-ignore
    install(vue) {
        vue.component('DrawMapPoint', drawMapPoint)
    }

}
