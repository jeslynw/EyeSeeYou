import React from "react";

import SvgIcon from "@mui/material/SvgIcon";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import UpgradeIcon from "@mui/icons-material/Upgrade";

function RestrictUI({ openPopUp, setOpenPopUp, handleCancel, handleUpgrade }) {
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
          <SvgIcon component={UpgradeIcon} />
          {" Upgrade to Premium"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This feature is only available for Premium Plan users. Upgrade now
            to enable this feature. <br />
            Click cancel to go back.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} variant="outlined" color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleUpgrade}
            // onClick={() => setOpenPopUp(false)}
            variant="contained"
            style={{ backgroundColor: "rgba(156, 12, 12)", color: "white" }}
          >
            Upgrade
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default RestrictUI;
