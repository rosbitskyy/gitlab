/*
 * =========================================================
 *  🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 GitLab API 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦
 * =========================================================
 * Copyright (c) 2019-2023
 * @Author: Rosbitskyy Ruslan
 * @email: rosbitskyy@gmail.com
 * @license Licensed under the MIT License (MIT)
 */

class AbstractProperties {
    /**
     * @param {Object|Array} source
     * @param {Object|Array} target
     * @param {boolean|true} ownPropertyOnly
     * @param {null|Function|Job} Class
     */
    setProperties(source, target, ownPropertyOnly = true, Class = null) {
        if (Class && (source instanceof Array && target instanceof Array)) for (let v of source)
            target.push(new Class(v))
        else for (let key of Object.keys(source)) if (!ownPropertyOnly || target.hasOwnProperty(key)) target[key] = source[key];
    }

    formatDate = (d) => {
        const v = new Date(d);
        return v.toLocaleDateString('uk') + ' ' + v.toLocaleTimeString('uk')
    }
}

module.exports = AbstractProperties;