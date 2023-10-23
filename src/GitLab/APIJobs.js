/*
 * =========================================================
 *  🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 GitLab API 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦
 * =========================================================
 * Copyright (c) 2019-2023
 * @Author: Rosbitskyy Ruslan
 * @email: rosbitskyy@gmail.com
 * @license Licensed under the MIT License (MIT)
 */

const GitLabError = require("./GitLabError");
const PaginateParams = require("./PaginateParams");
const APIRequest = require("./APIRequest");
const Jobs = require("./Jobs");
const Job = require("./Job");

class APIJobs {
    api

    uri = {
        //artifacts: {method: 'get', class: Object, url: (job_id) => `${this.baseUrl}/jobs/${job_id}/artifacts`},
        trace: {method: 'get', class: Object, url: (job_id) => `${this.baseUrl}/jobs/${job_id}/trace`},
        job: {method: 'get', class: Job, url: (job_id) => `${this.baseUrl}/jobs/${job_id}`},
        jobs: {method: 'get', class: Jobs, url: () => `${this.baseUrl}/jobs`},
        erase: {method: 'post', class: Job, url: (job_id) => `${this.baseUrl}/jobs/${job_id}/erase`},
        cancel: {method: 'post', class: Job, url: (job_id) => `${this.baseUrl}/jobs/${job_id}/cancel`},
        retry: {method: 'post', class: Job, url: (job_id) => `${this.baseUrl}/jobs/${job_id}/retry`},
        play: {method: 'post', class: Job, url: (job_id) => `${this.baseUrl}/jobs/${job_id}/play`},
        pipelines: {method: 'get', class: Jobs, url: (pipeline_id) => `${this.baseUrl}/pipelines/${pipeline_id}/jobs`},
        trigger: {method: 'get', class: Jobs, url: (pipeline_id) => `${this.baseUrl}/pipelines/${pipeline_id}/bridges`},
    };

    get baseUrl() {
        return this.api.options.apiUrl + `projects/${this.api.options.projectId}`;
    };

    /**
     * @type {APIRequest}
     */
    request;

    /**
     * @param {API} api
     */
    constructor(api) {
        this.api = api;
        this.request = new APIRequest(api);
        this.#makeSynonims()
        this.#makeSpecification()
    }

    #makeSynonims() {
        this.uri.log = this.uri.trace;
        this.uri.bridges = this.uri.trigger;
        this.uri.run = this.uri.play;
    }

    #makeSpecification() {
        for (let key of Object.keys(this.uri)) {
            const spec = this.uri[key];
            Object.defineProperty(this, key, {
                writable: false,
                /**
                 * @return {Promise<Object|Jobs|Job|null>}
                 * @param args - id|null, PaginateParams|null
                 */
                value: async (...args) => {
                    try {
                        const Class = spec.class || Object;
                        let id = args.length > 0 ? args[0] : null;
                        let params = args.length > 1 ? args[1] : null;
                        const switchIt = (v)=> {
                            params = v;
                            id = null;
                        }
                        if (id && id instanceof PaginateParams) switchIt(id);
                        else if (id && id.constructor === {}.constructor) switchIt(new PaginateParams(id));
                        else if (params && params.constructor === {}.constructor) params = new PaginateParams(params)
                        else if (!params && !id && Class === Jobs) params = new PaginateParams({})
                        const url = (id ? spec.url(id) : spec.url()) + ((Class === Jobs) ? params.toString() : '');
                        const response = await this.request[spec.method](url);
                        if (response.ok) return new Class(await response.json());
                    } catch (e) {
                        throw new GitLabError(this.api, e.message, e.stack)
                    }
                    return null;
                }
            })
        }
    }

}

module.exports = APIJobs