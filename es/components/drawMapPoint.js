import { defineComponent as y, toRefs as w, ref as d, onMounted as M, onBeforeUnmount as z, watch as D, h as f } from "vue";
import P, { flyTo as b } from "./utils.js";
import "../node_modules/@antv/l7-draw/dist/l7-draw.js";
import { l as p } from "../_virtual/l7-draw.js";
const C = y({
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
      default: !1
    },
    option: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["change"],
  setup(v, u) {
    let e = w(v), s = d(null), a, l = d([]), o;
    M(() => {
      P(s.value, {
        ...e.option.value,
        zoom: e.zoom.value,
        center: e.center.value
      }).then((n) => {
        a = n, a.addImage(
          "location",
          "http://img.xd.sidwit.com/picture-bed/map/location.png"
        ), e.point.value && e.point.value.length > 0 && b(a.map, e.point.value[0], 15), o = new p.exports.DrawPoint(a, {
          initialData: m(e.point.value),
          multiple: e.isMulti.value,
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
        }), o.enable(), o.on(p.exports.DrawEvent.Add, (r, t) => {
          let i = null;
          e.isMulti.value || (e.point.value && e.point.value.length > 0 && (i = m(e.point.value)[0]), t.length > 1 && (i = t[0]), i && o.removeFeature(i));
        }), o.on(p.exports.DrawEvent.Change, (r) => {
          let t = r;
          if (t && t.length > 0) {
            let i = [];
            t.map((h) => {
              let g = h.geometry.coordinates;
              i.push(g.join(","));
            }), l.value = i;
          } else
            l.value = [];
        });
      });
    });
    function m(n = []) {
      return !n || n.length === 0 ? null : n.map((r) => {
        let t = r.split(",");
        return {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Point",
            coordinates: [+t[0], +t[1]]
          }
        };
      });
    }
    function c() {
      return l.value;
    }
    return z(() => {
      a && a.destroy(), o && o.destroy();
    }), D(l, (n) => {
      u.emit("change", n);
    }), u.expose({
      getData: c
    }), () => f(
      "div",
      {
        style: "width:100%;height:100%;position:relative;"
      },
      [
        f(
          "div",
          {
            class: "mapContainer",
            ref: s,
            style: "width:100%;height:100%;"
          }
        )
      ]
    );
  }
});
export {
  C as default
};
