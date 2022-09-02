import drawMapPoint from "./drawMapPoint.js";



export default {
  // @ts-ignore
  install(vue) {
    vue.component('DrawMapPoint', drawMapPoint)
  }

}
