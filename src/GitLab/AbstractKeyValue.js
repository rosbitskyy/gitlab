/**
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
     * @type {object|string|number|null|Date}
     */
    value;

    /**
     * @param {string} k
     * @param {object|string|number|null|Date} v
     */
    constructor(k, v) {
        /* istanbul ignore next */
        this.key = k;
        /* istanbul ignore next */
        this.value = v;
    }

    /* istanbul ignore next */
    get() {
        return {[this.key]: this.value};
    }
}

module.exports = AbstractKeyValue;