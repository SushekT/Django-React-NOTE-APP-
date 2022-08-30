import React from 'react'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

function Message({width, error, success}) {
  
    return (
        <Stack sx={{ width: {width} }} spacing={5}>
            { error && <Alert severity="error">{error}</Alert>}
            { success && <Alert severity="success">{success}</Alert>}
        </Stack>
    )
}

export default Message;