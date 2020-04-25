/// <reference types="react-scripts" />
declare module 'react-redux' {
    const content: any
    export = content
}

declare module 'react-transition-group' {
    const content: any
    export = content
}

interface CloudRender {
    [key: string]: any
}

interface Window {
    countRequest: number,
    cloudRender: CloudRender,
    cloudRenderer: any
}
