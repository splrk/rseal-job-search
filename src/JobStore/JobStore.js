import React, { useState } from 'react';
import { reach, ValidationError } from 'yup';
import { jobListSchema } from './jobSchema';

const JobContext = React.createContext();

const JobProvider = ({ cache, children }) => {
    const [jobs, setLocalJobsState] = useState(cache.value);
    const [status, setStatus] = useState('idle');
    const [currentJob, setCurrentJob] = useState();

    const setJobs = jobs => {
        setLocalJobsState(jobs);
        cache.updateValue(jobs);
    }

    const selectJob = id => {
        if (reach(jobListSchema, '[].id', jobs).isValidSync(id)) {
            setCurrentJob(jobs.find(job => job.id === id));
        } else {
            return new ValidationError(['Job id is invalid']);
        }
    };

    const clearCurrentJob = () => setCurrentJob(undefined);

    const addNewJob = (newJob) => {
        setStatus('adding');
        
        newJob.id = (jobs.length ? jobs[jobs.length - 1] : 0) + 1;
        const newjobs = [...jobs, newJob];

        return jobListSchema.validate(newjobs)
            .then(() => {
                setStatus('idle');
                setJobs(newjobs);
            }).catch(e => {
                setStatus('idle');
                throw e;
            });
    }

    const updateJob = (id, { id: _, ...job }) => {
        setStatus('updating');
        const oldJobIndex = jobs.findIndex(listJob => id === listJob.id);

        if (oldJobIndex === -1) {
            setStatus('ide');
            return Promise.reject(new ValidationError(['Job does not exist']));
        }
        
        const newjobs = [...jobs, { id, ...job }];

        return jobListSchema.validate(newjobs)
            .then(() => {
                setStatus('idle');
                setJobs(newjobs);
            }).catch(e => {
                setStatus('idle');
                throw e;
            });
    }

    return (
        <JobContext.Provider value={{ jobs, currentJob, selectJob, clearCurrentJob, status, addNewJob, updateJob }}>
            { children }
        </JobContext.Provider>
    );
};

const JobConsumer = JobContext.Consumer;

export {
    JobContext,
    JobProvider,
    JobConsumer
};
