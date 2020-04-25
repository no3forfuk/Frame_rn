import React, {Component, Fragment} from 'react';
import './App.less'
import * as redux from 'react-redux';
import SOCKET from './socket';
import {LOGIN_SWITCH, LOADING_SWITCH, SOCKET_SWITCH} from './switch';
import {storage, timeFormat} from './utils'
import {socketConf} from "./env";
import routes from './router/routes'
import {
    Switch,
    Route
} from "react-router-dom";

const {connect} = redux;


interface Props {

}

interface State {

}

class App extends Component {

    private socket: any;

    constructor(props: Props) {
        super(props);

    }

    state: State = {}

    componentDidMount(): void {

        this.isLogin()
    }

    onSocketMessage = (message: {}) => {
        console.log(message);
    };

    isLogin = () => {
        let userId = storage.getSession('userId')
        // @ts-ignore
        const {history} = this.props;
        if (userId) {
            //开启socket
            this.startSocket()
        } else {
            if (LOGIN_SWITCH) {
                history.replace('/login')
            }
        }
    };

    startSocket = () => {
        if (!SOCKET_SWITCH) return;
        this.socket = new SOCKET({
            url: socketConf.url,
            onMessage: this.onSocketMessage
        });
        this.socket.start();
    };
    renderRouter = () => {
        const AppRouter = routes.find(item => item.path === '/');
        return <Switch>
            {
                AppRouter && AppRouter.routes.map((item, index) => {
                    return <Route path={item.path}
                        //@ts-ignore
                                  component={item.component}
                                  key={index}>
                    </Route>
                })
            }
        </Switch>
    }

    public render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return <Fragment>
            {
                this.renderRouter()
            }
        </Fragment>;
    }
}

const mapStateToProps = (store: {}) => {
    return store;
};
const mapDispatchToProps = (dispatch: void) => {
    return {
        dispatch
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
