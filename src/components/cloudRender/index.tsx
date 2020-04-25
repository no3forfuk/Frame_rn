import {cloudRenderConf} from '../../env'
import {SearchImg} from '../../api'
import {storage} from "../../utils";
import {message} from 'antd'

function startMeasureTool() {
    document.addEventListener('keydown', (e) => {
        if (e.keyCode === 18) {
            document.addEventListener("keyup", e => {
                if (e.keyCode === 81) {
                    let data = {
                        coord_type: '1',
                        cad_mapkey: 'WX_PLANE'
                    }
                    window.cloudRender.SuperAPI('newStartMeasureTool', data)
                }
            })
        }
    })
}

function endMeasureTool() {
    document.addEventListener('keydown', (e) => {
        if (e.keyCode === 18) {
            document.addEventListener("keyup", e => {
                if (e.keyCode === 87) {
                    window.cloudRender.SuperAPI('EndMeasureTool')
                }
            })
        }
    })
}

interface FormDate {
    [key: string]: any
}

function getkey(formDate: FormDate): string {
    var arr = []
    var str = ''
    for (const key in formDate) {
        arr.push(key + "=" + formDate[key])
    }
    str = arr.join('&')
    return str
}

interface ResProps {
    guid: string
    pwd: string
    url: string
    username: string
}

function getCloudUrl(url: string, guid: string, username: string, pwd: string) {
    fetch(`${url}/autoLogin`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        mode: "cors",
        body: getkey({username, pwd})
    }).then(res => res.json()).then(res => {

        if (res && res.token) {
            fetch(`${url}/Renderers/Any/${guid}`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${res.token}`
                },
            })
                .then(res => res.json())
                .then(res => {
                    if (res && res.error) {
                        message.error(res.error)
                    } else {
                        window.cloudRender = new window.cloudRenderer('player', 0);
                        window.cloudRender.SuperAPI('StartRenderCloud', res.url)
                        cloudRender = Object.assign(cloudRender, window.cloudRender)
                        window.cloudRender.SuperAPI_onStopedRenderCloud = () => {
                            message.error('云渲染关闭或通信息中断')
                        }
                        window.cloudRender.SuperAPI_onUnavailableRender = () => {
                            message.error('云渲染关闭或通信息中断')
                        };
                        startMeasureTool()
                        endMeasureTool()
                    }
                })
        } else {
            message.error('云渲染服务器连接失败')
        }
    })
}

const superApiList = ['GetFrustumArea',
    'NextModule',
    'GetCameraInfo',
    'AddPOI',
    'ShowPOI',
    'HidePOI',
    'UpdatePOIStyle',
    'UpdataPOITitleInfo',
    'RemovePOI',
    'RemoveAllPOI',
    'FocusPOI',
    'FocusAllPOI',
    'GetPOIScreenRange',
    'SetPOISelect',
    'AddPath',
    'ShowPath',
    'HidePath',
    'RemovePath',
    'RemoveAllPath',
    'FocusPath',
    'FocusAllPath',
    'AddHeatMap',
    'UpdateHeatMap',
    'ShowHeatMap',
    'HideHeatMap',
    'RemoveHeatMap',
    'RemoveAllHeatMap',
    'FocusHeatMap',
    'FocusAllHeatMap',
    'AddRoadHeatMap',
    'UpdateRoadHeatMap',
    'ShowRoadHeatMap',
    'HideRoadHeatMap',
    'RemoveRoadHeatMap',
    'RemoveAllRoadHeatMap',
    'FocusRoadHeatMap',
    'FocusAllRoadHeatMap',
    'AddMigrationMap',
    'ShowMigrationMap',
    'HideMigrationMap',
    'RemoveMigrationMap',
    'RemoveAllMigrationMap',
    'FocusMigrationMap',
    'FocusAllMigrationMap',
    'AddRange',
    'ShowRange',
    'HideRange',
    'RemoveRange',
    'RemoveAllRange',
    'FocusRange',
    'FocusAllRange',
    'AddCircularRange',
    'ShowCircularRange',
    'HideCircularRange',
    'RemoveCircularRange',
    'RemoveAllCircularRange',
    'FocusCircularRange',
    'FocusAllCircularRange',
    'AddEffect',
    'ShowEffect',
    'HideEffect',
    'RemoveEffect',
    'RemoveAllEffect',
    'FocusEffect',
    'FocusAllEffect',
    'SetEnvTime',
    'SetEnvWeather']

interface CloudRender {
    [key: string]: any
}

let cloudRender: CloudRender = {
    startRender: () => {
        const env = process.env.NODE_ENV
        if (env === 'development') {
            const {url, guid, username, pwd} = cloudRenderConf
            getCloudUrl(url, guid, username, pwd)
        } else {
            let loginInfo = storage.getSession('login');
            if (loginInfo && typeof loginInfo !== 'string') {
                const companyId = loginInfo.companyId
                SearchImg.getProperties({
                    path: [companyId, 'props']
                }).then((res: { data: ResProps }) => {
                    const {url, guid, username, pwd} = res.data
                    getCloudUrl(url, guid, username, pwd)
                })
            }
        }
    }
}

export default cloudRender

