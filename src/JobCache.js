const localJobs = window.localStorage.getItem('cachedJobs');
const value = (localJobs ? JSON.parse(localJobs) : []).map(job => ({
    ...job,
    appliedDate: job.appliedDate && new Date(job.appliedDate),
    applicationDate: job.applicationDate && new Date(job.applicationDate),
    responseDate: job.responseDate && new Date(job.responseDate)
}));

const JobCache = {
    value,
    updateValue(jobs) {
        window.localStorage.setItem('cachedJobs', JSON.stringify(jobs));
    }
};

export default JobCache;
