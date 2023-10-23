/*
 * =========================================================
 *  🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 GitLab API 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦
 * =========================================================
 * Copyright (c) 2019-2023
 * @Author: Rosbitskyy Ruslan
 * @email: rosbitskyy@gmail.com
 * @license Licensed under the MIT License (MIT)
 */


class AbstractKeyValue {
    /**
     * @type {string}
     */
    key;
    /**
     * @type {any}
     */
    value;

    /**
     * @param {string} key
     * @param {any} value
     */
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}

module.exports = AbstractKeyValue