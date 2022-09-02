import {RasterLayer, Scene} from "@antv/l7";
import {Mapbox, Map, GaodeMapV2} from '@antv/l7-maps'
import {IMapWrapper} from "@antv/l7-core";

export default function initMap(mapRef:any, option:drawOptions = {}): Promise<Scene> {
    let scene = new Scene(
        {
            id: mapRef,
            map: new Mapbox({
                style: mapStyle(option),
                zoom: option.zoom,
                // @ts-ignore
                center: option.center && option.center.length > 0 ? option.center : CONSTANT.center,
                token: (option.token || CONSTANT.token),
            })
        }
    )
    return new Promise((resolve, reject) => {
        scene.on('loaded', () => {
            resolve(scene)
        })
    })
}

/**
 * 飞往到哪个地方
 * @param map
 * @param center
 * @param zoom
 */
export function flyTo(map: IMapWrapper, center:string = '', zoom: number): void {
    let lnglat = center.split(',')
    // @ts-ignore
    map.flyTo({
        center: [lnglat[0], lnglat[1]],
        zoom: zoom
    })
}

/**
 * 添加地图style
 * @param option
 * @return {{sources: {"tianditu-mark": {tiles: ([string]|[string]), tileSize: number, type: string}, "tianditu-raster": {tiles: ([string]|[string]), tileSize: number, type: string}}, bearing: number, name: string, layers: [{layout: {}, paint: {"raster-opacity": number}, id: string, source: string, type: string},{layout: {}, paint: {"raster-opacity": number}, id: string, source: string, type: string}], pitch: number, version: number}}
 */
function mapStyle(option:drawOptions = {}): any {
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
            },
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
            },
        ]
    }
}


export const CONSTANT = {
    token: 'pk.eyJ1Ijoic3VwZXJoeGoiLCJhIjoiY2tpOGEwYmRtMDNyODJ3cWxiN2Fmc3FheCJ9.tIBVrv-o8fKWdVz92Q5jqw', // mapbox Token
    tilesImg: ['https://gac-geo.googlecnapps.cn/maps/vt?lyrs=s&x={x}&y={y}&z={z}'], // 瓦片底图地址
    tilesT: ['https://t1.tianditu.gov.cn/DataServer?T=cia_w&X={x}&Y={y}&L={z}&tk=abddf460b4e65fbeda6a67398e272672'], // 瓦片标注地址
    center: [106.54241, 29.568], // 中心点  默认重庆
}

export interface drawOptions {
    // 瓦片图片地址
    tilesImg?: string[] | string,
    // mapbox token
    token?: string
    // 瓦片标注地址
    tilesT?: string[] | string
    // 地图层级
    zoom?:number
    // 中心点
    center?:[number,number]

}
