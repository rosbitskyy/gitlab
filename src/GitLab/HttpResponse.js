const https = require('https')
const AbstractProperties = require("./AbstractProperties");

class HttpResponse extends AbstractProperties {
    ok = false;
    status = 500;
    json = () => ({})
    text = () => ''
    data = null;

    constructor(obj) {
        super();
        if (obj.IncomingMessage) this.setProperties(obj.IncomingMessage, this, false)
        this.ok = obj.ok;
        this.status = obj.status;
        this.json = obj.json;
        this.text = obj.text;
        this.data = obj.data;
    }

    /**
     * @param {string|object} v
     * @param {{statusCode:number,status:number}|https.IncomingMessage} res
     * @return {HttpResponse|https.IncomingMessage}
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
     * @param {{statusCode:number,status:number}|https.IncomingMessage} res
     * @return {boolean}
     */
    static isGood = (res) => {
        const code = res.statusCode || res.status || 500;
        return code >= 200 && code <= 304;
    }
}

module.exports = HttpResponse