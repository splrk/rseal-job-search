import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import PlusIcon from '@material-ui/icons/Add';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import cx from 'classnames';
import { DialogActions } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    jobWaiting: {
        backgroundColor: theme.palette.warning.light
    },

    jobSelected: {
        backgroundColor: theme.palette.primary.light
    }
}));

const JobList = ({ jobs, onAddJob, selectedJobId, onSelectJob, onDeleteJob }) => {
    const [newJob, updateNewJob] = useState({});
    const [deleteJob, setDeleteJob] = useState({});
    const classes = useStyles();

    const onChangeJobField = fieldName => event => updateNewJob({
        ...newJob,
        [fieldName]: event.target.value
    });

    const onSubmitNewJob = () => {
        onAddJob(newJob).then(() => updateNewJob({}));
    };

    const handleDeleteJob = () => {
        onDeleteJob(deleteJob.id);
        setDeleteJob({});
    }

    return (
        <>
        <Table stickyHeader aria-label="sticky table">
            <TableHead>
                <TableRow>
                    <TableCell />
                    <TableCell>Company</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Date Posted</TableCell>
                    <TableCell>Date Applied</TableCell>
                    <TableCell>Response</TableCell>
                    <TableCell>Date Responded</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {jobs.map(job => (
                    <TableRow
                        className={cx({
                            [classes.jobWaiting]: job.appliedDate && !job.responseDate,
                            [classes.jobSelected]: selectedJobId === job.id
                        })}
                        key={job.id}
                        onClick={() => onSelectJob(job.id)}
                    >
                        <TableCell>
                            <IconButton
                                onClick={() => setDeleteJob(job)}
                            >
                                <DeleteForeverIcon />
                            </IconButton>
                            <Button variant="contained" color="primary" onClick={() => window.open(job.applicationLink, 'job_application')}>
                                Apply
                            </Button>
                        </TableCell>
                        <TableCell>{job.company}</TableCell>
                        <TableCell>{job.title}</TableCell>
                        <TableCell>{job.postedDate && job.postedDate.toLocaleDateString()}</TableCell>
                        <TableCell>{job.appliedDate && job.appliedDate.toLocaleDateString()}</TableCell>
                        <TableCell>{job.response}</TableCell>
                        <TableCell>{job.responseDate && job.responseDate.toLocaleDateString()}</TableCell>
                    </TableRow>
                ))}
                <TableRow>
                    <TableCell>
                        <IconButton onClick={onSubmitNewJob}>
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
                            id="postedDate"
                            value={newJob.postedDate || ''}
                            onChange={onChangeJobField('postedDate')}
                            type="date"
                            placeholder="Date Posted"
                        />
                    </TableCell>
                    <TableCell colSpan={2}>
                        <TextField
                            id="applicationLink"
                            value={newJob.applicationLink || ''}
                            onChange={onChangeJobField('applicationLink')}
                            placeholder="Application Link"
                        />
                    </TableCell>
                    <TableCell>
                        <TextField
                            id="tags"
                            value={newJob.tags || ''}
                            onChange={onChangeJobField('responseDate')}
                            type="date"
                        />
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
        <Dialog open={Boolean(deleteJob.id)}>
            <DialogTitle>
                Are you sure you want to Delete this Job?
            </DialogTitle>
            <DialogContent>
                Are you sure you want to delete "{deleteJob.title}" offered at "{deleteJob.company}"
            </DialogContent>
            <DialogActions>
                <Button autoFocus color="primary" onClick={() => setDeleteJob({})}>
                    Cancel
                </Button>
                <Button onClick={handleDeleteJob}>
                    Yes, Delete Permanently
                </Button>
            </DialogActions>
        </Dialog>
        </>
    );
};

export default JobList;