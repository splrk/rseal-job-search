import React from 'react';
import Grid from '@material-ui/core/Grid';
import { JobProvider } from './JobStore';
import cache from './JobCache';
import JobTable from './JobTable';
import JobForm from './JobForm';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    maxHeight: '100vh',
    maxWidth: '100vw',
    height: '100vh',
    width: '100vw',
    boxSizing: 'border-box',
  },
  horizontalScroll: {
    overflowY: 'scroll',
    maxHeight: '100%'
  }
}))

function App() {
  const classes = useStyles();

  return (
    <JobProvider cache={cache}>
      <Grid className={classes.root} container direction="row" spacing={0}>
        <Grid className={classes.horizontalScroll} item xs>
          <JobTable />
        </Grid>
        <Grid className={classes.horizontalScroll} item xs>
          <JobForm />
        </Grid>
      </Grid>
    </JobProvider>
  );
}

export default App;
