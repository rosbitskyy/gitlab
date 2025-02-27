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

const defineObjectPrototype = (constructor, methodName, method) => {
    // Перевірка, чи є переданий параметр конструктором (функцією)
    if (typeof constructor !== 'function') {
        throw new Error('Provided object must be a constructor function.');
    }
    // Перевірка, чи передана назва методу є рядком
    if (typeof methodName !== 'string') {
        throw new Error('Cannot define method. Method name must be a string.');
    }
    // Перевірка, чи переданий метод є функцією
    if (typeof method !== 'function') {
        throw new Error('Cannot define method. Provided method is not a function.');
    }

    // Доступ до прототипу конструктора
    const prototype = constructor.prototype;

    // Перевірка, чи метод вже існує
    if (!prototype.hasOwnProperty(methodName)) {
        Object.defineProperty(prototype, methodName, {
            value: method,
            writable: false,
            configurable: true,
            enumerable: false, // метод не буде видно при ітерації через Object.keys
        });
        return true; // Успішне додавання
    } else {
        return false; // Метод вже існує
    }
};

defineObjectPrototype(String, 'capitalize', function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
});