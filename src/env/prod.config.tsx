import {storage} from "../utils";

function getSocketConf() {
    const uri = '/notification/v1.0.0/ws/';
    const {
        location: {
            host,
            protocol
        }
    } = window;
    const userId = storage.getSession('userId');
    return {
        url: `${protocol === 'http' ? 'ws://' : 'wss://'}${host}${uri}${userId}`
    }

}

const prod = {
    socketConf: getSocketConf(),
    cloudRender: {
        url: 'http://192.168.24.90:8889',
        guid: '5e8d23ae47b6f11b3441336b',
        username: 'guest',
        pwd: '123456'
    }
};
export default prod
