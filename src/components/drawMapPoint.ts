import {defineComponent, h,watch, onBeforeUnmount, onMounted, ref, toRefs,PropType} from "vue-demi";
import initMap, {drawOptions, flyTo} from "./utils.js";
import {DrawEvent, DrawPoint, PointDrawer,DeepPartial} from "@antv/l7-draw";
import {Scene, IMapWrapper} from '@antv/l7'
export default defineComponent({
    name: 'drawMapPoint',
    props: {
        // 中心点
        center: {
            type: Object as PropType<[number,number]>,
            default: () => []
        },
        // zoom
        zoom: {
            type: Number,
            default: 7
        },
        // 默认值
        point: {
            type: Array,
            default: () => []
        },
        // 是否可以多选
        isMulti: {
            type: Boolean,
            default: false,
        },
        // 配置
        option: {
            type: Object as PropType<drawOptions>,
            default: () => {
                return {}
            }
        }
    },
    emits: ['change'],
    setup(prop,ctx) {
        let props = toRefs(prop)
        let mapRef = ref(null)
        let scene:Scene
        let lngAndLat = ref([] as string[])
        let drawPoint:PointDrawer

        onMounted(() => {
            initMap(mapRef.value, {
                ...props.option.value,
                zoom: props.zoom.value,
                center: props.center.value
            }).then(v => {
                scene = v
                scene.addImage(
                    'location',
                    'http://img.xd.sidwit.com/picture-bed/map/location.png'
                )
                /**
                 * 有默认勾选的情况下 直接飞到第一个点的位置
                 */
                if (props.point.value && props.point.value.length > 0) {
                    flyTo((scene.map as IMapWrapper), (props.point.value[0] as string), 15)
                }
                // 添加绘制点的组件
                drawPoint = new DrawPoint((scene as Scene), {
                    // @ts-ignore
                    initialData: getFeaturesByPoint((props.point.value as string[])),
                    multiple: props.isMulti.value,
                    style: {
                        point: {
                            normal: {
                                shape: 'location',
                                size: 20
                            },
                            active: {
                                shape: 'location',
                                size: 20
                            },
                            hover: {
                                shape: 'location',
                                size: 20
                            }
                        }

                    },
                })
                drawPoint.enable()
                drawPoint.on(DrawEvent.Add, (e, es) => {
                    let point = null
                    if (!props.isMulti.value) {
                        if (props.point.value && props.point.value.length > 0) {
                            // @ts-ignore
                            point = getFeaturesByPoint(props.point.value)[0]
                        }
                        if (es.length > 1) {
                            point = es[0]
                        }
                        if (point) {
                            drawPoint.removeFeature(point)
                        }
                    }
                })
                drawPoint.on(DrawEvent.Change, (newData) => {
                    let point = newData
                    if (point && point.length > 0) {
                        let v:string[] = []
                        point.map((r:any) => {
                            let coordinates = r.geometry.coordinates
                            v.push(coordinates.join(","))
                        })
                        lngAndLat.value = v
                    } else {
                        lngAndLat.value = []
                    }
                })

            })
        })

        // 获取初始化数据
        function getFeaturesByPoint(value:string[] = []) {
            if (!value || value.length === 0) return null
            return value.map(r => {
                let v = r.split(',')
                return {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'Point',
                        coordinates: [+v[0], +v[1]]
                    }
                }
            })
        }

        // 获取数据
        function getData():string[] {
            return lngAndLat.value
        }

        /**
         * 销毁实例
         */
        onBeforeUnmount(() => {
            scene && scene.destroy()
            drawPoint && drawPoint.destroy()
        })

        // 监听值的变化 进行emit
        watch(lngAndLat, (val) => {
            ctx.emit('change',val)
        })
        // 把getData方法 透露出去
        ctx.expose({
            getData
        })

        return () => h(
            'div',
            {
                style: "width:100%;height:100%;position:relative;"
            },
            [
                h(
                    'div',
                    {
                        class: 'mapContainer',
                        ref: mapRef,
                        style: "width:100%;height:100%;"
                    }
                )
            ]
        )
    },

})
