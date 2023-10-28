/*
 * =========================================================
 *  🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 GitLab API 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦
 * =========================================================
 * Copyright (c) 2019-2023
 * @Author: Rosbitskyy Ruslan
 * @email: rosbitskyy@gmail.com
 * @license Licensed under the MIT License (MIT)
 */

const GitLabError = require("./GitLabError");
const PaginateParams = require("./PaginateParams");
const APIRequest = require("./APIRequest");
const AbstractProperties = require("./AbstractProperties");
const Responses = require("./Responses");

class APICore extends AbstractProperties {
    /**
     * @type {API}
     */
    api

    /**
     * @type {Object}
     */
    #methods = {};

    get methods() {
        return this.#methods
    }

    /**
     * @deprecated
     * @return {Object}
     */
    get uri() {
        return this.#methods
    }

    get apiUrl() {
        return this.api.options.apiUrl;
    };

    /**
     * @type {APIRequest}
     */
    request;

    /**
     * @param {API} api
     */
    constructor(api) {
        super();
        this.api = api;
        this.request = new APIRequest(api);
    }

    /**
     * Add your own method that is not yet implemented by this api
     * @param {Object} v
     */
    addMethods(v) {
        if (!v || v.constructor !== {}.constructor) return;
        for (let k of Object.keys(v)) {
            if (!this.#methods[k] && this.request.methods.includes(v[k].method.toLowerCase()) &&
                !!v[k].class && !!v[k].url && typeof v[k].url === 'function') this.#methods[k] = v[k];
        }
        this.#makeSpecification()
    }

    #makeSpecification() {
        const ownProperties = this.getOwnPropertyOf(this)
        for (let key of Object.keys(this.#methods)) {
            if (ownProperties.includes(key)) continue
            const spec = this.#methods[key];
            Object.defineProperty(this, key, {
                writable: false,
                /**
                 * @return {Promise<Object|Jobs|Job|null>}
                 * @param args - id|null, PaginateParams|null
                 */
                value: async (...args) => {
                    try {
                        const Class = spec.class || Object;
                        let _a = args.length > 0 ? args[0] : null;
                        let _p = args.length > 1 ? args[1] : null;
                        let body = null;
                        const switchIt = (v) => {
                            _p = v;
                            _a = null;
                        }
                        if (_a && _a instanceof PaginateParams) switchIt(_a);
                        else if (_a && _a.constructor === {}.constructor)
                            if (this.request.withBody(spec.method)) body = _a; else switchIt(new PaginateParams(_a));
                        else if (_p && _p.constructor === {}.constructor && this.request.withBody(spec.method)) body = _p;
                        else if (!_p && !_a && Class === Responses && !this.request.withBody(spec.method)) _p = new PaginateParams({})
                        const url = this.apiUrl + (_a ? spec.url(_a) : spec.url()) + ((Class === Responses) ? _p.toString() : '');
                        const _args = [url];
                        if (body) _args.push(body);
                        const response = await this.request[spec.method](..._args);
                        if (response.ok) return new Class(await response.json());
                        else {
                            const e = await response.json();
                            console.warn('WARNING:', JSON.stringify({...e, url}))
                            return e;
                        }
                    } catch (e) {
                        throw new GitLabError(this.api, e.message, e.stack)
                    }
                    return null;
                }
            })
        }
    }

}

module.exports = APICore