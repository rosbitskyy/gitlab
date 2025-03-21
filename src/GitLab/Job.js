/*
 * =========================================================
 *  🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 GitLab API 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦
 * =========================================================
 * Copyright (c) 2019-2023
 * @Author: Rosbitskyy Ruslan
 * @email: rosbitskyy@gmail.com
 * @license Licensed under the MIT License (MIT)
 */


const Response = require("./Response");

/**
 * Represents a job entity and its various statuses.
 * Extends the Response class and provides additional methods and properties
 * related to the state and lifecycle of a job.
 */
class Job extends Response {

    #statuses = {
        'success': '✅',
        'skipped': '⛷',
        'created': '⏳',
        'pending': '🛠',
        'running': '✈️',
        'failed': '❌',
        'canceled': '⚠️',
        'waiting_for_resource': '🔘',
        'manual': '⏳',
    }

    get statuses() {
        return Object.keys(this.#statuses)
    }

    /**
     * @param {Job|Object} props
     */
    constructor(props = {}) {
        super(props)
    }

    get isSuccess() {
        return this.status === 'success';
    }

    get isWaiting() {
        const waitStatuses = ['created', 'pending', 'running'];
        return waitStatuses.includes(this.status);
    }

    get isFailed() {
        return ['failed', 'canceled'].includes(this.status)
    }

    get message() {
        if (this.isFailed) return '⛔️Виправте помилки, збережіть зміни, та спробуйте ще раз';
        else if (this.isWaiting) return '🚨Чекайте завершення завдання';
        else return ''
    }

    get statusImage() {
        return this.#statuses[this.status];
    }
}

module.exports = Job;