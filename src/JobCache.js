import { jobListSchema } from './JobStore/jobSchema';

const localJobs = window.localStorage.getItem('cachedJobs');
const value = (localJobs ? JSON.parse(localJobs) : []);

const JobCache = {
    value: jobListSchema.cast(value),
    updateValue(jobs) {
        window.localStorage.setItem('cachedJobs', JSON.stringify(jobs));
    }
};

export default JobCache;
