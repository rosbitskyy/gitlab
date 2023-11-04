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
const Method = require("../src/GitLab/Method");
require('dotenv').config();

(async () => {

    const [major, minor, patch] = process.versions.node.split('.').map(Number)
    console.log('node', major, minor, patch);

    let gitLab = new GitLab.API(new GitLab.Options({
        privateToken: process.env.GIT_TOKEN,
        projectId: process.env.GIT_PID,
        // auto config
        // fetchMethod: GitLab.Request // axios, fetch, node-fetch, etc...
    }));

    const apimethods = gitLab.getOwnPropertyNames();
    for (let am of apimethods) {
        const coremethods = gitLab[am].methods;
        await describe('Statement ' + am + ' of API', () => {
            for (let m of Object.keys(coremethods)) {
                it('method ' + m, () => {
                    assert.strictEqual(gitLab[am][m] instanceof Object, true);
                })
            }
        })
    }

    const releases = await gitLab.Releases.releases(new GitLab.PaginateParams({page: 1, per_page: 20}));
    await describe('New dynamic Releases class', () => {
        it('Releases instanceof GitLab.Responses', () => {
            assert.strictEqual(releases instanceof GitLab.Responses, true);
        })
        it('Releases count', () => {
            assert.strictEqual(releases.list.length > 0, true);
        })
    })

    gitLab.add('MyGroups').addMethods({
        getGroups: new Method({method: 'get', class: GitLab.Responses, url: () => `groups`})
    })
    const groups = await gitLab.MyGroups.getGroups(new GitLab.PaginateParams({page: 1, per_page: 20}));
    await describe('New dynamic MyGroups class', () => {
        it('MyGroups instanceof GitLab.Responses', () => {
            assert.strictEqual(groups instanceof GitLab.Responses, true);
        })
    })

    const pipelines = await gitLab.Pipelines.pipelines(new GitLab.PaginateParams({
        page: 1, per_page: 20, status: 'success', source: 'push',
    }));
    await describe('New dynamic Pipelines class', () => {
        it('Pipelines instanceof GitLab.Responses', () => {
            assert.strictEqual(pipelines instanceof GitLab.Responses, true);
        })
        it('success Pipelines count 20', () => {
            assert.strictEqual(pipelines.list.length, 20);
        })
    });

    const pipelinelatest = await gitLab.Pipelines.latest();
    await describe('New dynamic Pipelines class', () => {
        it('Pipeline instanceof GitLab.Response', () => {
            assert.strictEqual(pipelinelatest instanceof GitLab.Response, true);
        })
    })


})();