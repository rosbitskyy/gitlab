const AbstractProperties = require("./AbstractProperties");
const Serializer = require("./Serializer");

class HttpResponse extends AbstractProperties {
    ok = false;
    status = 500;
    json = () => ({})
    text = () => ''
    data = null;
    headers = {};

    constructor(obj) {
        super();
        if (obj.IncomingMessage) this.setProperties(obj.IncomingMessage, this, false)
        this.ok = obj.ok;
        this.status = obj.status;
        this.json = obj.json;
        this.text = obj.text;
        this.data = obj.data;
        this.headers = HttpResponse.getHeaders(obj.IncomingMessage)
        this.clear()
    }

    /**
     * @param {string|object} v
     * @param {{statusCode?:number,status?:number,rawHeaders?:string[]}|Object} res
     * @return {HttpResponse|Object}
     */
    static response(v, res) {
        const _is = !!v && v.constructor === ''.constructor
        return new HttpResponse({
            status: res.statusCode || res.status,
            ok: HttpResponse.isGood(res),
            json: () => _is ? JSON.parse(v) : v,
            text: () => _is ? v : JSON.stringify(v),
            data: v,
            IncomingMessage: res,
        })
    }

    /**
     * @param {{statusCode?:number,status?:number,rawHeaders?:string[]}|Object} res
     * @return {boolean}
     */
    static isGood = (res) => {
        const code = res.statusCode || res.status || 500;
        return code >= 200 && code <= 304;
    }

    static getHeaders(res) {
        if (res.headers) return res.headers;
        let rv = {}
        let rawHeaders = res.rawHeaders || (res.res || {}).rawHeaders;
        if (res && rawHeaders && rawHeaders instanceof Array) {
            for (let i = 0; i < rawHeaders.length; i += 2) {
                rv[rawHeaders[i]] = rawHeaders[i + 1];
            }
            rv = Serializer.normalize(rv)
        }
        return rv;
    }
}

module.exports = HttpResponse