/*
 * =========================================================
 *  🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 GitLab API 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦
 * =========================================================
 * Copyright (c) 2019-2023
 * @Author: Rosbitskyy Ruslan
 * @email: rosbitskyy@gmail.com
 * @license Licensed under the MIT License (MIT)
 */

const AbstractProperties = require("./AbstractProperties");
const Options = require("./Options");
const APICore = require("./APICore");
const GitLabError = require("./GitLabError");
const Job = require("./Job");
const Jobs = require("./Jobs");
const Method = require("./Method");

class API extends AbstractProperties {

    options = new Options({})
    get projectId() {return this.options.projectId;}

    /**
     * @param {Object|Options} options
     */
    constructor(options) {
        super();
        this.setProperties(options, this.options);
        this.debugger = GitLabError.debugger();
        this.#defautlSpecification();
    }

    /**
     * @param {PropertyKey} apiName
     */
    add(apiName) {
        apiName = this.capitalize(apiName);
        if (this.hasOwnProperty(apiName)) return;
        this[apiName] = new APICore(this);
        return this[apiName];
    }

    // construct Jobs API by default https://docs.gitlab.com/ee/api/jobs.html
    #defautlSpecification() {
        const api = this.add('Jobs');
        api.addMethods({
            log: new Method({method: 'get', class: Object, url: (job_id) => `projects/${this.projectId}/jobs/${job_id}/trace`}),
            trace: new Method({method: 'get', class: Object, url: (job_id) => `projects/${this.projectId}/jobs/${job_id}/trace`}),
            job: new Method({method: 'get', class: Job, url: (job_id) => `projects/${this.projectId}/jobs/${job_id}`}),
            jobs: new Method({method: 'get', class: Jobs, url: () => `projects/${this.projectId}/jobs`}),
            erase: new Method({method: 'post', class: Job, url: (job_id) => `projects/${this.projectId}/jobs/${job_id}/erase`}),
            cancel: new Method({method: 'post', class: Job, url: (job_id) => `projects/${this.projectId}/jobs/${job_id}/cancel`}),
            retry: new Method({method: 'post', class: Job, url: (job_id) => `projects/${this.projectId}/jobs/${job_id}/retry`}),
            play: new Method({method: 'post', class: Job, url: (job_id) => `projects/${this.projectId}/jobs/${job_id}/play`}),
            run: new Method({method: 'post', class: Job, url: (job_id) => `projects/${this.projectId}/jobs/${job_id}/play`}),
            pipelines: new Method({method: 'get', class: Jobs, url: (pipeline_id) => `projects/${this.projectId}/pipelines/${pipeline_id}/jobs`}),
            trigger: new Method({method: 'get', class: Jobs, url: (pipeline_id) => `projects/${this.projectId}/pipelines/${pipeline_id}/bridges`}),
            bridges: new Method({method: 'get', class: Jobs, url: (pipeline_id) => `projects/${this.projectId}/pipelines/${pipeline_id}/bridges`}),
        })
    }
}

module.exports = API