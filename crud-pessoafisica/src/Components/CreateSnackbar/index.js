import React, { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';

export default function CreateSnackbar({ openSnack, msgSnack, handleCloseSnack }) {
    const [open, setopen] = useState(false);
    const [msg, setMsg] = useState(msgSnack);

    const vertical = 'top';
    const horizontal = 'right';

    const handleClose = () => {
        setopen(false);
        handleCloseSnack();
    };

    useEffect(() => {
        setopen(openSnack);
    }, [openSnack]);

    useEffect(() => {
        setMsg(msgSnack);
    }, [msgSnack]);


    return (
        <div>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={handleClose}
                message={msg}
                key={vertical + horizontal}
            />
        </div>
    );
}
