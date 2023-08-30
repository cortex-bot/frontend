import React from 'react';
// @ts-expect-error TS(6142): Module './ActiveExecutors' was resolved to 'D:/wor... Remove this comment to see the full error message
import ActiveExecutors from './ActiveExecutors';
// @ts-expect-error TS(6142): Module './SpawnExecutors' was resolved to 'D:/work... Remove this comment to see the full error message
import SpawnExecutors from './SpawnExecutors';

export default function ExecutorControlPanel() {
  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className="container m-1 p-2">
    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    <div className="grid grid-cols-3 md:grid-cols-5 ">
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <div className="col-span-3 md:col-span-3 rounded-lg shadow-lg p-4">
        {ActiveExecutors()}
      </div>
  
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <div className="col-span-2 md:col-span-2 rounded-lg shadow-lg p-4">
        {SpawnExecutors()}
      </div>
    </div>
  </div>
  
  );
}
