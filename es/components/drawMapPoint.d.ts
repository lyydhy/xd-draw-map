import { PropType } from "vue-demi";
import { drawOptions } from "./utils.js";
declare const _default: import("vue-demi").DefineComponent<{
    center: {
        type: PropType<[number, number]>;
        default: () => never[];
    };
    zoom: {
        type: NumberConstructor;
        default: number;
    };
    point: {
        type: ArrayConstructor;
        default: () => never[];
    };
    isMulti: {
        type: BooleanConstructor;
        default: boolean;
    };
    option: {
        type: PropType<drawOptions>;
        default: () => {};
    };
}, () => import("vue-demi").VNode<import("vue-demi").RendererNode, import("vue-demi").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue-demi").ComponentOptionsMixin, import("vue-demi").ComponentOptionsMixin, "change"[], "change", import("vue-demi").VNodeProps & import("vue-demi").AllowedComponentProps & import("vue-demi").ComponentCustomProps, Readonly<import("vue-demi").ExtractPropTypes<{
    center: {
        type: PropType<[number, number]>;
        default: () => never[];
    };
    zoom: {
        type: NumberConstructor;
        default: number;
    };
    point: {
        type: ArrayConstructor;
        default: () => never[];
    };
    isMulti: {
        type: BooleanConstructor;
        default: boolean;
    };
    option: {
        type: PropType<drawOptions>;
        default: () => {};
    };
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
}, {
    center: [number, number];
    zoom: number;
    point: unknown[];
    isMulti: boolean;
    option: drawOptions;
}>;
export default _default;
