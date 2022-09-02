import { Scene } from "@antv/l7";
import { IMapWrapper } from "@antv/l7-core";
export default function initMap(mapRef: any, option?: drawOptions): Promise<Scene>;
/**
 * 飞往到哪个地方
 * @param map
 * @param center
 * @param zoom
 */
export declare function flyTo(map: IMapWrapper, center: string | undefined, zoom: number): void;
export declare const CONSTANT: {
    token: string;
    tilesImg: string[];
    tilesT: string[];
    center: number[];
};
export interface drawOptions {
    tilesImg?: string[] | string;
    token?: string;
    tilesT?: string[] | string;
    zoom?: number;
    center?: [number, number];
}
