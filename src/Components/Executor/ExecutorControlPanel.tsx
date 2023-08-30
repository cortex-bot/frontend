import React from 'react';
import ActiveExecutors from './ActiveExecutors';
import SpawnExecutors from './SpawnExecutors';

export default function ExecutorControlPanel() {
  return (
    <div className="container m-1 p-2">
    <div className="grid grid-cols-3 md:grid-cols-5 ">
      <div className="col-span-3 md:col-span-3 rounded-lg shadow-lg p-4">
        {ActiveExecutors()}
      </div>
  
      <div className="col-span-2 md:col-span-2 rounded-lg shadow-lg p-4">
        {SpawnExecutors()}
      </div>
    </div>
  </div>
  
  );
}
