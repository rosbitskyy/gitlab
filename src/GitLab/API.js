/*
 * =========================================================
 *  🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 GitLab API 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦
 * =========================================================
 * Copyright (c) 2019-2023
 * @Author: Rosbitskyy Ruslan
 * @email: rosbitskyy@gmail.com
 * @license Licensed under the MIT License (MIT)
 */

const AbstractProperties = require("./AbstractProperties");
const Options = require("./Options");
const APIJobs = require("./APIJobs");
const GitLabError = require("./GitLabError");

class API extends AbstractProperties {

    options = new Options({})

    /**
     * @param {Object|Options} options
     */
    constructor(options) {
        super();
        this.setProperties(options, this.options);
        this.Jobs = new APIJobs(this);
        this.debugger = GitLabError.debugger();
    }
}

module.exports = API