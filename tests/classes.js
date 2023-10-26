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
const DynamicResponse = require("../src/GitLab/DynamicResponse");

(async () => {

    const gitLab = new GitLab.API(new GitLab.Options({}));

    const GroupClasses = DynamicResponse.class('groups')
    const ReleaseClasses = DynamicResponse.class('Releases')
    describe('Dynamic response classes', () => {
        it('Groups single response Class', () => assert.strictEqual(GroupClasses.Group.name, 'Group'))
        it('Groups list responses Class', () => assert.strictEqual(GroupClasses.Groups.name, 'Groups'))
        it('Releases single response Class', () => assert.strictEqual(ReleaseClasses.Release.name, 'Release'))
        it('Releases list responses Class', () => assert.strictEqual(ReleaseClasses.Releases.name, 'Releases'))
    })

    gitLab.add('groups').addMethods({
        groups: new Method({method: 'get', class: GroupClasses.Groups, url: () => `groups`})
    })
    gitLab.add('Releases').addMethods({
        releases: new Method({
            method: 'get',
            class: ReleaseClasses.Releases,
            url: () => `projects/${gitLab.projectId}/releases`
        })
    })


    for (let a of gitLab.getOwnPropertyNames()) {
        describe(a + ' API class', () => {
            it('instanceof AbstractProperties', () => assert.strictEqual(gitLab[a] instanceof GitLab.AbstractProperties, true))
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
