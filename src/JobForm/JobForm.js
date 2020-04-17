import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    jobTitle: {
        fontSize: '1.4em'
    },
    errorPaper: {
        backgroundColor: theme.palette.danger
    }
}));

const JobForm = ({ job, onSubmit, errors }) => {
    const [fieldValues, setFields] = useState(job);
    const classes = useStyles();

    const changeField = fieldName => event => {
        setFields({ ...fieldValues, [fieldName]: event.target.value });
    } 

    return (
        <Paper variant="outlined" square>
            <Grid container direction="column">
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
                <Grid item>
                    <InputBase className={classes.jobTitle} value={fieldValues.title} onChange={changeField('title')} />
                </Grid>
                <Grid container item justify="flex-start">
                    <Grid item xs>
                        <InputBase className={classes.company} value={fieldValues.company} onChange={changeField('company')} />
                    </Grid>
                    <Grid item xs>
                        <InputBase
                            type="date"
                            className={classes.postedDate}
                            value={fieldValues.postedDate}
                            onChange={changeField('postedDate')}
                        />
                    </Grid>
                </Grid>
                <Grid item container spacing={1}>
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
        </Paper>
    );
};

export default JobForm;
