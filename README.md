# gitlab
Integration with GitLab REST API

The module allows you to perform the list of methods described in the GitLab service documentation in the section 
[Jobs](https://docs.gitlab.com/ee/api/jobs.html) (for now)

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

[read more](https://docs.gitlab.com/ee/api/jobs.html#run-a-job:~:text=On%20this%20page-,List%20project%20jobs,Run%20a%20job)

And yes, let's start!

☕️ [buy me a coffee](https://www.buymeacoffee.com/rosbitskyy.ruslan)

### Installation

First install [Node.js](https://nodejs.org/uk)

```shell
npm i gitlab-restapi
```

```javascript
const GitLab = require("gitlab-restapi");
const gitLab = new GitLab.API(new GitLab.Options({
    privateToken: process.env.GIT_TOKEN,
    projectId: process.env.GIT_PID,
}));

const jobs = await gitLab.Jobs.jobs(new GitLab.PaginateParams({page: 1, per_page: 100, scope: ['success', '']}));
// find first(last executed) Job by name
const job = jobs.find({name: 'testofclasses'});
console.log(job.status)
```
**[scope](https://docs.gitlab.com/ee/api/jobs.html#run-a-job:~:text=No-,Scope%20of%20jobs%20to%20show.%20Either%20one%20of%20or%20an%20array%20of%20the%20following%3A%20created%2C%20pending%2C%20running%2C%20failed%2C%20success%2C%20canceled%2C%20skipped%2C%20waiting_for_resource%2C%20or%20manual.%20All%20jobs%20are%20returned%20if%20scope%20is%20not%20provided.,-curl%20%2D%2Dgloboff%20%2D%2Dheader)** - string or array of strings - Scope of jobs to show. Either one of or an array of the following: created, pending, running, failed, success, canceled, skipped, waiting_for_resource, or manual. All jobs are returned if scope is not provided.

List of [Jobs](https://docs.gitlab.com/ee/api/jobs.html) methods:
```javascript
const GitLab = require("gitlab-restapi");
const gitLab = new GitLab.API(new GitLab.Options({
    privateToken: process.env.GIT_TOKEN,
    projectId: process.env.GIT_PID,
}));
console.log(gitLab.Jobs.uri)
```

Thanks for your attention - the continuation of the api will come soon