import React, {ChangeEvent, Component, Fragment} from 'react';
import * as redux from 'react-redux';
import './index.less';
import {Permission} from '../../api';
import {md5, storage} from '../../utils';
import {Button, Input, Checkbox, message} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
// import cloudRender from '../../components/cloudRender'


const {connect} = redux;

interface Props {
    history: History
}

interface State {
    title: string,
    userId: string,
    password: string,
    autofill: boolean

}

interface LoginRes {
    companyId: number
}

interface LoginForm {
    data: {
        userName: string,
        password: string
    }
}


class Login extends Component {
    constructor(props: Props) {
        super(props);
    }

    state: State = {
        title: '智慧社区',
        userId: '',
        password: '',
        autofill: true
    };

    componentDidMount(): void {

    }

    inputUserId = (event: ChangeEvent<HTMLInputElement>) => {
        let userId = event.target.value;
        this.setState({
            userId: userId
        })
    };

    inputPassword = (event: ChangeEvent<HTMLInputElement>) => {
        let password = event.target.value;
        this.setState({
            password: password
        })
    };

    toggleAutoFill = (value: boolean) => {
        this.setState({
            autofill: value
        })
    };
    submitLogin = () => {
        const {userId, password} = this.state;
        //@ts-ignore
        const {history} = this.props;
        const requestData: LoginForm = {
            data: {
                userName: userId.trim(),
                password: md5(password)
            }
        };
        Permission.login(requestData).then((loginRes: { data: LoginRes }) => {
            storage.setSession('login', loginRes.data);
            history.replace('/loading')
        })
    };

    render() {
        return <Fragment>
            <div className="page-container login-bg flex-center">
                <div className="login-content flex-center-x">
                    <div className="login-content-title">{this.state.title}</div>
                    <div className="login-content-form flex-center-x">
                        <div className="login-content-form-item">
                            <Input placeholder="请输入用户名"
                                   maxLength={11}
                                   value={this.state.userId}
                                   onChange={this.inputUserId}
                                   autoComplete="new-password"
                                   prefix={<UserOutlined/>}/>
                        </div>
                        <div className="login-content-form-item">
                            <Input.Password placeholder="请输入密码"
                                            maxLength={18}
                                            value={this.state.password}
                                            onChange={this.inputPassword}
                                            autoComplete="new-password"
                                            prefix={<LockOutlined/>}/>
                        </div>
                        <div className="login-checkbox">
                            <Checkbox onChange={(e) => {
                                const value = e.target.value;
                                this.toggleAutoFill(value)
                            }}>记住密码</Checkbox>
                        </div>
                        <div className="login-content-form-item">
                            <Button type="primary"
                                    onClick={this.submitLogin}
                                    style={{width: '100%'}}>登 录</Button>
                        </div>
                    </div>
                </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Login);
