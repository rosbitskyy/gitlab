/*
 * =========================================================
 *  🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 GitLab API 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦
 * =========================================================
 * Copyright (c) 2019-2023
 * @Author: Rosbitskyy Ruslan
 * @email: rosbitskyy@gmail.com
 * @license Licensed under the MIT License (MIT)
 */
const Request = require('./Request')

class APIRequest {

    methods = ['get', 'head', 'delete', 'patch', 'post', 'put', 'options'];

    /**
     * @param {string} v
     * @return {boolean}
     */
    withBody = (v) => !!v && ![this.methods[0], this.methods[1]].includes(v.toLowerCase());

    /**
     * @param {API} api
     */
    constructor(api) {
        this.api = api;
        this.#makeSpecification();
        this.#validate();
    }

    #validate() {
        // const [major, minor, patch] = process.versions.node.split('.').map(Number)
        const [major] = process.versions.node.split('.').map(Number)
        if (!this.api.options.fetchMethod) {
            if (major >= 18) this.api.options.fetchMethod = global['fetch'];
            else this.api.options.fetchMethod = Request;
        }
    }

    #makeSpecification() {
        /**
         * @param {string} url
         * @param {object} opts
         * @return {Promise<{ok}|*|null>}
         */
        const execute = async (url, opts = {}) => {
            opts.headers = {...(opts.headers || {}), ...this.api.options.header.headers}
            return await this.api.options.fetchMethod(url, opts);
        }
        for (let v of this.methods) {
            if (!this.withBody(v))
                this[v] = async (url) => await execute(url, {method: v.toUpperCase()});
            else this[v] = async (url, body = null) => {
                if (body && body.constructor !== ''.constructor) body = JSON.stringify(body);
                return await execute(url, {method: v.toUpperCase(), ...(body && {body})});
            }
        }
    }
}

module.exports = APIRequest