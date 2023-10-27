const https = require('https')

class HttpResponse {
    ok = false;
    code = 500;
    json = () => ({})
    text = () => ''
    data = null;

    constructor(obj) {
        this.ok = obj.ok;
        this.code = obj.code;
        this.json = obj.json;
        this.text = obj.text;
        this.data = obj.data;
        this.response = obj.response;
    }

    /**
     * @param {string|object} v
     * @param {{statusCode:number,code:number}|https.IncomingMessage} res
     * @return {{code: number, json: (function(): any), text: (function(): *|string), ok: boolean}}
     */
    static response(v, res) {
        const _is = !!v && v.constructor === ''.constructor
        return new HttpResponse({
            code: res.statusCode || res.code,
            ok: HttpResponse.isGood(res),
            json: () => {
                return _is ? JSON.parse(v) : v;
            },
            text: () => {
                return _is ? v : JSON.stringify(v);
            },
            data: v,
            response: res,
        })
    }

    /**
     * @param {{statusCode:number,code:number}|https.IncomingMessage} res
     * @return {boolean}
     */
    static isGood = (res) => {
        const code = res.statusCode || res.code || 500;
        return code >= 200 && code <= 304;
    }
}

module.exports = HttpResponse