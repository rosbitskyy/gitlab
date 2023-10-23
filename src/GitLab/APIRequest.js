/*
 * =========================================================
 *  🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 GitLab API 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦
 * =========================================================
 * Copyright (c) 2019-2023
 * @Author: Rosbitskyy Ruslan
 * @email: rosbitskyy@gmail.com
 * @license Licensed under the MIT License (MIT)
 */

const fetch = require("node-fetch");

class APIRequest {

    /**
     * @param {API} api
     */
    constructor(api) {
        this.api = api;
    }

    /**
     * @param {string} url
     * @param {object:{}} body
     * @return {Promise<*|null>}
     */
    async post(url, body = null) {
        if (body && body.constructor !== ''.constructor) body = JSON.stringify(body);
        return await this.execute(url, {method: 'POST', ...(body && {body})});
    }

    /**
     * @param {string} url
     * @return {Promise<*|null>}
     */
    async get(url) {
        return await this.execute(url, {method: 'GET'});
    }

    /**
     * @param {string} url
     * @param {object} opts
     * @return {Promise<{ok}|*|null>}
     */
    async execute(url, opts = {}) {
        opts.headers = {...(opts.headers || {}), ...this.api.options.header.headers}
        return await fetch(url, opts);
    }

}

module.exports = APIRequest