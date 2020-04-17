import React from 'react';
import Grid from '@material-ui/core/Grid';
import { JobProvider } from './JobStore';
import cache from './JobCache';
import JobTable from './JobTable';
import JobForm from './JobForm';
import './App.css';

function App() {

  return (
    <JobProvider cache={cache}>
      <Grid className="App" container direction="row" spacing={0}>
        <Grid item xs>
          <JobTable />
        </Grid>
        <Grid item xs>
          <JobForm />
        </Grid>
      </Grid>
    </JobProvider>
  );
}

export default App;
