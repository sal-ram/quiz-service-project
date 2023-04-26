import { Backdrop, CircularProgress } from '@mui/material'
import React from 'react'

export default function Loader() {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}
