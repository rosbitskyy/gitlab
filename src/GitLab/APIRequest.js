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
const HttpResponse = require("./HttpResponse");

/** @typedef {import('../types/src/GitLab/API')} API*/

class RequestMethods {
}

/**
 * The `APIRequest` class provides structured methods for making HTTP requests to a given API,
 * leveraging various HTTP methods such as GET, POST, DELETE, etc.
 * It integrates with a specified API object and ensures compatibility across different environments for making requests.
 *
 * This class inherits from the `RequestMethods` base class and dynamically generates methods for supported HTTP request types.
 */
class APIRequest extends RequestMethods {

    methods = ['get', 'head', 'delete', 'patch', 'post', 'put', 'options'];

    /**
     * Determines whether a given parameter is valid and does not match
     * specific method names in a case-insensitive manner.
     *
     * @param {string} v - The parameter to be checked.
     * @returns {boolean} Returns `true` if the parameter is valid
     *                    and does not match any of the method names,
     *                    otherwise returns `false`.
     */
    withBody = (v) => !!v && ![this.methods[0], this.methods[1]].includes(v.toLowerCase());
    /**
     * @type {API}
     */
    api;

    /**
     * @param {API} api
     */
    constructor(api) {
        super()
        this.api = api;
        this.#makeSpecification();
        this.#validate();
    }

    /**
     * Validates the environment and assigns the appropriate fetch method
     * to the API options if not already set. The method checks the Node.js
     * version and sets the fetch method accordingly.
     *
     * @return {void} Does not return a value.
     */
    #validate() {
        // const [major, minor, patch] = process.versions.node.split('.').map(Number)
        const [major] = process.versions.node.split('.').map(Number)
        if (!this.api.options.fetchMethod) {
            if (major >= 18) this.api.options.fetchMethod = global['fetch'];
            else this.api.options.fetchMethod = Request;
        }
    }

    /**
     * Creates and initializes the API method specifications dynamically based on the available methods.
     * Binds HTTP methods (like GET, POST, etc.) to the instance and wraps them with an execution logic.
     *
     * @return {void}
     */
    #makeSpecification() {
        /**
         * @param {string} url
         * @param {object} opts
         * @return {Promise<{ok}|*|null>}
         */
        const execute = async (url, opts = {}) => {
            opts.headers = {...(opts.headers || {}), ...this.api.options.header.headers}
            return await this.#request(url, opts);
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

    /**
     * Sends a request to the specified URL with the provided options.
     *
     * @param {string} url - The URL to which the request is sent.
     * @param {Object} opts - The options for the request, such as headers and method.
     * @return {Promise<Object>} A promise that resolves to the response object.
     * The response can vary depending on the fetch library used (e.g., fetch, node-fetch, axios, or other libraries).
     */
    async #request(url, opts) {
        const res = await this.api.options.fetchMethod(url, opts);
        if (res && res.json) return res; // fetch, node-fetch
        if (res.statusText && !!res.data) return HttpResponse.response(res.data, res); // axios
        return res; // other
    }
}

module.exports = APIRequest