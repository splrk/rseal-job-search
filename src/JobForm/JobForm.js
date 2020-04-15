import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import PlusIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';

const JobList = ({ jobs, onAddJob }) => {
    const [newJob, updateNewJob] = useState({});
    const onChangeJobField = fieldName => event => updateNewJob({
        ...newJob,
        [fieldName]: event.target.value
    });

    return (
        <Table stickyHeader aria-label="sticky table">
            <TableHead>
                <TableRow>
                    <TableCell />
                    <TableCell>Company</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Link</TableCell>
                    <TableCell>Date Posted</TableCell>
                    <TableCell>Date Applied</TableCell>
                    <TableCell>Response</TableCell>
                    <TableCell>Date Responded</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {jobs.map(job => (
                    <TableRow key={job.id}>
                        <TableCell />
                        <TableCell>{job.company}</TableCell>
                        <TableCell>{job.title}</TableCell>
                        <TableCell>{job.applicationLink}</TableCell>
                        <TableCell>{job.applicationDate}</TableCell>
                        <TableCell>{job.appliedDate}</TableCell>
                        <TableCell>{job.response}</TableCell>
                        <TableCell>{job.responseDate}</TableCell>
                    </TableRow>
                ))}
                <TableRow>
                    <TableCell>
                        <IconButton onClick={() => onAddJob(newJob)}>
                            <PlusIcon />
                        </IconButton>
                    </TableCell>
                    <TableCell>
                        <TextField
                            id="company"
                            value={newJob.company || ''}
                            onChange={onChangeJobField('company')}
                        />
                    </TableCell>
                    <TableCell>
                        <TextField
                            id="title"
                            value={newJob.title || ''}
                            onChange={onChangeJobField('title')}
                        />
                    </TableCell>
                    <TableCell>
                        <TextField
                            id="applicationLink"
                            value={newJob.applicationLink || ''}
                            onChange={onChangeJobField('applicationLink')}
                        />
                    </TableCell>
                    <TableCell>
                        <TextField
                            id="applicationDate"
                            value={newJob.applicationDate || ''}
                            onChange={onChangeJobField('applicationDate')}
                            type="date"
                        />
                    </TableCell>
                    <TableCell>
                        <TextField
                            id="appliedDate"
                            value={newJob.appliedDate || ''}
                            onChange={onChangeJobField('appliedDate')}
                            type="date"
                        />
                    </TableCell>
                    <TableCell>
                        <TextField
                            id="response"
                            value={newJob.responseDate || ''}
                            onChange={onChangeJobField('response')}
                        />
                    </TableCell>
                    <TableCell>
                        <TextField
                            id="responseDate"
                            value={newJob.responseDate || ''}
                            onChange={onChangeJobField('responseDate')}
                            type="date"
                        />
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
};

export default JobList;