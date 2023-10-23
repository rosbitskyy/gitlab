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
const Job = require("./Job");
const AbstractList = require("./AbstractList");

class Jobs extends AbstractProperties {
    /**
     * @type {[AbstractList]}
     */
    #jobs = new AbstractList()

    /**
     * @param {[]|AbstractList|Jobs} jobs
     */
    constructor(jobs) {
        super();
        this.setProperties(new AbstractList(jobs), this.#jobs, false, Job)
    }

    /**
     * @param {object} filter
     * @return {Job}
     */
    find(filter) {
        return this.#jobs.findOne(filter)
    }

    get list() {
        return this.#jobs
    }
}

module.exports = Jobs