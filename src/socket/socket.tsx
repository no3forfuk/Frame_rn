
interface SocketProp {
    reconnectCount?: number,
    timeout?: number,
    readonly url: string,

    socketOpen(): void,

    socketError(e: any): void,

    socketMessage(msg: MessageEvent): void

    socketClose?(msg: string): void
}


class Socket {
    constructor(socketProp: SocketProp) {
        this.socketProp = socketProp
    };

    public instance: WebSocket | null = null;
    public taskRemindInterval: any = null;
    public isSucces: boolean = true;
    public reconnect: boolean = true;
    public socketProp: SocketProp = {
        url: '',
        socketOpen: () => null,
        socketError: () => null,
        socketMessage: () => null,
        socketClose: () => null,
    }
    public connection = () => {
        if ('WebSocket' in window) {
            const {url, timeout = 0} = this.socketProp;
            this.instance = new WebSocket(url);
            this.instance.onopen = this.onopen;
            this.instance.onmessage = this.onmessage;
            this.instance.onclose = this.onclose;
            this.instance.onerror = this.onerror;
            //@ts-ignore
            this.instance.sendMessage = this.sendMessage;
            if (timeout) {
                let time = setTimeout(() => {
                    if (this.instance && this.instance.readyState !== 1) {
                        this.instance.close();
                    }
                    clearTimeout(time);
                }, timeout);
            }
            return
        }
    }
    public onmessage = (msg: MessageEvent) => {
        let {socketMessage} = this.socketProp;
        socketMessage && socketMessage(msg);
    };
    public onopen = () => {
        let {socketOpen} = this.socketProp;
        this.isSucces = false  //连接成功将标识符改为false
        socketOpen && socketOpen();
    }
    public onerror = (e: any) => {
        let {socketError} = this.socketProp;
        this.instance = null;
        socketError && socketError(e);
    }
    public onclose = (e: any) => {
        this.isSucces = true   //关闭将标识符改为true
        let {socketClose} = this.socketProp;
        socketClose && socketClose(e);
        if (e && e.code == '4500') {
            this.instance && this.instance.close();
        } else {
            this.taskRemindInterval = setInterval(() => {
                clearInterval(this.taskRemindInterval);
                if (this.isSucces && this.reconnect) {
                    this.connection();
                }
            }, 10000)
        }
    };
    public sendMessage = (value: string) => {
        // 向后端发送数据
        if (this.instance) {
            this.instance.send(value);
        }
    };
}

export default Socket
