import React, { useContext } from 'react';
import { JobContext } from '../JobStore';
import JobTable from './JobTable';

export default () => {
    const {
        jobs,
        addNewJob,
        currentJob,
        clearCurrentJob,
        selectJob,
        deleteJob
    } = useContext(JobContext);

    const toggleSelectedJob = id => {
        if (currentJob && id === currentJob.id) {
            clearCurrentJob()
        } else {
            selectJob(id);
        }
    }

    const onAddJob = job => {
        return addNewJob(job).then(newJobId => {
            console.log(newJobId);
            selectJob(newJobId);
        });
    }

    const onDeleteJob = jobId => {
        deleteJob(jobId);
    }

    return (
        <JobTable
            jobs={jobs}
            onAddJob={onAddJob}
            selectedJobId={currentJob && currentJob.id}
            onSelectJob={toggleSelectedJob}
            onDeleteJob={onDeleteJob}
        />
    );
};
