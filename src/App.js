import React from 'react';
import { JobProvider } from './JobStore';
import cache from './JobCache';
import JobTable from './JobTable';
import './App.css';

function App() {
  return (
    <JobProvider cache={cache}>
      <div className="App">
        <JobTable />
      </div>
    </JobProvider>
  );
}

export default App;
