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
const HttpResponse = require("./HttpResponse");

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
     * Singleton of Request
     * @return {Request|*}
     */
    static getInstance() {
        if (!this.#instance) return this.#instance = new Request();
        return this.#instance;
    }

    /**
     * @param {string} url
     * @param {object:{method,headers,body}} options
     * @return {Promise<{ok:boolean,json:function,text:function}>}
     */
    #request(url, options) {
        const {body} = options;
        if (body) delete options['body']
        options = {
            ...options,
            ...(body && {headers: {...options.headers, 'Content-Length': body.length}}),
            timeout: 30000,
        }
        return new Promise((resolve) => {
            const req = https.request(url, options, (res) => {
                if (!Request.isGood(res)) {
                    return resolve(Request.response({
                        message: res.statusMessage,
                        statusCode: res.statusCode,
                        method: options.method,
                        url
                    }, res));
                }
                const data = []
                res.on('data', (chunk) => data.push(chunk))
                res.on('end', () => {
                    resolve(Request.response(Buffer.concat(data).toString(), res))
                })
            })
            req.on('error', (err) => {
                resolve(Request.response(err, {statusCode: 500}))
            })
            req.on('timeout', () => {
                req.destroy()
                resolve(new Error('Request time out'))
            })
            if (body) req.write(body)
            req.end()
        })
    }

    /**
     * @param {{statusCode:number,status:number}|https.IncomingMessage} res
     * @return {boolean}
     */
    static isGood = (res) => {
        return HttpResponse.isGood(res)
    }

    /**
     * @param {string|object} v
     * @param {{statusCode:number,status:number}|https.IncomingMessage} res
     * @return {HttpResponse}
     */
    static response(v, res) {
        return HttpResponse.response(v, res)
    }
}

/**
 * @param {string} url
 * @param {object:{method,headers,body}} options
 * @return {Promise<{ok:boolean,json:function,text:function}>}
 */
module.exports = (url, options) => {
    const r = Request.getInstance()
    const m = [(options.method || 'get').toLowerCase()]
    return r[m](url, options)
};