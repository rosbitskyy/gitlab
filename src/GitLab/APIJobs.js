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
const AbstractProperties = require("./AbstractProperties");

class APIJobs extends AbstractProperties {
    api

    #methods = ['get', 'post'];
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
        super();
        this.api = api;
        this.request = new APIRequest(api);
        this.#makeSynonims()
        this.#makeSpecification()
    }

    /**
     * Add your own method that is not yet implemented by this api
     * @param {Object} v
     */
    addMethod(v) {
        if (!v || v.constructor !== {}.constructor) return;
        for (let k of Object.keys(v)) {
            if (!this.uri[k] && this.#methods.includes(v[k].method) && !!v[k].class && !!v[k].url && typeof v[k].url === 'function')
                this.uri[k] = v[k];
        }
        this.#makeSpecification()
    }

    #makeSynonims() {
        this.uri.log = this.uri.trace;
        this.uri.bridges = this.uri.trigger;
        this.uri.run = this.uri.play;
    }

    #makeSpecification() {
        const ownProperties = this.getOwnPropertyOf(this)
        for (let key of Object.keys(this.uri)) {
            if (ownProperties.includes(key)) continue
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
                        let body = null;
                        const switchIt = (v) => {
                            params = v;
                            id = null;
                        }
                        if (id && id instanceof PaginateParams) switchIt(id);
                        else if (id && id.constructor === {}.constructor) switchIt(new PaginateParams(id));
                        else if (params && params.constructor === {}.constructor && spec.method === 'post') body = params;
                        else if (!params && !id && Class === Jobs && spec.method === 'get') params = new PaginateParams({})
                        const url = (id ? spec.url(id) : spec.url()) + ((Class === Jobs) ? params.toString() : '');
                        const _args = [url];
                        if (body) _args.push(body);
                        const response = await this.request[spec.method](..._args);
                        if (response.ok) return new Class(await response.json());
                        else {
                            const e = await response.json();
                            console.error('WARNING:', e.message)
                        }
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