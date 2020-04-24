import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { makeStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import { format, parseISO } from 'date-fns';
import TagsInput from '../TagsInput';
import ResponsesForm from './ResponsesForm';

const useStyles = makeStyles(theme => ({
    jobTitle: {
        fontSize: '1.4em',
        textAlign: 'center',
        width: '100%'
    },
    jobTitleInput: {
        width: '100%',
        textAlign: 'center'
    },
    errorPaper: {
        backgroundColor: theme.palette.danger
    },
    company: {
        color: grey[400],
        '& input': {
            textAlign: 'right'
        }
    },
    postedDate: {}
}));

const JobForm = ({ job, onSubmit, errors, ...props }) => {
    const [fieldValues, setFields] = useState(job);
    const classes = useStyles();

    useEffect(() => {
        setFields(job);
    }, [job]);

    const fromEvent = event => event.target.value;

    const changeSingleField = (fieldName, transform = v => v) => value => {
        const { [fieldName]: oldValue, ...oldValues } = fieldValues;
        if (value) {
            const newValue = transform(value);
            setFields({ ...oldValues, [fieldName]: newValue });
        } else {
            setFields(oldValues);
        }
    }

    const changeField = fieldName => changeSingleField(fieldName, fromEvent);

    const changeDateField = fieldName => changeSingleField(fieldName, v => parseISO(fromEvent(v)));

    return (
            <Grid
                container
                direction="column"
                spacing={0}
                {...props}
            >
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
                        <InputBase
                            classes={{
                                root: classes.jobTitle,
                                input: classes.jobTitleInput
                            }}
                            value={fieldValues.title}
                            onChange={changeField('title')}
                        />
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
                        <Grid item xs style={{ textAlign: 'center' }}>
                            <InputBase
                                type="date"
                                className={classes.postedDate}
                                value={fieldValues.postedDate && format(fieldValues.postedDate, 'yyyy-MM-dd')}
                                onChange={changeDateField('postedDate')}
                            />
                        </Grid>
                        <Grid item xs>
                            <TagsInput
                                value={fieldValues.tags}
                                onChange={changeSingleField('tags')}
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
                    <Grid item container direction="column" xs={4}>
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
                    <ResponsesForm
                        responses={fieldValues.responses}
                        onChange={changeSingleField('responses')}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        fullWidth
                        multiline
                        label="Notes"
                        value={fieldValues.notes || ''}
                        onChange={changeField('notes')}
                     />
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
