# Integration with GitLab REST API

[![os, nodes](https://github.com/rosbitskyy/gitlab/actions/workflows/push-main.yml/badge.svg)](https://github.com/rosbitskyy/gitlab/actions)
[![npm version](https://img.shields.io/npm/v/gitlab-restapi.svg)](https://www.npmjs.com/package/gitlab-restapi)
[![Downloads/month](https://img.shields.io/npm/dm/gitlab-restapi.svg)](http://www.npmtrends.com/gitlab-restapi)

The module allows you to perform the list of methods described in the GitLab service documentation in the section
[Jobs](https://docs.gitlab.com/ee/api/jobs.html) , [Pipelines](https://docs.gitlab.com/ee/api/pipelines.html#list-project-pipelines) (
for now)

**And you can Add your own method that is not yet implemented by this api**

- List project jobs
- List pipeline jobs
- List pipeline trigger jobs
- Get job token’s job
- Get GitLab agent by CI_JOB_TOKEN
- Get a single job
- Get a log file
- Cancel a job
- Retry a job
- Erase a job
- Run a job
- List project pipelines
- Get a single pipeline
- Get variables of a pipeline
- Get a pipeline’s test report
- Get a pipeline’s test report summary
- Get the latest pipeline
- Create a new pipeline
- Retry jobs in a pipeline
- Cancel a pipeline’s jobs
- Delete a pipeline

[read more](https://docs.gitlab.com/ee/api/jobs.html#run-a-job:~:text=On%20this%20page-,List%20project%20jobs,Run%20a%20job)

And yes, let's start!

☕️ [buy me a coffee](https://www.buymeacoffee.com/rosbitskyy.ruslan)

### Installation

First install [Node.js](https://nodejs.org/uk)

```shell
npm i gitlab-restapi
```

### An example of receiving a list of tasks divided into pages with the specified status

```javascript
const GitLab = require("gitlab-restapi");
const gitLab = new GitLab.API(new GitLab.Options({
    privateToken: process.env.GIT_TOKEN,
    projectId: process.env.GIT_PID,
}));

const jobs = await gitLab.Jobs.jobs(
    new GitLab.PaginateParams({
        page: 1, per_page: 100, scope: ['success', 'failed']
    }));
// find first(last executed) Job by name
const job = jobs.find({name: 'testofclasses'});
console.log(job.status)
```

[**scope**](https://docs.gitlab.com/ee/api/jobs.html#run-a-job:~:text=No-,Scope%20of%20jobs%20to%20show.%20Either%20one%20of%20or%20an%20array%20of%20the%20following%3A%20created%2C%20pending%2C%20running%2C%20failed%2C%20success%2C%20canceled%2C%20skipped%2C%20waiting_for_resource%2C%20or%20manual.%20All%20jobs%20are%20returned%20if%20scope%20is%20not%20provided.,-curl%20%2D%2Dgloboff%20%2D%2Dheader)
- string or array of strings - Scope of jobs to show. Either one of or an array of the following: created, pending,
running, failed, success, canceled, skipped, waiting_for_resource, or manual. All jobs are returned if scope is not
provided.

### List of [Jobs](https://docs.gitlab.com/ee/api/jobs.html) methods:

```javascript
const GitLab = require("gitlab-restapi");
const gitLab = new GitLab.API(new GitLab.Options({
    privateToken: process.env.GIT_TOKEN,
    projectId: process.env.GIT_PID,
}));
console.log(gitLab.Jobs.methods)

// list of registered APIs
console.log(gitLab.getOwnPropertyNames())
```

Get a single job of a project

```javascript
const jobs = await gitLab.Jobs.jobs(
    new GitLab.PaginateParams({page: 1, per_page: 1, scope: ['success']}));
// const jobs = await gitLab.Jobs.jobs(new GitLab.PaginateParams({})); // page: 1, per_page: 20, all scopes
// const jobs = await gitLab.Jobs.jobs(); // page: 1, per_page: 20, all scopes
console.log('jobs:', jobs.list)
const _job = jobs.find({status: 'success'});
console.log('found:', _job)
const job = await gitLab.Jobs.job(_job.id);
console.log('Get a single job of a project by id:', job)
```

Erase a single job of a project (remove job artifacts and a job log)

```javascript
const jobs = await gitLab.Jobs.jobs(new GitLab.PaginateParams({
    page: 1,
    per_page: 100,
    scope: ['failed', 'canceled']
}));
const erasedJobs = new GitLab.Jobs([])
for (let job of jobs.list) {
    if (job.artifacts && job.artifacts.length) {
        const obj = await gitLab.Jobs.erase(job.id);
        if (obj) erasedJobs.push(obj)
    }
}
console.log(erasedJobs.list)
```


[Pipelines](https://docs.gitlab.com/ee/api/pipelines.html#list-project-pipelines)
```javascript
const pipelinelatest = await gitLab.Pipelines.latest();
console.log(pipelinelatest)

const pipelines = await gitLab.Pipelines.pipelines(new GitLab.PaginateParams({
    page: 1, per_page: 20,
}));
console.log(pipelines.list)
```

Add your own method that is not yet implemented by this api

- [Take, for example, Groups](https://docs.gitlab.com/ee/api/groups.html)

```javascript
gitLab.add('groups').addMethods({
    groups: new Method({method: 'get', class: GitLab.Responses, 
        url: () => `groups`})
})
console.log(gitLab.Groups.methods)

const groups = await gitLab.Groups.groups(
    new GitLab.PaginateParams({page: 2, per_page: 20}));
console.log(groups.list)
```

[Releases](https://docs.gitlab.com/ee/api/releases/)

```javascript
gitLab.add('Releases').addMethods({
    releases: new Method({method: 'get', class: GitLab.Responses, 
        url: () => `projects/${gitLab.projectId}/releases`})
})
console.log(gitLab.Releases.methods)

const releases = await gitLab.Releases.releases(new GitLab.PaginateParams({page: 2, per_page: 20}));
console.log(releases.list)
```

Thanks for your attention - the continuation of the api will come soon
