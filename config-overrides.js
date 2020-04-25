const {override, addDecoratorsLegacy, useBabelRc, addLessLoader, addWebpackAlias} = require('customize-cra');
const path = require('path');
module.exports = override(addDecoratorsLegacy(), useBabelRc(), addLessLoader({
    javascriptEnabled: true,
    modifyVars: {'@primary-color': '#1DA57A'},
}), addWebpackAlias({
    "@src/": path.resolve(__dirname, 'src')
}))
