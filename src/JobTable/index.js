import React, { useContext, useMemo } from 'react';
import { JobContext } from '../JobStore';
import JobTable from './JobTable';
import { TagsContext } from '../TagsStore';

export default () => {
    const {
        jobs,
        addNewJob,
        currentJob,
        clearCurrentJob,
        selectJob,
        deleteJob
    } = useContext(JobContext);
    const { tags } = useContext(TagsContext);

    const tagColors = useMemo(() =>
        Array.from(tags.entries())
        .reduce((tagColors, [tag, color]) => ({
            ...tagColors,
            [tag]: color
        }), {}),
        [tags]
    );

    const toggleSelectedJob = id => {
        if (currentJob && id === currentJob.id) {
            clearCurrentJob()
        } else {
            selectJob(id);
        }
    }

    const onAddJob = job => {
        return addNewJob(job).then(newJobId => {
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
            tagColors={tagColors}
            selectedJobId={currentJob && currentJob.id}
            onSelectJob={toggleSelectedJob}
            onDeleteJob={onDeleteJob}
        />
    );
};
