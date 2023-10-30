/*
 * =========================================================
 *  🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 GitLab API 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦
 * =========================================================
 * Copyright (c) 2023
 * @Author: Rosbitskyy Ruslan
 * @email: rosbitskyy@gmail.com
 * @license Licensed under the MIT License (MIT)
 */
const GitLab = require("../src/");
const {describe, it} = require("node:test");
const {strict: assert} = require("node:assert");

(async () => {

    const gitLab = new GitLab.API(new GitLab.Options({
        privateToken: process.env.GIT_TOKEN,
        projectId: process.env.GIT_PID,
    }));
    console.log(gitLab.Jobs.methods)

    const jobs = await gitLab.Jobs.jobs(new GitLab.PaginateParams({page: 2, per_page: 20}));
    const erasedJobs = new GitLab.Jobs([])
    for (let job of jobs.list) {
        if (job.artifacts && job.artifacts.length) {
            const obj = await gitLab.Jobs.erase(job.id);
            if (obj) erasedJobs.push(obj)
        }
    }
    console.log('erased:', erasedJobs.list)

    describe('New Jobs class', () => {
        it('Jobs instanceof GitLab.Jobs', () => {
            assert.strictEqual(jobs instanceof GitLab.Jobs, true);
        })
        it('Jobs count', () => {
            assert.strictEqual(jobs.list.length > 1, true);
        })
        it('Jobs status is `success`', () => {
            assert.strictEqual(jobs.find({status: 'success'}).status, 'success');
        })
    })
})();