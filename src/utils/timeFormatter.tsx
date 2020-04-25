const formatOptions = {
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
}

class timeFormat {
    getNow = (joinSymbol?: string): string => {
        if (joinSymbol) {
            let time = new Date().toLocaleString('chinese', formatOptions)
            return time.replace(/\//g, joinSymbol)
        } else {
            let time = new Date().toLocaleString('chinese', formatOptions)
            return time.replace(/\//g, '-')
        }
    }
    getTodayStart = (joinSymbol?: string | undefined): string => {
        if (joinSymbol) {
            let time = new Date().toLocaleString('chinese', formatOptions)
            time = time.split(' ')[0]
            return time.replace(/\//g, joinSymbol) + ' 00:00:00'
        } else {
            let time = new Date().toLocaleString('chinese', formatOptions)
            time = time.split(' ')[0].replace(/\//g, '-')
            return time + ' 00:00:00'
        }
    }

    getFormat = (ms: number, joinSymbol?: string) => {
        if (joinSymbol) {
            let time = new Date(ms).toLocaleString('chinese', formatOptions)
            return time.replace(/\//g, joinSymbol)
        } else {
            let time = new Date(ms).toLocaleString('chinese', formatOptions)
            return time.replace(/\//g, '-')
        }
    }

    getMs = (date: string): number => {
        let time = new Date(date).getTime()
        return time
    }
}

export default timeFormat
