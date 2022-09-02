const path = require('path')
const { defineConfig, build } = require('vite')
const vue = require('@vitejs/plugin-vue')

// 添加打包入口文件夹 packages（需要手动创建）
const entryDir = path.resolve(__dirname, '../src/components')
// 添加出口文件夹 lib（不需要手动创建，会自动生成）
const outDir = path.resolve(__dirname, '../lib')

// vite 配置
const baseConfig = defineConfig({
  configFile: false,
  publicDir: false,
  plugins: [vue()]
})

// rollup 配置（vite 基于 rollup 打包）
const rollupOptions = {
  // 这两个库不需要打包
  external: ['vue', 'vue-router'],
  output: {
    globals: {
      vue: 'Vue'
    }
  }
}

//全量构建
const buildAll = async () => {
  await build(defineConfig({
    ...baseConfig,
    build: {
      rollupOptions,
      lib: {
        entry: path.resolve(entryDir, 'index.ts'),
        // 组件库名字
        name: 'draw-map',
        fileName: 'draw-map',
        // 输出格式
        formats: ['es', 'umd']
      },
      outDir
    }
  }))
}


const buildLib = async () => {
  await buildAll()
}

buildLib()
