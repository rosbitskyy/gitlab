/*
 * =========================================================
 *  🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 GitLab API 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦
 * =========================================================
 * Copyright (c) 2019-2023
 * @Author: Rosbitskyy Ruslan
 * @email: rosbitskyy@gmail.com
 * @license Licensed under the MIT License (MIT)
 */

const Responses = require("./Responses");
const Job = require("./Job");

/**
 * Represents a collection of Job instances. This class extends the Responses superclass and is used
 * for managing a list of job-related items.
 *
 * @class Jobs
 * @extends Responses
 */
class Jobs extends Responses {
    /**
     * @param {[]|AbstractList} v
     */
    constructor(v) {
        super(v, Job);
    }
}

module.exports = Jobs