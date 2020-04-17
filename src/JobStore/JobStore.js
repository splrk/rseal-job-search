import React, { useState, useEffect } from 'react';
import { reach, ValidationError } from 'yup';
import { jobListSchema, jobSchema } from './jobSchema';

const JobContext = React.createContext();

const JobProvider = ({ cache, children }) => {
    const [jobs, setLocalJobsState] = useState(cache.value);
    const [status, setStatus] = useState('idle');
    const [currentJob, setCurrentJob] = useState();
    const [currentJobId, selectJob] = useState();

    const setJobs = jobs => {
        setLocalJobsState(jobs);
        cache.updateValue(jobs);
    }

    useEffect(() => {
        if (reach(jobListSchema, '[].id', jobs).isValidSync(currentJobId)) {
            setCurrentJob(jobs.find(job => job.id === currentJobId));
        }
    }, [currentJobId, jobs]);
    
    const clearCurrentJob = () => setCurrentJob(undefined);

    const addNewJob = (newJob) => {
        setStatus('adding');
        
        newJob.id = (jobs.length ? jobs[jobs.length - 1].id : 0) + 1;
        const newjobs = [...jobs, jobSchema.cast(newJob)];

        return jobListSchema.validate(newjobs)
            .then(() => {
                setStatus('idle');
                setJobs(newjobs);
                return newJob.id;
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
        
        const newjobs = [
            ...jobs.slice(0, oldJobIndex),
            { id, ...jobSchema.cast(job) },
            ...jobs.slice(oldJobIndex + 1)
        ];

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
