/*
 * =========================================================
 *  🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 GitLab API 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦
 * =========================================================
 * Copyright (c) 2023
 * @Author: Rosbitskyy Ruslan
 * @email: rosbitskyy@gmail.com
 * @license Licensed under the MIT License (MIT)
 */

const AbstractProperties = require("./AbstractProperties");

class Method extends AbstractProperties {
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
     * @param {object:{}} options
     */
    constructor(options) {
        super()
        this.setProperties(options, this)
    }
}

module.exports = Method