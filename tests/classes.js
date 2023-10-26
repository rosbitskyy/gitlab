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
const {describe, it} = require("node:test");
const {strict: assert} = require("node:assert");
const AbstractProperties = require("../src/GitLab/AbstractProperties");
const Response = require("../src/GitLab/Response");
const Responses = require("../src/GitLab/Responses");
const Method = require("../src/GitLab/Method");
const DynamicResponse = require("../src/GitLab/DynamicResponse");
const GitLab = require("../src");

(async () => {

    const gitLab = new GitLab.API(new GitLab.Options({}));


    const names = ['groups', 'Releases'];
    describe('Dynamic response classes', () => {
        for (let v of names) {
            v = v.capitalize()
            const _classes = DynamicResponse.class(v)
            it(v + ' single response Class', () => assert.strictEqual(_classes[DynamicResponse.getSingletonName(v)].name, DynamicResponse.getSingletonName(v)))
            it(v + ' instanceof GitLab.Response', () => assert.strictEqual(new _classes[DynamicResponse.getSingletonName(v)]({}) instanceof Response, true))
            it(v + ' list responses Class', () => assert.strictEqual(_classes[DynamicResponse.getSingletonName(v) + 's'].name, DynamicResponse.getSingletonName(v) + 's'))
            it(v + 's instanceof GitLab.Responses', () => assert.strictEqual(new _classes[DynamicResponse.getSingletonName(v) + 's']([], {}) instanceof Responses, true))
        }
    })


    const GroupClasses = DynamicResponse.class('groups')
    gitLab.add('groups').addMethods({
        groups: new Method({method: 'get', class: GroupClasses.Groups, url: () => `groups`})
    })
    const ReleaseClasses = DynamicResponse.class('Releases')
    gitLab.add('Releases').addMethods({
        releases: new Method({
            method: 'get',
            class: ReleaseClasses.Releases,
            url: () => `projects/${gitLab.projectId}/releases`
        })
    })


    for (let a of gitLab.getOwnPropertyNames()) {
        describe(a + ' API class', () => {
            it('instanceof AbstractProperties', () => assert.strictEqual(gitLab[a] instanceof AbstractProperties, true))
            for (let k of Object.keys(gitLab[a].methods)) {
                it(a + '.' + k, () => assert.strictEqual(gitLab[a].methods[k] instanceof Method, true))
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
