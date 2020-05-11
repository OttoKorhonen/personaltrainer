import React from "react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import Calendar from "react-material-ui-calendar";
import DateFnsUtils from '@date-io/date-fns';

export default function Calendar() {
    callBackFunction = value => {
        console.log("The selection is  -> ", value);
      };

    return (
        <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Calendar
                    generalStyle={{
                        maxWidth: "100%",
                        margin: "0 auto",
                        backgroundColor: "rgba(256,256,256,1)",
                        height: "100%",
                        overflow: "auto"
                    }}
                    light={true}
                    selection={this.callBackFunction}
                />
            </MuiPickersUtilsProvider>
        </div>
    )
}
