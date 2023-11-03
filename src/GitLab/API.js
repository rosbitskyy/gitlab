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
const Response = require("./Response");
const Responses = require("./Responses");

class API extends AbstractProperties {

    options = new Options({})

    getOwnPropertyNames() {
        return Object.getOwnPropertyNames(this).filter(it => this[it] instanceof APICore)
    }

    get projectId() {
        return this.options.projectId;
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
     * @param {PropertyKey} apiName
     * @return {APICore}
     */
    add(apiName) {
        apiName = apiName.capitalize();
        if (this.hasOwnProperty(apiName)) return this[apiName];
        this[apiName] = new APICore(this);
        return this[apiName];
    }

    // construct Jobs API by default https://docs.gitlab.com/ee/api/jobs.html
    #defautlSpecification() {

        this.add('Jobs').addMethods({
            log: new Method({
                method: 'get',
                class: Response,
                url: (job_id) => 'projects/' + this.projectId + '/jobs/' + job_id + '/trace'
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