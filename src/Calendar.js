import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
 
export default function Calendar(){
const localizer = momentLocalizer(moment)
const locales = {
    'en-US': require('date-fns/locale/en-US'),
  }
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  })
 
return (
  <div>
       <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <Calendar
      localizer={localizer}
      events={myEventsList}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
    </MuiPickersUtilsProvider>
  </div>
)
}