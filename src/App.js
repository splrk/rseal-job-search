import React from 'react';
import Grid from '@material-ui/core/Grid';
import { JobProvider } from './JobStore';
import { TagsProvider } from './TagsStore';
import LocalStorageCache from './LocalStorageCache';
import JobTable from './JobTable';
import JobForm from './JobForm';
import { jobListSchema } from './JobStore/jobSchema';

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
}));

const jobCache = new LocalStorageCache('cachedJobs', [], jobListSchema);
const tagsCache = new LocalStorageCache('jobtags', []);

function App() {
  const classes = useStyles();

  return (
    <JobProvider cache={jobCache}>
      <TagsProvider cache={tagsCache}>
        <Grid className={classes.root} container direction="row" spacing={0}>
          <Grid className={classes.horizontalScroll} item xs>
            <JobTable />
          </Grid>
          <Grid className={classes.horizontalScroll} item xs>
            <JobForm />
          </Grid>
        </Grid>
      </TagsProvider>
    </JobProvider>
  );
}

export default App;
