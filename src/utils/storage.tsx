class Storage {

    setSession<T>(key: string, value: T): void {
        if (typeof value === 'string') {
            sessionStorage.setItem(key, value)
        } else {
            sessionStorage.setItem(key, JSON.stringify(value))
        }
    }

    getSession = (key: string): string | { [key: string]: any } | undefined => {
        let ret = sessionStorage.getItem(key)
        if (ret) {
            try {
                return JSON.parse(ret)
            } catch (e) {
                throw e
            }
        }
    }

    setLocal<T>(key: string, value: T): void {
        if (typeof value === 'string') {
            localStorage.setItem(key, value)
        } else {
            localStorage.setItem(key, JSON.stringify(value))
        }
    }

    getLocal = (key: string): string | { [key: string]: any } | undefined => {
        let ret = localStorage.getItem(key)
        if (ret) {
            try {
                return JSON.parse(ret)
            } catch (e) {
                throw e
            }
        }
    }

    clearSession(key?: string | undefined): void {
        if (key) {
            sessionStorage.removeItem(key)
        } else {
            sessionStorage.clear()
        }
    }

    clearLocal(key?: string | undefined): void {
        if (key) {
            localStorage.removeItem(key)
        } else {
            localStorage.clear()
        }
    }


}

export default Storage
