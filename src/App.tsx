import React, {Component, Fragment} from "react"
import "./App.less"
import * as redux from "react-redux"
import SOCKET from "./socket"
import {LOGIN_SWITCH, SOCKET_SWITCH} from "./switch"
import {storage} from "./utils"
import {socketConf} from "./env"
import {renderRoutes} from "react-router-config"
const {connect} = redux

interface Props {
    history: any
    route: any
}

interface State {}

class App extends Component<Props, State> {
    private socket: any

    constructor(props: Props) {
        super(props)
        this.state = {}
    }

    componentDidMount(): void {
        this.isLogin()
    }

    onSocketMessage = (message: {}) => {
        console.log(message)
    }

    isLogin = () => {
        const userId = storage.getSession("userId")
        const {history} = this.props
        if (userId) {
            //开启socket
            // this.startSocket();
            // this.props.history.push('/home')
        } else {
            if (LOGIN_SWITCH) {
                history.replace("/login")
            }
        }
    }

    startSocket = () => {
        if (!SOCKET_SWITCH) return
        this.socket = new SOCKET({
            url: socketConf.url,
            onMessage: this.onSocketMessage
        })
        this.socket.start()
    }

    public render() {
        const {routes} = this.props.route
        return (
            <Fragment>
                <div className="qh-layout">{renderRoutes(routes)}</div>
            </Fragment>
        )
    }
}

const mapStateToProps = (store: {}) => {
    return store
}
const mapDispatchToProps = (dispatch: void) => {
    return {
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
