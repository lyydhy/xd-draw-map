"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
require("../node_modules/@antv/l7-source/es/index.js");
require("../node_modules/@antv/l7-core/es/inversify.config.js");
require("../node_modules/@antv/l7-core/es/services/renderer/passes/BasePostProcessingPass.js");
require("../node_modules/lodash/lodash.js");
require("../node_modules/@antv/l7-core/es/services/layer/ILayerService.js");
require("../node_modules/@antv/l7-core/es/services/layer/IStyleAttributeService.js");
require("../node_modules/@antv/l7-core/es/services/coordinate/ICoordinateSystemService.js");
require("../node_modules/@antv/l7-core/es/services/component/IControlService.js");
require("../node_modules/@antv/l7-core/es/services/interaction/IInteractionService.js");
require("../node_modules/@antv/l7-core/es/services/renderer/IMultiPassRenderer.js");
require("../node_modules/@antv/l7-core/es/services/renderer/gl.js");
const index = require("../node_modules/@antv/l7-scene/es/index.js");
const index$1 = require("../node_modules/@antv/l7-maps/es/mapbox/index.js");
require("../node_modules/@antv/l7-layers/es/index.js");
require("../node_modules/@antv/l7-component/es/index.js");
require("../node_modules/@antv/l7-utils/es/dom.js");
require("../node_modules/@antv/l7-utils/es/mini-adapter/index.js");
require("../node_modules/@babel/runtime/regenerator/index.js");
require("../node_modules/@antv/l7-utils/es/anchor.js");
require("../node_modules/@antv/l7-utils/es/worker-helper/index.js");
require("../node_modules/@antv/l7-utils/es/tileset-manager/types.js");
require("../node_modules/@antv/l7-utils/es/tileset-manager/const.js");
require("../node_modules/eventemitter3/index.js");
require("../node_modules/earcut/src/earcut.js");
require("../node_modules/@antv/l7-utils/es/workers/extrude_polyline.js");
require("../node_modules/@antv/l7-utils/es/interface/map.js");
function initMap(mapRef, option = {}) {
  let scene = new index.Scene(
    {
      id: mapRef,
      map: new index$1({
        style: mapStyle(option),
        zoom: option.zoom,
        center: option.center && option.center.length > 0 ? option.center : CONSTANT.center,
        token: option.token || CONSTANT.token
      })
    }
  );
  return new Promise((resolve, reject) => {
    scene.on("loaded", () => {
      resolve(scene);
    });
  });
}
function flyTo(map, center = "", zoom) {
  let lnglat = center.split(",");
  map.flyTo({
    center: [lnglat[0], lnglat[1]],
    zoom
  });
}
function mapStyle(option = {}) {
  return {
    "version": 8,
    "name": "tianditu-mapbox",
    "bearing": 0,
    "pitch": 0,
    "sources": {
      "tianditu-raster": {
        "type": "raster",
        "tiles": option.tilesImg || CONSTANT.tilesImg,
        "tileSize": 256
      },
      "tianditu-mark": {
        "type": "raster",
        "tiles": option.tilesT || CONSTANT.tilesT,
        "tileSize": 256
      }
    },
    "layers": [
      {
        "id": "tianditu-raster",
        "type": "raster",
        "source": "tianditu-raster",
        "layout": {},
        "paint": {
          "raster-opacity": 1
        }
      },
      {
        "id": "tianditu-mark",
        "type": "raster",
        "source": "tianditu-mark",
        "layout": {},
        "paint": {
          "raster-opacity": 1
        }
      }
    ]
  };
}
const CONSTANT = {
  token: "pk.eyJ1Ijoic3VwZXJoeGoiLCJhIjoiY2tpOGEwYmRtMDNyODJ3cWxiN2Fmc3FheCJ9.tIBVrv-o8fKWdVz92Q5jqw",
  tilesImg: ["https://gac-geo.googlecnapps.cn/maps/vt?lyrs=s&x={x}&y={y}&z={z}"],
  tilesT: ["https://t1.tianditu.gov.cn/DataServer?T=cia_w&X={x}&Y={y}&L={z}&tk=abddf460b4e65fbeda6a67398e272672"],
  center: [106.54241, 29.568]
};
exports.CONSTANT = CONSTANT;
exports.default = initMap;
exports.flyTo = flyTo;
