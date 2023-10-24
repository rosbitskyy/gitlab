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
    api

    #validMethods = ['get', 'post'];
    #methods = {
        //keys: {method: 'get', class: Object, url: (id) => `/keys/${id}`},
    };

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
            if (!this.#methods[k] && this.#validMethods.includes(v[k].method) && !!v[k].class && !!v[k].url && typeof v[k].url === 'function')
                this.#methods[k] = v[k];
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
                        let id = args.length > 0 ? args[0] : null;
                        let params = args.length > 1 ? args[1] : null;
                        let body = null;
                        const switchIt = (v) => {
                            params = v;
                            id = null;
                        }
                        if (id && id instanceof PaginateParams) switchIt(id);
                        else if (id && id.constructor === {}.constructor) switchIt(new PaginateParams(id));
                        else if (params && params.constructor === {}.constructor && spec.method === 'post') body = params;
                        else if (!params && !id && Class === Responses && spec.method === 'get') params = new PaginateParams({})
                        const url = this.apiUrl + (id ? spec.url(id) : spec.url()) + ((Class === Responses) ? params.toString() : '');
                        const _args = [url];
                        if (body) _args.push(body);
                        const response = await this.request[spec.method](..._args);
                        if (response.ok) return new Class(await response.json());
                        else {
                            const e = await response.json();
                            console.error('WARNING:', e.message)
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