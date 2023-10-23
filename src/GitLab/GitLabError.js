/*
 * =========================================================
 *  🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 GitLab API 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦
 * =========================================================
 * Copyright (c) 2019-2023
 * @Author: Rosbitskyy Ruslan
 * @email: rosbitskyy@gmail.com
 * @license Licensed under the MIT License (MIT)
 */


class GitLabError extends Error {
    #api

    /**
     * @param {API} api
     * @param {string} message
     * @param {string} stack
     */
    constructor(api, message, stack = null) {
        super(message);
        api.options.privateToken = '***'
        this.#api = api;
        this.stack = stack
        this.#stack()
    }

    static debugger() {
        const lookup = ['process', 'modules', 'internal', 'GitLabAPI'];
        let e = new Error();
        const stack = e.stack.split("\n").slice(1).reverse();
        let frame = stack.filter(it => lookup.every(s => !it.includes('/' + s) && !it.includes(s + '/'))).slice(0);
        let line = stack[1].substring(frame.indexOf('/'));
        return {frame, line}
    }

    #stack() {
        try {
            const name = (this.stack ? this.stack.split("\n")[1] : '').trim();
            this.stack = null; //🇺🇦нам ніфіга це не цікаво
            this.info = ([name].concat(this.#api.debugger.frame))
        } catch (e) {
        }
    }
}

module.exports = GitLabError;
