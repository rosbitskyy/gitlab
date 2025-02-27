/*
 * =========================================================
 *  🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 GitLab API 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦
 * =========================================================
 * Copyright (c) 2019-2023
 * @Author: Rosbitskyy Ruslan
 * @email: rosbitskyy@gmail.com
 * @license Licensed under the MIT License (MIT)
 */

"use strict";

const ERRORS = {
    INVALID_CONSTRUCTOR: 'Provided object must be a constructor function.',
    INVALID_METHOD_NAME: 'Cannot define method. Method name must be a string.',
    INVALID_METHOD: 'Cannot define method. Provided method is not a function.',
};

const checkType = (value, type, errorMessage) => {
    if (typeof value !== type) {
        throw new Error(errorMessage);
    }
};

const addMethodToPrototype = (targetConstructor, methodKey, methodDefinition) => {
    checkType(targetConstructor, 'function', ERRORS.INVALID_CONSTRUCTOR);
    checkType(methodKey, 'string', ERRORS.INVALID_METHOD_NAME);
    checkType(methodDefinition, 'function', ERRORS.INVALID_METHOD);

    const prototype = targetConstructor.prototype;

    if (!prototype.hasOwnProperty(methodKey)) {
        Object.defineProperty(prototype, methodKey, {
            value: methodDefinition,
            writable: false,
            configurable: true,
            enumerable: false,
        });
        return true;
    }
    return false;
};

addMethodToPrototype(String, 'capitalize', function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
});