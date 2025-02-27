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

/** @typedef {import('../types/src/GitLab/API')} API*/

/** @typedef {import('../types/src/GitLab/Method')} Method*/
/** @typedef {import('../types/src/GitLab/MethodsObjects')} MethodsObjects*/

class APICore extends AbstractProperties {
    /**
     * @type {API}
     */
    api

    /**
     * @type {MethodsObjects}
     */
    #methods = {};

    /**
     * Retrieves the private methods associated with the instance.
     *
     * @return {Array|Object} The private methods stored in this.#methods.
     */
    get methods() {
        return this.#methods
    }

    /**
     * Retrieves the private property `#methods`.
     *
     * @return {any} The value stored in the private `#methods` property.
     */
    get uri() {
        return this.#methods
    }

    /**
     * Retrieves the API URL from the current configuration options.
     *
     * @return {string} The API URL as defined in the options.
     */
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
     * Adds methods to the internal methods collection if they meet specific criteria.
     *
     * @param {Object} v - An object containing method configurations to be added. Each property should define
     *                     a method with attributes such as 'method', 'class', and 'url'.
     *
     * @return {void} This method does not return a value.
     */
    addMethods(v) {
        if (!v || v.constructor !== {}.constructor) return;
        for (let k of Object.keys(v)) {
            if (!this.#methods[k] && this.request.methods.includes(v[k].method.toLowerCase()) &&
                !!v[k].class && !!v[k].url && typeof v[k].url === 'function') this.#methods[k] = v[k];
        }
        this.#makeSpecification()
    }

    /**
     * Dynamically defines methods on the current object based on specifications stored in the `#methods` property.
     * The methods are added as non-writable properties of the object and are executed through asynchronous calls.
     *
     * @return {void} This method does not return a value. Instead, it dynamically creates and attaches methods to the current object.
     */
    #makeSpecification() {
        const ownProperties = this.getOwnPropertyOf(this)
        const methodKeys = Object.keys(this.#methods);
        for (let key of methodKeys) {
            if (ownProperties.includes(key)) continue;
            /** @type Method */
            const spec = this.#methods[key];
            Object.defineProperty(this, key, {
                writable: false,
                /**
                 * @return {Promise<any>}
                 * @param {null|Array<any>} args - id|PaginateParams|null, (id,{body})
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
                        const _is = (e) => e.constructor === ''.constructor;
                        if (response.ok) {
                            const v = await this.#getResponse(response);
                            return _is(v) ? v : new Class(v);
                        } else {
                            const e = await this.#getResponse(response);
                            console.warn('WARNING:', ...(_is(e) ? [e, url] : [JSON.stringify({...e, url})]))
                            return e;
                        }
                    } catch (e) {
                        throw new GitLabError(this.api, e.message, e.stack)
                    }
                }
            })
        }
    }

    async #getResponse(response) {
        const _t = await response.text();
        try {
            return JSON.parse(_t);
        } catch (e) {
            return _t;
        }
    }

}

module.exports = APICore