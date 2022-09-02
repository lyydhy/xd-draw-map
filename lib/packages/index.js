"use strict";
const drawMapPoint = require("./drawMapPoint.js");
const index = {
  install(vue) {
    vue.component("DrawMapPoint", drawMapPoint);
  }
};
module.exports = index;
