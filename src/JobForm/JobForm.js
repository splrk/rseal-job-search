import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import EventIcon from '@material-ui/icons/Event';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { makeStyles } from '@material-ui/core/styles';
import { format, parseISO } from 'date-fns';

const useStyles = makeStyles(theme => ({
    jobTitle: {
        fontSize: '1.4em'
    },
    errorPaper: {
        backgroundColor: theme.palette.danger
    },
    company: {
        color: 'gray',
        '& input': {
            textAlign: 'right'
        }
    },
    postedDate: {
        textAlign: 'left'
    }
}));

const JobForm = ({ job, onSubmit, errors }) => {
    const [fieldValues, setFields] = useState(job);
    const classes = useStyles();

    useEffect(() => {
        setFields(job);
    }, [job]);

    const changeField = (fieldName, transform = v => v) => event => {
        const { [fieldName]: oldValue, ...oldValues } = fieldValues;
        if (event.target.value) {
            const newValue = transform(event.target.value);
            setFields({ ...oldValues, [fieldName]: newValue });
        } else {
            setFields(oldValues);
        }
    }

    const changeDateField = fieldName => changeField(fieldName, parseISO);

    return (
            <Grid container direction="column" spacing={0}>
                { errors && errors.length > 0 && (
                    <Grid item>
                        <Paper className={classes.errorPaper}>
                            <List dense>
                                {errors.map(error => (
                                    <ListItem>
                                        <ListItemText
                                            primary={error}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    </Grid>
                )}
                <Grid item container direction="column" spacing={0}>
                    <Grid item>
                        <InputBase className={classes.jobTitle} value={fieldValues.title} onChange={changeField('title')} />
                    </Grid>
                    <Grid container item justify="flex-start">
                        <Grid item xs>
                            <InputBase
                                fullWidth
                                className={classes.company}
                                value={fieldValues.company}
                                onChange={changeField('company')}
                            />
                        </Grid>
                        <Grid item xs>
                            <EventIcon />
                            <InputBase
                                type="date"
                                className={classes.postedDate}
                                value={fieldValues.postedDate && format(fieldValues.postedDate, 'yyyy-MM-dd')}
                                onChange={changeDateField('postedDate')}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item container spacing={0}>
                    <Grid item xs={1}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => window.open(fieldValues.applicationLink, 'jobapplication')}
                        >
                            Apply
                        </Button>
                    </Grid>
                    <Grid item xs>
                        <InputBase
                            fullWidth
                            type="text"
                            className={classes.applicationLink}
                            value={fieldValues.applicationLink}
                            onChange={changeField('applicationLink')}
                        />
                    </Grid>
                    <Grid item container direction="column" xs={2}>
                        <Grid item>
                            {fieldValues.appliedDate && <><CheckCircleIcon color="action" /> Applied On</>}
                            {!fieldValues.appliedDate && <><PriorityHighIcon color="error" />Haven't Applied Yet</>}
                        </Grid>
                        <Grid item>
                            <InputBase
                                type="date"
                                fullWidth
                                value={fieldValues.appliedDate ? format(fieldValues.appliedDate, 'yyyy-MM-dd') : ''}
                                onChange={changeDateField('appliedDate')}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => onSubmit(fieldValues)}
                    >
                        {job.id ? 'Update Position' : 'Add Position'}
                    </Button>
                </Grid>
            </Grid>
    );
};

export default JobForm;
