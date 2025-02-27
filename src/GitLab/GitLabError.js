/*
 * =========================================================
 *  🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 GitLab API 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦
 * =========================================================
 * Copyright (c) 2019-2023
 * @Author: Rosbitskyy Ruslan
 * @email: rosbitskyy@gmail.com
 * @license Licensed under the MIT License (MIT)
 */


/**
 * Custom error class for handling errors related to GitLab operations.
 * Extends the native JavaScript Error class.
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

    /**
     * Analyzes the stack trace of an error to identify the relevant frames and line of execution
     * while filtering out frames related to specified modules or directories.
     *
     * @return {Object} An object containing:
     *   - `frame`: An array of stack frames that do not include references to the specified lookup modules or directories.
     *   - `line`: A string representing the specific stack trace line derived from filtered frames.
     */
    static debugger() {
        const lookup = ['process', 'modules', 'internal', 'GitLabAPI'];
        let e = new Error();
        const stack = e.stack.split("\n").slice(1).reverse();
        let frame = stack.filter(it => lookup.every(s => !it.includes('/' + s) && !it.includes(s + '/'))).slice(0);
        let line = stack[1].substring(frame.indexOf('/'));
        return {frame, line}
    }

    /**
     * Processes and extracts the second line of the stack trace,
     * trims unnecessary whitespace, and augments information
     * with debug frame data. Resets the stack property to null after processing.
     *
     * @return {void} No return value.
     */
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
