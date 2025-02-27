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

/**
 * Validates the type of a given value and throws an error if it does not match the expected type.
 *
 * @param {*} value - The value to be checked for type validity.
 * @param {string} type - The expected type of the value as a string (e.g., "string", "number").
 * @param {string} errorMessage - The error message to be thrown if the type check fails.
 * @throws {Error} Throws an error with the provided errorMessage if the value's type does not match the specified type.
 */
const checkType = (value, type, errorMessage) => {
    if (typeof value !== type) {
        throw new Error(errorMessage);
    }
};

/**
 * Adds a method to the prototype of a given constructor if it does not already exist.
 *
 * @param {StringConstructor|DateConstructor|ArrayConstructor|ObjectConstructor} targetConstructor - The constructor function whose prototype is being extended.
 * @param {string} methodKey - The name of the method to be added to the prototype.
 * @param {Function} methodDefinition - The function definition of the method to be added.
 * @throws {TypeError} Throws an error if the `targetConstructor` is not a function.
 * @throws {TypeError} Throws an error if the `methodKey` is not a string.
 * @throws {TypeError} Throws an error if the `methodDefinition` is not a function.
 * @returns {boolean} Returns true if the method was successfully added, false if the method already exists.
 */
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