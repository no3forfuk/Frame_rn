import permission from "./permission"
import searchImg from "./searchImg"
import _fetch from "./request"

interface Module {
    name: string

    [api: string]: any
}

interface ApiParam {
    path?: Array<string>
    query?: Object
    data?: Object
    headers?: Object
}

interface RequestParam {
    [api: string]: any
}

const moduleList: Array<Module> = [permission, searchImg]

interface LooseObject {
    [key: string]: any
}

const moduleListCopy: LooseObject = {}

const getApiUrl = (url: string, apiParam: ApiParam = {}) => {
    const {path, query} = apiParam
    let result = url
    if (path && path.length > 0) {
        result = url + path.join("/")
    }
    if (query && Object.keys(query).length > 0) {
        // eslint-disable-next-line prefer-const
        let arr = [],
            queryStr = ""
        for (const k in query) {
            if (k) {
                // @ts-ignore
                arr.push(`${k}=${query[k]}`)
            }
        }
        if (arr.length > 0) {
            queryStr = "?" + arr.join("&")
        }
        result = result + queryStr
    }
    return result
}
const createApiFoo = () => {
    moduleList.forEach((module: Module) => {
        moduleListCopy[module.name] = {}
        for (const k in module) {
            // eslint-disable-next-line no-empty
            if (k === "name") {
            } else {
                moduleListCopy[module.name][k] = (params: RequestParam = {}) => {
                    return _fetch({
                        url: getApiUrl(module[k].url, params),
                        method: module[k].method,
                        headers: module[k].headers || {},
                        body: {data: params.body},
                        userId: params.userId,
                        isFormData: module[k].formData || false
                    })
                }
            }
        }
    })
}
createApiFoo()
export const Permssion = moduleListCopy["permission"]
export const SearchImg = moduleListCopy["searchImg"]
