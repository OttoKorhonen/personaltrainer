import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import React, { useState } from "react";
import { IconButton } from "@material-ui/core";
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';

export default function Addtraining(props) {
    const [selectedDate, handleDateChange] = useState(new Date());
    const [training, setTraining] = React.useState({ date: new Date(selectedDate), duration: '', activity: '' });// selectedDate.toISOString() new Date(selectedDate)
    const [open, setOpen] = React.useState(false);

    

    const handleClickOpen = () => {
        console.log(props.customer.firstname, props.customer.lastname)
        console.log(training)
        console.log(selectedDate)
        setOpen(true);
    }

    const handleClose = () => {
        props.addTraining(props.customer.links[0].href, training)
        console.log(training)
        setOpen(false);
    }

    const handleCancel = () => {
        setOpen(false);
    }

    const inputChanged = (event) => {
        setTraining({ ...training, [event.target.name]: event.target.value });
    }

    const d = require('moment');//koeta saada tällä päivämäärä toimimaan
    const today = d();
    console.log(today.format());

    return (
        <div>

            <IconButton size="small" color="primary" onClick={handleClickOpen}>
                <FitnessCenterIcon />
                <Typography>
                    New training
                </Typography>
            </IconButton>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add a new training to {props.customer.firstname} {props.customer.lastname}</DialogTitle>
                <DialogContent>

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>

                        <KeyboardDateTimePicker
                            value={ selectedDate.toISOString()}//selectedDate
                            onChange={handleDateChange}
                            label="Select date and time"
                            onError={console.log}
                            minDate={today}//new Date(selectedDate)
                            format="yyyy-MM-dd hh:mm a"
                        />

                    </MuiPickersUtilsProvider>
                    <TextField
                        margin="dense"
                        id="duration"
                        name="duration"
                        value={training.duration}
                        onChange={inputChanged}
                        label="Duration (minutes)"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="activity"
                        name="activity"
                        value={training.activity}
                        onChange={inputChanged}
                        label="Activity"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="primary">
                        Cancel
          </Button>
                    <Button onClick={handleClose} color="primary">
                        Add
          </Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}