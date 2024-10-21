import React from 'react'

import SvgIcon from '@mui/material/SvgIcon';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';


function LogoutUI({ openPopUp, setOpenPopUp, handleLogout }) {

  return (
    <div>
            <Dialog
                className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm"
                open={openPopUp}
                onClose={() => setOpenPopUp(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <SvgIcon component={LogoutOutlinedIcon} />{" Log Out?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to logout?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenPopUp(false)} variant="outlined" color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleLogout} variant="contained" style={{ backgroundColor: 'rgba(156, 12, 12)', color: 'white' }}>
                        Log out
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default LogoutUI