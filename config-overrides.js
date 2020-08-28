const {
    override,
    addDecoratorsLegacy,
    useBabelRc,
    addLessLoader,
    addWebpackAlias,
    addWebpackPlugin
} = require("customize-cra")
const path = require("path")
const ProgressBarPlugin = require("progress-bar-webpack-plugin")
const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer")
// 查看打包后各包大小
const addAnalyzer = () => (config) => {
    if (process.env.ANALYZER) {
        config.plugins.push(new BundleAnalyzerPlugin())
    }
    return config
}
module.exports = override(
    addDecoratorsLegacy(),
    useBabelRc(),
    // 修改antd 主题 需 yarn add less less-loader -D 添加依赖包
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {"@primary-color": "#436DCC"}
    }),
    addAnalyzer(),
    addWebpackPlugin(
        // 终端进度条显示
        new ProgressBarPlugin()
    ),
    addWebpackAlias({
        "@src/": path.resolve(__dirname, "src")
    })
)
