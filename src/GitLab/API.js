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

require('./Prototypes'); // 2025-02-27 - https://github.com/rosbitskyy/gitlab/issues/1#issue-2010858427

const AbstractProperties = require("./AbstractProperties");
const Options = require("./Options");
const APICore = require("./APICore");
const GitLabError = require("./GitLabError");
const Job = require("./Job");
const Jobs = require("./Jobs");
const Method = require("./Method");
const Response = require("./Response");
const Responses = require("./Responses");

/**
 * Class representing an API interface for interacting with GitLab resources.
 * Provides methods for various API operations including jobs, pipelines, and releases.
 * Extends `AbstractProperties` to handle properties and options setup.
 */
class API extends AbstractProperties {

    options = new Options({})

    /**
     * Retrieves the project ID from the options.
     *
     * @return {string} The project ID.
     */
    get projectId() {
        return this.options.projectId;
    }

    /**
     * Retrieves the names of own properties of the current object whose values are instances of APICore.
     *
     * @return {string[]} An array containing the names of the own properties of the object
     *                    that are instances of APICore.
     */
    getOwnPropertyNames() {
        return Object.getOwnPropertyNames(this).filter(it => this[it] instanceof APICore)
    }

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
     * Adds a new API core to the current object property if it does not already exist.
     *
     * @param {string} apiName - The name of the API to be added. If not provided, an empty string is used.
     * @return {APICore} Returns the newly created APICore instance or the existing one if already present.
     */
    add(apiName) {
        apiName = String(apiName || '').capitalize(); // 27-02-2025
        if (this.hasOwnProperty(apiName)) return this[apiName];
        this[apiName] = new APICore(this);
        return this[apiName];
    }

    // construct Jobs API by default https://docs.gitlab.com/ee/api/jobs.html
    /**
     * Configures default API specifications by adding various resource methods for Jobs, Pipelines, and Releases.
     *
     * @return {void} No return value. Sets up methods for interacting with API resources such as Jobs, Pipelines, and Releases.
     */
    #defautlSpecification() {

        this.add('Jobs').addMethods({
            log: new Method({
                method: 'get',
                class: Response,
                url: (job_id) => `projects/${this.projectId}/jobs/${job_id}/trace`
            }),
            trace: new Method({
                method: 'get',
                class: Response,
                url: (job_id) => `projects/${this.projectId}/jobs/${job_id}/trace`
            }),
            job: new Method({method: 'get', class: Job, url: (job_id) => `projects/${this.projectId}/jobs/${job_id}`}),
            jobs: new Method({method: 'get', class: Jobs, url: () => `projects/${this.projectId}/jobs`}),
            erase: new Method({
                method: 'post',
                class: Job,
                url: (job_id) => `projects/${this.projectId}/jobs/${job_id}/erase`
            }),
            cancel: new Method({
                method: 'post',
                class: Job,
                url: (job_id) => `projects/${this.projectId}/jobs/${job_id}/cancel`
            }),
            retry: new Method({
                method: 'post',
                class: Job,
                url: (job_id) => `projects/${this.projectId}/jobs/${job_id}/retry`
            }),
            play: new Method({
                method: 'post',
                class: Job,
                url: (job_id) => `projects/${this.projectId}/jobs/${job_id}/play`
            }),
            run: new Method({
                method: 'post',
                class: Job,
                url: (job_id) => `projects/${this.projectId}/jobs/${job_id}/play`
            }),
            pipelines: new Method({
                method: 'get',
                class: Jobs,
                url: (pipeline_id) => `projects/${this.projectId}/pipelines/${pipeline_id}/jobs`
            }),
            trigger: new Method({
                method: 'get',
                class: Jobs,
                url: (pipeline_id) => `projects/${this.projectId}/pipelines/${pipeline_id}/bridges`
            }),
            bridges: new Method({
                method: 'get',
                class: Jobs,
                url: (pipeline_id) => `projects/${this.projectId}/pipelines/${pipeline_id}/bridges`
            }),
        });

        // https://docs.gitlab.com/ee/api/pipelines.html#pipelines-pagination
        this.add('Pipelines').addMethods({
            pipelines: new Method({method: 'get', class: Responses, url: () => `projects/${this.projectId}/pipelines`}),
            pipeline: new Method({
                method: 'get',
                class: Response,
                url: (pipeline_id) => `projects/${this.projectId}/pipelines/${pipeline_id}`
            }),
            variables: new Method({
                method: 'get',
                class: Responses,
                url: (pipeline_id) => `projects/${this.projectId}/pipelines/${pipeline_id}/variables`
            }),
            test_report: new Method({
                method: 'get',
                class: Response,
                url: (pipeline_id) => `projects/${this.projectId}/pipelines/${pipeline_id}/test_report`
            }),
            test_report_summary: new Method({
                method: 'get',
                class: Response,
                url: (pipeline_id) => `projects/${this.projectId}/pipelines/${pipeline_id}/test_report_summary`
            }),
            latest: new Method({
                method: 'get',
                class: Response,
                url: () => `projects/${this.projectId}/pipelines/latest`
            }),
            create: new Method({
                method: 'post',
                class: Response,
                url: () => `projects/${this.projectId}/pipeline`
            }),
            retry: new Method({
                method: 'post',
                class: Response,
                url: (pipeline_id) => `projects/${this.projectId}/pipelines/${pipeline_id}/retry`
            }),
            cancel: new Method({
                method: 'post',
                class: Response,
                url: (pipeline_id) => `projects/${this.projectId}/pipelines/${pipeline_id}/cancel`
            }),
            delete: new Method({
                method: 'delete',
                class: Response,
                url: (pipeline_id) => `projects/${this.projectId}/pipelines/${pipeline_id}/cancel`
            }),
        });

        this.add('Releases').addMethods({
            releases: new Method({method: 'get', class: Responses, url: () => `projects/${this.projectId}/releases`})
        })
    }
}

module.exports = API