import {storage} from "../utils";

window.countRequest = 0

interface FetchData {
    headers?: {},
    method: string,
    body?: {},
    url: string,
    isFormData?: boolean,
    userId?: string,
    pwd?: string
}

interface Response {
    code: number,
    data: any,
    msg: string
}

const _fetch = (data: FetchData) => {
    const userId = storage.getSession('userId') || data.userId;
    const token = storage.getSession('token');
    const pwd = storage.getSession('pwd') || data.pwd;
    if (!userId) {
        // storage.clearSession()
        window.location.hash = ''
        window.location.href = '/#/login'
        return
    }
    let baseHeaders = {
        'Content-Type': 'application/json; charset=utf-8',
        'appId': userId,
        'appKey': pwd,
        'iot-token': token,
    }
    const options: any = {
        headers: {
            'Content-Type': ''
        },
        method: 'get',
    }
    let {headers, method, body, url, isFormData} = data
    options.method = method
    options.headers = Object.assign(baseHeaders, headers)

    if (method.toLowerCase() === 'get') {

    } else {
        if (isFormData) {
            options.body = body
            delete options.headers['Content-Type']
        } else {
            options.body = JSON.stringify(body)
        }

    }
    return new Promise((resolve, reject) => {
        fetch(url, options).then(res => {
            let tk = res.headers.get('iot-token')
            if (tk) {
                storage.setSession('token', tk)
            }
            return res.json()
        }).then((res: Response) => {
            if (res.code === -10020) {
                window.countRequest = window.countRequest + 1
                if (window.countRequest > 4) {
                    return;
                } else {
                    //@ts-ignore
                    _fetch(data).then((res: Response) => {
                        if (res.code === 0) {
                            resolve(res)
                        } else {
                            reject(res)
                        }
                    })
                }
            } else if (res.code === 0) {
                window.countRequest = 0
                resolve(res)
            } else {
                window.countRequest = 0
                reject()
            }
        }).catch(err => {
            throw err
            reject()
        })
    })
}

export default _fetch
