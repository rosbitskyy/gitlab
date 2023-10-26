/*
 * =========================================================
 *  🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 GitLab API 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦
 * =========================================================
 * Copyright (c) 2019-2023
 * @Author: Rosbitskyy Ruslan
 * @email: rosbitskyy@gmail.com
 * @license Licensed under the MIT License (MIT)
 */
const https = require('https')

class Request {

    /**
     * @type {Request}
     */
    static #instance = null;
    methods = ['get', 'head', 'delete', 'patch', 'post', 'put', 'options'];

    constructor() {
        for (let m of this.methods) this[m] = this.#request;
    }

    /**
     * Singletone of Request
     * @return {Request|*}
     */
    static getInstance() {
        if (!this.#instance) return this.#instance = new Request();
        return this.#instance;
    }

    /**
     * @param {string} url
     * @param {object} options
     * @return {Promise<unknown>}
     */
    #request(url, options) {
        const {body} = options;
        if (body) delete options['body']
        options = {
            ...options,
            ...(body && {headers: {...options.headers, 'Content-Length': body.length}}),
            timeout: 30000,
        }
        return new Promise((resolve, reject) => {
            const req = https.request(url, options, (res) => {
                if (res.statusCode < 200 || res.statusCode > 299) {
                    return reject(new Error(`HTTP status code ${res.statusCode}`))
                }
                const data = []
                res.on('data', (chunk) => data.push(chunk))
                res.on('end', () => {
                    resolve(this.#response(Buffer.concat(data).toString()))
                })
            })
            req.on('error', (err) => {
                resolve(this.#response(err))
            })
            req.on('timeout', () => {
                req.destroy()
                resolve(new Error('Request time out'))
            })
            if (body) req.write(body)
            req.end()
        })
    }

    #response(v) {
        const isString = !!v && v.constructor === ''.constructor
        return {
            ok: isString,
            json: () => {
                return isString ? JSON.parse(v) : v;
            },
            text: () => {
                return isString ? v : JSON.stringify(v);
            }
        }
    }
}

module.exports = (url, options) => {
    const r = Request.getInstance()
    const m = [(options.method || 'get').toLowerCase()]
    return r[m](url, options)
};