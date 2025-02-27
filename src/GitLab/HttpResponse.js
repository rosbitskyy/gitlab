const AbstractProperties = require("./AbstractProperties");
const Serializer = require("./Serializer");

/**
 * Represents an HTTP response object that encapsulates data and methods
 * for handling HTTP responses.
 * Extends the AbstractProperties class to inherit property management utilities.
 */
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
     * Constructs an HttpResponse instance based on the provided input value and response object.
     *
     * @param {any} v - The input value to be included in the HttpResponse. Can be a string, object, or other data type.
     * @param {Object} res - The response object, typically an IncomingMessage instance or similar, containing status and other metadata.
     * @return {HttpResponse} A new HttpResponse instance containing the processed data, status, and utility methods for interpreting the response.
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
     * Checks if the provided response indicates a successful or acceptable status code.
     *
     * Determines the success of the given response object by evaluating its HTTP
     * status code. The status code is extracted from the `statusCode` or `status`
     * property of the response object, defaulting to 500 if neither is provided.
     *
     * The function considers a response successful if the status code falls between
     * 200 and 304 (inclusive).
     *
     * @param {Object} res - The response object containing the status code information.
     * @returns {boolean} True if the status code represents success; otherwise, false.
     */
    static isGood = (res) => {
        const code = res.statusCode || res.status || 500;
        return code >= 200 && code <= 304;
    }

    /**
     * Extracts and returns headers from the given response object.
     *
     * @param {Object} res - The response object containing headers or raw headers.
     * @return {Object} The headers as a key-value pair object. If no headers are found, returns an empty object.
     */
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