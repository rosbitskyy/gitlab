/*
 * =========================================================
 *  🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 GitLab API 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦
 * =========================================================
 * Copyright (c) 2023
 * @Author: Rosbitskyy Ruslan
 * @email: rosbitskyy@gmail.com
 * @license Licensed under the MIT License (MIT)
 */

class Method {
    /**
     * @type {string}
     */
    method;
    /**
     * @type {Object}
     */
    class;
    /**
     * @type {Object|Function}
     */
    url;

    /**
     * @param {object:{}} props
     */
    constructor(props) {
        for (let key of Object.keys(props)) if (this.hasOwnProperty(key)) this[key] = props[key];
    }
}

module.exports = Method