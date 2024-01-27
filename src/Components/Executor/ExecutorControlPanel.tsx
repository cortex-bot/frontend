import { Box } from '@mui/material';
import React from 'react';
// @ts-expect-error TS(6142): Module './ActiveExecutors' was resolved to 'D:/wor... Remove this comment to see the full error message
import ActiveExecutors from './ActiveExecutors';
// @ts-expect-error TS(6142): Module './SpawnExecutors' was resolved to 'D:/work... Remove this comment to see the full error message
import SpawnExecutors from './SpawnExecutors';

export default function ExecutorControlPanel() {
  return (
    <Box sx={{ display: 'flex', p: '20px', gap: '20px' }}>
      <ActiveExecutors />
      <SpawnExecutors />
    </ Box>
  );
}
