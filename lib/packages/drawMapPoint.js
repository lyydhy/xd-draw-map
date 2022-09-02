"use strict";
const vue = require("vue");
const utils = require("./utils.js");
require("../node_modules/@antv/l7-draw/dist/l7-draw.js");
const l7Draw = require("../_virtual/l7-draw.js");
const drawMapPoint = vue.defineComponent({
  name: "drawMapPoint",
  props: {
    center: {
      type: Object,
      default: () => []
    },
    zoom: {
      type: Number,
      default: 7
    },
    point: {
      type: Array,
      default: () => []
    },
    isMulti: {
      type: Boolean,
      default: false
    },
    option: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  emits: ["change"],
  setup(prop, ctx) {
    let props = vue.toRefs(prop);
    let mapRef = vue.ref(null);
    let scene;
    let lngAndLat = vue.ref([]);
    let drawPoint;
    vue.onMounted(() => {
      utils.default(mapRef.value, {
        ...props.option.value,
        zoom: props.zoom.value,
        center: props.center.value
      }).then((v) => {
        scene = v;
        scene.addImage(
          "location",
          "http://img.xd.sidwit.com/picture-bed/map/location.png"
        );
        if (props.point.value && props.point.value.length > 0) {
          utils.flyTo(scene.map, props.point.value[0], 15);
        }
        drawPoint = new l7Draw.l7Draw.exports.DrawPoint(scene, {
          initialData: getFeaturesByPoint(props.point.value),
          multiple: props.isMulti.value,
          style: {
            point: {
              normal: {
                shape: "location",
                size: 20
              },
              active: {
                shape: "location",
                size: 20
              },
              hover: {
                shape: "location",
                size: 20
              }
            }
          }
        });
        drawPoint.enable();
        drawPoint.on(l7Draw.l7Draw.exports.DrawEvent.Add, (e, es) => {
          let point = null;
          if (!props.isMulti.value) {
            if (props.point.value && props.point.value.length > 0) {
              point = getFeaturesByPoint(props.point.value)[0];
            }
            if (es.length > 1) {
              point = es[0];
            }
            if (point) {
              drawPoint.removeFeature(point);
            }
          }
        });
        drawPoint.on(l7Draw.l7Draw.exports.DrawEvent.Change, (newData) => {
          let point = newData;
          if (point && point.length > 0) {
            let v2 = [];
            point.map((r) => {
              let coordinates = r.geometry.coordinates;
              v2.push(coordinates.join(","));
            });
            lngAndLat.value = v2;
          } else {
            lngAndLat.value = [];
          }
        });
      });
    });
    function getFeaturesByPoint(value = []) {
      if (!value || value.length === 0)
        return null;
      return value.map((r) => {
        let v = r.split(",");
        return {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Point",
            coordinates: [+v[0], +v[1]]
          }
        };
      });
    }
    function getData() {
      return lngAndLat.value;
    }
    vue.onBeforeUnmount(() => {
      scene && scene.destroy();
      drawPoint && drawPoint.destroy();
    });
    vue.watch(lngAndLat, (val) => {
      ctx.emit("change", val);
    });
    ctx.expose({
      getData
    });
    return () => vue.h(
      "div",
      {
        style: "width:100%;height:100%;position:relative;"
      },
      [
        vue.h(
          "div",
          {
            class: "mapContainer",
            ref: mapRef,
            style: "width:100%;height:100%;"
          }
        )
      ]
    );
  }
});
module.exports = drawMapPoint;
