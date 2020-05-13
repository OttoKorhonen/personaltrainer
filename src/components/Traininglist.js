import React from 'react';
import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';


export default function Traininglist(props) {
    const [trainings, setTrainings] = React.useState([]);
    const [msg, setMsg] = React.useState('');
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        getTrainings();
    }, [])

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(responseData => setTrainings(responseData))
            .catch(err => console.error(err))
    }

    const deleteTraining = (link, training) => {
        if (window.confirm('Delete training?')) {
            console.log(link)
            fetch(link, { method: 'DELETE' })
                .then(_ => getTrainings())
                .then(_ => {
                    setOpen(true);
                    setMsg('Training deleted');
                })
                .catch(err => console.error(err))
        }
    }

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
            accessor: 'customer.firstname'
        },
        {
            Header: 'Lastname',
            accessor: 'customer.lastname'
        },
        {
            Cell: row => (<IconButton color="secondary" size="small" onClick={() => deleteTraining(row.original)}><DeleteIcon />Delete</IconButton>)
        }
    ]

    return (
        <div>
            <ReactTable defaultPageSize={15} filterable={true}
                data={trainings} columns={columns} />
        </div>
    )
}