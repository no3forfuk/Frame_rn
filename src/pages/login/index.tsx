import React, {ChangeEvent, Component, Fragment} from "react"
import * as redux from "react-redux"
import "./index.less"
import {Permssion} from "../../api"
import {md5, storage} from "../../utils"
import {LockOutlined, UserOutlined} from "@ant-design/icons"
import {Button, Input, Checkbox, message} from "antd"

const {connect} = redux

interface Props {
    history: any
}

interface State {
    title: string
    userId: string
    password: string
    autofill: boolean
}

interface LoginRes {
    companyId: number
}

interface LoginForm {
    body: {
        userName: string
        password: string
    }
}

class Login extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            title: "智慧社区",
            userId: "",
            password: "",
            autofill: true
        }
    }

    componentDidMount(): void {
        this.init()
    }

    init = () => {
        const autofill = storage.getLocal("autofill")
        if (autofill) {
            const userId = storage.getLocal("userId")
            const password = storage.getLocal("password")
            // @ts-ignore
            this.setState({
                userId: userId,
                password: password,
                autofill: true
            })
        } else {
            this.setState({
                userId: "",
                password: "",
                autofill: false
            })
        }
    }

    inputUserId = (event: ChangeEvent<HTMLInputElement>) => {
        const userId = event.target.value
        this.setState({
            userId: userId
        })
    }

    inputPassword = (event: ChangeEvent<HTMLInputElement>) => {
        const password = event.target.value
        this.setState({
            password: password
        })
    }

    toggleAutoFill = (value: boolean) => {
        this.setState({
            autofill: value
        })
    }
    checkParams = (): boolean => {
        const {userId, password} = this.state
        if (!userId.toString().trim() || userId.toString().trim().length !== 11) {
            message.error("请输入正确的用户名")
            return false
        } else if (!password) {
            message.error("请输入密码")
            return false
        } else {
            return true
        }
    }

    submitLogin = () => {
        const {userId, password} = this.state
        const {history} = this.props
        const requestData: LoginForm = {
            body: {
                userName: userId.toString().trim(),
                password: md5(password)
            }
        }
        const flag = this.checkParams()
        if (!flag) {
            return
        }
        storage.setSession("userId", userId)
        storage.setSession("pwd", md5(password))
        Permssion.login(requestData)
            .then((loginRes: {data: LoginRes}) => {
                storage.setSession("login", loginRes.data)

                if (this.state.autofill) {
                    storage.setLocal("password", password)
                    storage.setLocal("userId", userId)
                    storage.setLocal("autofill", this.state.autofill)
                } else {
                    storage.clearLocal()
                }
                history.replace("/home")
            })
            .catch((err: {msg: string}) => {
                message.error(err.msg)
            })
    }

    render() {
        return (
            <Fragment>
                <div className="page-container login-bg flex-center">
                    <div className="login-content flex-center-x">
                        <div className="login-content-title">{this.state.title}</div>
                        <div className="login-content-form flex-center-x">
                            <div className="login-content-form-item">
                                <Input
                                    placeholder="请输入用户名"
                                    maxLength={11}
                                    value={this.state.userId}
                                    onChange={this.inputUserId}
                                    autoComplete="new-password"
                                    prefix={<UserOutlined />}
                                />
                            </div>
                            <div className="login-content-form-item">
                                <Input.Password
                                    placeholder="请输入密码"
                                    maxLength={18}
                                    value={this.state.password}
                                    onChange={this.inputPassword}
                                    autoComplete="new-password"
                                    prefix={<LockOutlined />}
                                />
                            </div>
                            <div className="login-checkbox">
                                <Checkbox
                                    checked={this.state.autofill}
                                    onChange={(e) => {
                                        const value = e.target.checked
                                        this.toggleAutoFill(value)
                                    }}
                                >
                                    记住密码
                                </Checkbox>
                            </div>
                            <div className="login-content-form-item">
                                <Button type="primary" onClick={this.submitLogin} style={{width: "100%"}}>
                                    登 录
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Login)
