/*
 * =========================================================
 *  🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 GitLab API 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦
 * =========================================================
 * Copyright (c) 2023
 * @Author: Rosbitskyy Ruslan
 * @email: rosbitskyy@gmail.com
 * @license Licensed under the MIT License (MIT)
 */
const variables = require('./variables');
const GitLab = require("../src");
const {describe, it} = require("node:test");
const {strict: assert} = require("node:assert");
const AbstractProperties = require("../src/GitLab/AbstractProperties");
const Method = require("../src/GitLab/Method");

(async () => {

    const gitLab = new GitLab.API(new GitLab.Options({}));

    gitLab.add('groups').addMethods({
        groups: new Method({method: 'get', class: GitLab.Responses, url: () => `groups`})
    })
    gitLab.add('Releases').addMethods({
        releases: new Method({
            method: 'get',
            class: GitLab.Responses,
            url: () => `projects/${gitLab.projectId}/releases`
        })
    })


    for (let a of gitLab.getOwnPropertyNames()) {
        describe(a + ' API class', () => {
            it('instanceof AbstractProperties', () => assert.strictEqual(gitLab[a] instanceof GitLab.AbstractProperties, true))
            for (let k of Object.keys(gitLab[a].uri)) {
                it(a + '.' + k, () => assert.strictEqual(gitLab[a].uri[k] instanceof Method, true))
            }
        })
    }

    const jobs = new GitLab.Jobs(variables.jobs)
    const pipelines = new GitLab.Responses(variables.pipelines)


    describe('Jobs API class', () => {
        it('count 2', () => {
            assert.strictEqual(jobs.list.length, 2);
        })
        it('Jobs has own properties from AbstractList and AbstractProperties', () => {
            const props = new Set(jobs.getOwnPropertyOf(new GitLab.AbstractList())
                .concat(jobs.getOwnPropertyOf(new AbstractProperties())))
            const jp = jobs.getOwnPropertyOf(jobs)
            assert.strictEqual(props.size, jp.length);
        })
        it('Jobs - find and findOne', () => {
            assert.strictEqual(jobs.find({name: "teaspoon"}).id, jobs.findOne({name: "teaspoon"}).id);
        })
        it('Pipelines - find by source', () => {
            assert.strictEqual(pipelines.find({source: variables.pipeline.source}).project_id, variables.pipeline.project_id);
        })
    })


})();
