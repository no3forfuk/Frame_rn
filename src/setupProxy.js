//@ts-ignore
const proxy = require('http-proxy-middleware');
const {createProxyMiddleware} = proxy;
const proxyConf = {
    target: 'http://127.0.0.1:9500',
    servers: ['permssion', 'device', 'notification', 'visualcomponent', 'searchImg', 'videopatrol', 'sentryboxinfo']
}
module.exports = function (app) {
    proxyConf.servers.map(item => {
        app.use(
            createProxyMiddleware(`/${item}/**`, {
                target: proxyConf.target,
                changeOrigin: true
            })
        );
    })
};
