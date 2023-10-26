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

class Options extends AbstractProperties {
    apiUrl = 'https://gitlab.com/api/v4/';
    maxRetries = 5;
    privateToken = '';
    projectId = '';
    fetchMethod = fetch // node 18.x ++

    /**
     * @param {object:{}} options
     */
    constructor(options) {
        super()
        this.setProperties(options, this)
    }

    get header() {
        return {headers: {'Content-Type': 'application/json', 'PRIVATE-TOKEN': this.privateToken}}
    }
}

module.exports = Options;
