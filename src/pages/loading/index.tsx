import React, {Component, Fragment} from 'react';
import './index.less'

import * as redux from 'react-redux';

const {connect} = redux;

interface Props {

}

interface State {
    percent: number
}


class Loading extends Component {

    static getDerivedStateFromProps(nextProps: Props, prevState: State) {
        return null
    }

    constructor(props: Props) {
        super(props);

    }

    state: State = {
        percent: 0
    };
    totwoty: any = null
    tofivety: any = null
    toninety: any = null
    timeOutLazy: any = null

    componentDidMount(): void {
        this.init()
    }

    init = () => {
        let num = 0
        this.totwoty = setInterval(() => {
            if (num === 20) {
                clearInterval(this.totwoty)
            }
            num += 1
            this.setState({
                percent: num
            })
        }, 200)
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return <Fragment>
            <div className="page-container loading-page">
                <img src={require('../../static/images/loadinggif.gif')} style={{width: '100%', height: '100%'}}
                     alt=""/>
                <span className="loading-page-precess">{this.state.percent}%</span>
            </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Loading);
