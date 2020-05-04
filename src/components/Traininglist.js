import React from 'react';
import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'
import Snackbar from '@material-ui/core/Snackbar';
import Addtraining from './Addtraining'


export default function Traininglist() {
    const [trainings, setTrainings] = React.useState([]);
    const [msg, setMsg] = React.useState('');
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        getTrainings();
    }, [])

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings') //gettrainings
            .then(response => response.json())
            .then(responseData => setTrainings(responseData))
            .catch(err => console.error(err))
    }

    const handleClose = () => {
        setOpen(false);
    }

    const addTraining = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(training)
            }
        )
            .then(_ => getTrainings())
            .then(_ => {
                setMsg('New training added');
                setOpen(true);
            })
            .catch(err => console.error(err))
    }

    console.log(trainings)

    const columns = [
        {
            Header: 'Date',
            accessor: 'date'
        },
        {
            Header: 'Duration',
            accessor: 'duration'
        },
        {
            Header: 'Activity',
            accessor: 'activity'
        },
        {
            Header: 'Firstname',
            accessor: 'firstname'
        },
        {
            Header: 'Lastname',
            accessor: 'lastname'
        },
    ]

    return (
        <div>
            <Addtraining addtraining={addTraining} />
            <ReactTable defaultPageSize={10} filterable={true}
                data={trainings} columns={columns} />
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message={msg}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
            />
        </div>
    )
}