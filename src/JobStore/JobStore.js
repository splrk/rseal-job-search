import React, { useState } from 'react';

const JobContext = React.createContext();

const JobProvider = ({ cache, children }) => {
    const [jobs, setLocalJobsState] = useState(cache.value);
    const [status, setStatus] = useState('idle');
    const [lastError, setLastError] = useState('');

    const setJobs = jobs => {
        setLocalJobsState(jobs);
        cache.updateValue(jobs);
    }

    const findDuplicateJob = (newJob) => {
        const duplicateJob = jobs.find(job =>
            job.applicationLink === newJob.appliactionLink ||
            (
                job.company === newJob.company &&
                job.title === newJob.title
            )
        );

        return duplicateJob;
    }

    const addNewJob = (newJob) => {
        setStatus('adding');
        const duplicateJob = findDuplicateJob(newJob);

        if (duplicateJob) {
            setLastError(`Dupliacte job ${newJob.title} for ${newJob.company}`);
            setStatus('idle');
        } else {
            newJob.id = (jobs.length ? jobs[jobs.length - 1] : 0) + 1;
            setJobs([...jobs, newJob]);
            setStatus('idle');
        }
    }

    const updateJob = (id, { id: _, ...job }) => {
        setStatus('updating');
        const oldJobIndex = jobs.findIndex(listJob => id === listJob.id);

        if (!oldJobIndex === -1) {
            setLastError('Job does not exist');
        } else {
            const oldJob = jobs[oldJobIndex];
            const updatedJob = { ...oldJob, ...job };
            const duplicateJob = findDuplicateJob(updateJob);

            if (duplicateJob) {
                setLastError(`Job ${duplicateJob.title} for ${duplicateJob.company} already exists`);
            } else {
                setJobs([
                    ...jobs.slice(0, oldJobIndex),
                    updatedJob,
                    ...jobs.slice(oldJobIndex + 1)
                ]);
            }
        }
        setStatus('idle');
    }

    return (
        <JobContext.Provider value={{ jobs, lastError, status, addNewJob, updateJob }}>
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
