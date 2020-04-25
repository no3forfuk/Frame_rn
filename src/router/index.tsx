import React, {Component} from 'react';
import routes from './routes'
import {
    HashRouter,
    Switch,
    Route
} from "react-router-dom";
import * as redux from 'react-redux';

const {connect} = redux;


interface Props {

}


class RouterConf extends Component {
    constructor(props: Props) {
        super(props);

    }

    componentDidMount(): void {

    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return <HashRouter>
            <Switch>
                {
                    routes.map((route, index) => {

                        return <Route path={route.path}
                            //@ts-ignore
                                      component={route.component}
                                      key={index}>
                        </Route>
                    })
                }
            </Switch>
        </HashRouter>;
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

export default connect(mapStateToProps, mapDispatchToProps)(RouterConf);
