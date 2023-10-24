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
    gitLab.add('Releases').addMethods({
        releases: new Method({method: 'get', class: GitLab.Responses, url: () => `projects/${gitLab.projectId}/releases`})
    })
    console.log(gitLab.Releases.uri)
    const releases = await gitLab.Releases.releases(new GitLab.PaginateParams({page: 1, per_page: 20}));
    console.log(releases.list)
    describe('New dynamic Releases class', () => {
        it('Releases instanceof GitLab.API', () => {
            assert.strictEqual(releases instanceof GitLab.Responses, true);
        })
        it('Groups count', () => {
            assert.strictEqual(releases.list.length > 0, true);
        })
    })

    gitLab.add('groups').addMethods({
        groups: new Method({method: 'get', class: GitLab.Responses, url: () => `groups`})
    })
    console.log(gitLab.Groups.uri)
    const groups = await gitLab.Groups.groups(new GitLab.PaginateParams({page: 1, per_page: 20}));
    describe('New dynamic Groups class', () => {
        it('Groups instanceof GitLab.API', () => {
            assert.strictEqual(groups instanceof GitLab.Responses, true);
        })
        it('Groups count', () => {
            assert.strictEqual(groups.list.length === 0, true);
        })
    })

    console.log(gitLab.Pipelines.uri)
    const pipelines = await gitLab.Pipelines.pipelines(new GitLab.PaginateParams({page: 1, per_page: 20,}));
    console.log(pipelines.list)
    describe('New dynamic Pipelines class', () => {
        it('Pipelines instanceof GitLab.API', () => {
            assert.strictEqual(pipelines instanceof GitLab.Responses, true);
        })
        it('Pipelines count 20', () => {
            assert.strictEqual(pipelines.list.length, 20);
        })
    })

    const pipelinelatest = await gitLab.Pipelines.latest();
    console.log(pipelinelatest)
    describe('New dynamic Pipelines class', () => {
        it('Pipeline instanceof GitLab.API', () => {
            assert.strictEqual(pipelinelatest instanceof GitLab.Response, true);
        })
    })

})();