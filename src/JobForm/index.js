import React, { useContext, useState } from 'react';
import { JobContext } from '../JobStore'
import JobForm from './JobForm';

const JobFormWithContext = () => {
    const [errors, setErrors] = useState({});
    const { currentJob, updateJob, addNewJob } = useContext(JobContext);

    const saveJobForm = job => {
        setErrors([]);
        (job.id ? updateJob(job.id, job) : addNewJob(job))
            .catch(e => {
                setErrors(e.errors);
            });
    };


    return currentJob ? (
        <JobForm job={currentJob} onSubmit={saveJobForm} errors={errors}/>
    ) : (
        null
    );
};

export default JobFormWithContext;
