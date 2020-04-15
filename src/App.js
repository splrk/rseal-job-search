import React from 'react';
import { JobProvider } from './JobStore';
import cache from './JobCache';
import JobList from './JobForm';
import './App.css';

function App() {
  return (
    <JobProvider cache={cache}>
      <div className="App">
        <JobList />
      </div>
    </JobProvider>
  );
}

export default App;
