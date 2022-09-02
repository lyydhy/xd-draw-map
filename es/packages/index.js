import drawMapPoint from "./drawMapPoint.js";
const index = {
  install(vue) {
    vue.component("DrawMapPoint", drawMapPoint);
  }
};
export {
  index as default
};
