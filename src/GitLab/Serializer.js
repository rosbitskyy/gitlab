/*
 * =========================================================
 *  🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 GitLab API 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦
 * =========================================================
 * Copyright (c) 2019-2023
 * @Author: Rosbitskyy Ruslan
 * @email: rosbitskyy@gmail.com
 * @license Licensed under the MIT License (MIT)
 */

class Normaliser {

    static strBools = ['true', 'false'];

    constructor() {
    }

    /**
     * @param {object} d
     * @return {boolean}
     */
    static isDate(d) {
        if (!d || d.constructor !== ''.constructor) return false;
        const patterns = [/(\d{4})-(\d{2})-(\d{2}).*?/gm, /(\d{2})\.(\d{2})\.(\d{4}).*?/gm, /(\d{4})\/(\d{2})\/(\d{2}).*?/gm];
        for (let it of patterns) {
            let r = Array.from(d.matchAll(it));
            if (r && r.length === 1 && r[0].length === 4) return true;
        }
        return false;
    }

    /**
     * @param {object} object
     * @return {object}
     */
    static normalize(object) {
        for (let key of Object.keys(object)) {
            if (!object[key] || typeof object[key] === 'function') continue;
            if (typeof object[key] === 'object' && {}.constructor === object[key].constructor) object[key] = this.normalize(object[key])
            else if (typeof object[key] === 'object' && [].constructor === object[key].constructor)
                for (let i = 0; i < object[key].length; i++) object[key][i] = this.normalize(object[key][i]);
            else if (this.isDate(object[key]))
                object[key] = new Date(object[key]);
            else if (typeof object[key] === 'string' && this.strBools.includes(object[key].toLowerCase()))
                object[key] = object[key].toLowerCase() === this.strBools[0];
        }
        return object
    }
}

class BaseSerializer extends Normaliser {

    /**
     * @example:
     *    class MyClass {
     *         date = new Date();
     *         isNew = 'true';
     *         isDirty = 'false';
     *         time = new Date().getTime();
     *         name = 'Object class';
     *         number = 48;
     *         isBoolean = true;
     *     }
     *
     *     const myClass = new MyClass();
     *     const serialized = Serializer.serialize(myClass)
     *     const deserialized = Serializer.deserialize(serialized, MyClass)
     *     const normalized = Serializer.normalize(deserialized);
     */
    constructor() {
        super();
    }

    /**
     * @param {object} object
     * @param {function(key:string,value:object)} replacer
     * @param {number} space
     * @return {string}
     */
    static serialize(object, replacer = null, space = 0) {
        return JSON.stringify({...object, serialized: object.constructor.name}, replacer, space);
    }

    /**
     * @param {string|object} serializedJsonString
     * @param {Object} ClassType
     * @param {boolean} ownPropertyOnly
     * @return {object}
     */
    static deserialize(serializedJsonString, ClassType = null, ownPropertyOnly = true) {
        const json = typeof serializedJsonString === 'string' ? JSON.parse(serializedJsonString) : serializedJsonString;
        if (!ClassType && !json.serialized) throw new Error(' 🇺🇦 A ClassType argument (deserialize(serializedJsonString, ClassType) ' +
            'or {serialized: ClassName} parameter was expected in the serialized json object structure. ' +
            'Example: ' + JSON.stringify({...json, serialized: 'YourClass'}));
        let object = {};
        try {
            const Class = ClassType ? ClassType : eval(json.serialized);
            object = new Class();
        } catch (e) {
        }
        const copy = (s, t, k) => t[k] = s[k];
        for (let key of Object.keys(json))
            if ((ClassType && (object.hasOwnProperty(key) || !ownPropertyOnly)) ||
                (!ClassType && key !== 'serialized')) copy(json, object, key);
        /* istanbul ignore next */
        return this.normalize(object);
    }
}

class Serializer extends BaseSerializer {
    /**
     * @param {object|Class} type
     *
     *@example:
     *  let serializer = new Serializer(MyClass);
     *  const myClass = new MyClass();
     *  const serialized = serializer.serialize(myClass).value;
     *  const normalized = serializer.parse(serialized).value;
     */
    constructor(type) {
        super();
        this.type = type;
    }

    get class() {
        return this.type;
    }

    /**
     * @param {string|object} object
     * @return {Object}
     */
    parse(object) {
        return Serializer.deserialize(object, this.type);
    }

    /**
     * @param {object} object
     * @param {function(key:string,value:object)} replacer
     * @param {number} space
     * @return {string}
     */
    serialize(object, replacer = null, space = 0) {
        return Serializer.serialize(object, replacer, space);
    }
}

module.exports = Serializer;