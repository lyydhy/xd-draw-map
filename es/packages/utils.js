import "../node_modules/@antv/l7-source/es/index.js";
import "../node_modules/@antv/l7-core/es/inversify.config.js";
import "../node_modules/@antv/l7-core/es/services/renderer/passes/BasePostProcessingPass.js";
import "../node_modules/lodash/lodash.js";
import "../node_modules/@antv/l7-core/es/services/layer/ILayerService.js";
import "../node_modules/@antv/l7-core/es/services/layer/IStyleAttributeService.js";
import "../node_modules/@antv/l7-core/es/services/coordinate/ICoordinateSystemService.js";
import "../node_modules/@antv/l7-core/es/services/component/IControlService.js";
import "../node_modules/@antv/l7-core/es/services/interaction/IInteractionService.js";
import "../node_modules/@antv/l7-core/es/services/renderer/IMultiPassRenderer.js";
import "../node_modules/@antv/l7-core/es/services/renderer/gl.js";
import { Scene as a } from "../node_modules/@antv/l7-scene/es/index.js";
import p from "../node_modules/@antv/l7-maps/es/mapbox/index.js";
import "../node_modules/@antv/l7-layers/es/index.js";
import "../node_modules/@antv/l7-component/es/index.js";
import "../node_modules/@antv/l7-utils/es/dom.js";
import "../node_modules/@antv/l7-utils/es/mini-adapter/index.js";
import "../node_modules/@babel/runtime/regenerator/index.js";
import "../node_modules/@antv/l7-utils/es/anchor.js";
import "../node_modules/@antv/l7-utils/es/worker-helper/index.js";
import "../node_modules/@antv/l7-utils/es/tileset-manager/types.js";
import "../node_modules/@antv/l7-utils/es/tileset-manager/const.js";
import "../node_modules/eventemitter3/index.js";
import "../node_modules/earcut/src/earcut.js";
import "../node_modules/@antv/l7-utils/es/workers/extrude_polyline.js";
import "../node_modules/@antv/l7-utils/es/interface/map.js";
function W(e, t = {}) {
  let r = new a(
    {
      id: e,
      map: new p({
        style: m(t),
        zoom: t.zoom,
        center: t.center && t.center.length > 0 ? t.center : o.center,
        token: t.token || o.token
      })
    }
  );
  return new Promise((i, n) => {
    r.on("loaded", () => {
      i(r);
    });
  });
}
function Y(e, t = "", r) {
  let i = t.split(",");
  e.flyTo({
    center: [i[0], i[1]],
    zoom: r
  });
}
function m(e = {}) {
  return {
    version: 8,
    name: "tianditu-mapbox",
    bearing: 0,
    pitch: 0,
    sources: {
      "tianditu-raster": {
        type: "raster",
        tiles: e.tilesImg || o.tilesImg,
        tileSize: 256
      },
      "tianditu-mark": {
        type: "raster",
        tiles: e.tilesT || o.tilesT,
        tileSize: 256
      }
    },
    layers: [
      {
        id: "tianditu-raster",
        type: "raster",
        source: "tianditu-raster",
        layout: {},
        paint: {
          "raster-opacity": 1
        }
      },
      {
        id: "tianditu-mark",
        type: "raster",
        source: "tianditu-mark",
        layout: {},
        paint: {
          "raster-opacity": 1
        }
      }
    ]
  };
}
const o = {
  token: "pk.eyJ1Ijoic3VwZXJoeGoiLCJhIjoiY2tpOGEwYmRtMDNyODJ3cWxiN2Fmc3FheCJ9.tIBVrv-o8fKWdVz92Q5jqw",
  tilesImg: ["https://gac-geo.googlecnapps.cn/maps/vt?lyrs=s&x={x}&y={y}&z={z}"],
  tilesT: ["https://t1.tianditu.gov.cn/DataServer?T=cia_w&X={x}&Y={y}&L={z}&tk=abddf460b4e65fbeda6a67398e272672"],
  center: [106.54241, 29.568]
};
export {
  o as CONSTANT,
  W as default,
  Y as flyTo
};
