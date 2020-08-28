import React from "react"
import ReactDOM from "react-dom"
import store from "./store"
import * as serviceWorker from "./serviceWorker"
import * as redux from "react-redux"
import routes from "./router/routes"
import {renderRoutes} from "react-router-config"
import {HashRouter as Router} from "react-router-dom"
import {ConfigProvider} from "antd"
import "./static/css/base.less"
import zhCN from "antd/es/locale/zh_CN"
import moment from "moment"
import "moment/locale/zh-cn"
import "antd/dist/antd.css"
moment.locale("zh-cn")
const {Provider} = redux
ReactDOM.render(
    <ConfigProvider locale={zhCN}>
        <Provider store={store}>
            <Router>{renderRoutes(routes)}</Router>
        </Provider>
    </ConfigProvider>,
    document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
