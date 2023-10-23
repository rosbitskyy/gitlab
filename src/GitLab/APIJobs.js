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
const JobVariablesAttributes = require("./JobVariablesAttributes");

class APIJobs {
    api

    uri = {
        trace: (job_id) => `${this.baseUrl}/jobs/${job_id}/trace`,
        job: (job_id) => `${this.baseUrl}/jobs/${job_id}`,
        jobs: () => `${this.baseUrl}/jobs`,
        erase: (job_id) => `${this.baseUrl}/jobs/${job_id}/erase`,
        cancel: (job_id) => `${this.baseUrl}/jobs/${job_id}/cancel`,
        retry: (job_id) => `${this.baseUrl}/jobs/${job_id}/retry`,
        play: (job_id) => `${this.baseUrl}/jobs/${job_id}/play`,
        pipelines: (pipeline_id) => `${this.baseUrl}/pipelines/${pipeline_id}/jobs`,
        trigger: (pipeline_id) => `${this.baseUrl}/pipelines/${pipeline_id}/bridges`,
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
    }

    /**
     * @param {string} job_id
     * @return {Promise<Object|null>}
     */
    async trace(job_id) {
        try {
            const response = await this.request.get(this.uri.trace(job_id));
            if (response.ok) return await response.json();
        } catch (e) {
            throw new GitLabError(this.api, e.message, e.stack)
        }
        return null;
    }

    async log(job_id) {
        return await this.trace(job_id)
    }

    /**
     * @param {string} job_id
     * @return {Promise<Object|null>}
     */
    async job(job_id) {
        try {
            const response = await this.request.get(this.uri.job(job_id));
            if (response.ok) return new Job(await response.json());
        } catch (e) {
            throw new GitLabError(this.api, e.message, e.stack)
        }
        return null;
    }

    /**
     * @param {PaginateParams} params
     * @return {Promise<Jobs|null>}
     */
    async jobs(params = new PaginateParams({})) {
        try {
            const response = await this.request.get(this.uri.jobs() + params.toString());
            if (response.ok) return new Jobs(await response.json());
        } catch (e) {
            throw new GitLabError(this.api, e.message, e.stack)
        }
        return null;
    }

    /**
     * @param {string} job_id
     * @return {Promise<Object|null>}
     */
    async erase(job_id) {
        try {
            const response = await this.request.post(this.uri.erase(job_id));
            if (response.ok) return new Job(await response.json());
        } catch (e) {
            throw new GitLabError(this.api, e.message, e.stack)
        }
        return null;
    }

    /**
     * @param {string} job_id
     * @return {Promise<Object|null>}
     */
    async cancel(job_id) {
        try {
            const response = await this.request.post(this.uri.cancel(job_id));
            if (response.ok) return new Job(await response.json());
        } catch (e) {
            throw new GitLabError(this.api, e.message, e.stack)
        }
        return null;
    }

    /**
     * @param {string} job_id
     * @return {Promise<Object|null>}
     */
    async retry(job_id) {
        try {
            const response = await this.request.post(this.uri.retry(job_id));
            if (response.ok) return new Job(await response.json());
        } catch (e) {
            throw new GitLabError(this.api, e.message, e.stack)
        }
        return null;
    }

    /**
     * @param {string} job_id
     * @param {JobVariablesAttributes} job_variables_attributes
     * @return {Promise<Object|null>}
     * @example: https://docs.gitlab.com/ee/api/jobs.html#run-a-job
     */
    async play(job_id, job_variables_attributes = new JobVariablesAttributes()) {
        try {
            const response = await this.request.post(this.uri.play(job_id), job_variables_attributes.toString());
            if (response.ok) return new Job(await response.json());
        } catch (e) {
            throw new GitLabError(this.api, e.message, e.stack)
        }
        return null;
    }

    /**
     * @param {string} pipeline_id
     * @param {PaginateParams} params
     * @return {Promise<*|null>}
     */
    async pipelines(pipeline_id, params = new PaginateParams({})) {
        try {
            const response = await this.request.get(this.uri.pipelines(pipeline_id) + params.toString());
            if (response.ok) return new Jobs(await response.json());
        } catch (e) {
            throw new GitLabError(this.api, e.message, e.stack)
        }
        return null;
    }

    /**
     * @param {string} pipeline_id
     * @param {PaginateParams} params
     * @return {Promise<*|null>}
     */
    async bridges(pipeline_id, params = new PaginateParams({})) {
        try {
            const response = await this.request.get(this.uri.trigger(pipeline_id) + params.toString());
            if (response.ok) return new Jobs(await response.json());
        } catch (e) {
            throw new GitLabError(this.api, e.message, e.stack)
        }
        return null;
    }

    async trigger(pipeline_id, params = new PaginateParams({})) {
        return await this.bridges(pipeline_id, params)
    }
}

module.exports = APIJobs