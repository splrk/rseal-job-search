import React, { useContext } from 'react';
import { JobContext } from '../JobStore';
import JobTable from './JobTable';

export default () => {
    const {
        jobs,
        addNewJob,
        currentJob,
        clearCurrentJob,
        selectJob
    } = useContext(JobContext);

    const toggleSelectedJob = id => {
        if (currentJob && id === currentJob.id) {
            clearCurrentJob()
        } else {
            selectJob(id);
        }
    }

    return (
        <JobTable
            jobs={jobs}
            onAddJob={addNewJob}
            selectedJobId={currentJob && currentJob.id}
            onSelectJob={toggleSelectedJob}
        />
    );
};
