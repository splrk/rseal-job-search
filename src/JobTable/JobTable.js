import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import PlusIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    jobWaiting: {
        backgroundColor: theme.palette.blue
    }
}));

const JobList = ({ jobs, onAddJob }) => {
    const [newJob, updateNewJob] = useState({});
    const onChangeJobField = fieldName => event => updateNewJob({
        ...newJob,
        [fieldName]: event.target.value
    });
    const classes = useStyles();

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
                    <TableRow className={job.appliedDate && !job.responseDate && classes.jobWaiting} key={job.id}>
                        <TableCell>
                            <IconButton>
                                <EditIcon />
                            </IconButton>
                        </TableCell>
                        <TableCell>{job.company}</TableCell>
                        <TableCell>{job.title}</TableCell>
                        <TableCell>{job.applicationLink}</TableCell>
                        <TableCell>{job.applicationDate && job.applicationDate.toLocaleDateString()}</TableCell>
                        <TableCell>{job.appliedDate && job.appliedDate.toLocaleDateString()}</TableCell>
                        <TableCell>{job.response}</TableCell>
                        <TableCell>{job.responseDate && job.responseDate.toLocaleDateString()}</TableCell>
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