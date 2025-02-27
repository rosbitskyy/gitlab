/*
 * =========================================================
 *  🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 GitLab API 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦
 * =========================================================
 * Copyright (c) 2019-2023
 * @Author: Rosbitskyy Ruslan
 * @email: rosbitskyy@gmail.com
 * @license Licensed under the MIT License (MIT)
 */

/**
 * string prototypes
 */

(/**
 * Extends the String prototype by adding a `capitalize` method.
 *
 * The `capitalize` method transforms the first character of the string to uppercase
 * and retains the rest of the characters without any change.
 *
 * This extension is conditionally added to the String prototype only if it
 * does not already exist to avoid overwriting any existing implementation.
 */
    () => {
    "use strict";
    const _ = String.prototype;
    if (!Object.prototype.hasOwnProperty.call(_, 'capitalize')) {
        /**
         * Capitalizes the first character of the string and returns the modified string.
         *
         * @return {string} A new string with the first character converted to uppercase
         *                  and the rest of the string unchanged.
         */
        _.capitalize = function () {
            return this.charAt(0).toUpperCase() + this.slice(1);
        }
    }
})();