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
const Method = require("../src/GitLab/Method");

(async () => {

    const gitLab = new GitLab.API(new GitLab.Options({
        privateToken: process.env.GIT_TOKEN,
        projectId: process.env.GIT_PID,
    }));

    // https://docs.gitlab.com/ee/api/releases/
    gitLab.add('Issues').addMethods({
        issues: new Method({method: 'get', class: GitLab.Responses, url: () => `issues`})
    })
    console.log(gitLab.Issues.uri)

    const issues = await gitLab.Issues.issues(new GitLab.PaginateParams({page: 2, per_page: 20}));
    console.log(issues.list)

    describe('New dynamic Issues class', () => {
        it('Releases instanceof GitLab.API', () => {
            assert.strictEqual(issues instanceof GitLab.Responses, true);
        })
        it('Groups count', () => {
            assert.strictEqual(issues.list.length === 0, true);
        })
    })
})();