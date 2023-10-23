/*
 * =========================================================
 *  🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 GitLab API 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦
 * =========================================================
 * Copyright (c) 2023
 * @Author: Rosbitskyy Ruslan
 * @email: rosbitskyy@gmail.com
 * @license Licensed under the MIT License (MIT)
 */
const GitLab = require("../");
const {describe, it} = require("node:test");
const {strict: assert} = require("node:assert");

(async () => {

    const gitLab = new GitLab.API(new GitLab.Options({
        privateToken: process.env.GIT_TOKEN,
        projectId: process.env.GIT_PID,
    }));
    console.log(gitLab.Jobs.uri)

    const jobs = await gitLab.Jobs.jobs(new GitLab.PaginateParams({page: 1, per_page: 1, scope: ['success']}));

    describe('New Jobs class', () => {
        it('Jobs instanceof GitLab.Jobs', () => {
            assert.strictEqual(jobs instanceof GitLab.Jobs, true);
        })
        it('Jobs count is 1', () => {
            assert.strictEqual(jobs.list.length, 1);
        })
        it('Jobs status is `success`', () => {
            assert.strictEqual(jobs.find({status: 'success'}).status, 'success');
        })
    })
})();