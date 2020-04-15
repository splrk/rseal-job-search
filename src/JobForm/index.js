import React, { useContext } from 'react';
import { JobContext } from '../JobStore';
import JobList from './JobForm';

export default () => {
    const { jobs, addNewJob } = useContext(JobContext);

    return <JobList jobs={jobs} onAddJob={addNewJob} />;
};
