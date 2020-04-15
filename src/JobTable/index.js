import React, { useContext } from 'react';
import { JobContext } from '../JobStore';
import JobTable from './JobTable';

export default () => {
    const { jobs, addNewJob } = useContext(JobContext);

    return <JobTable jobs={jobs} onAddJob={addNewJob} />;
};
