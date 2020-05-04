import React from 'react';
import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'


export default function Traininglist() {
    const [trainings, setTrainings] = React.useState([]);

    React.useEffect(() => {
        getTrainings();
    }, [])

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings') //gettrainings
            .then(response => response.json())
            .then(responseData => setTrainings(responseData))
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
            accessor: 'customer.firstname'
        },
        {
            Header: 'Lastname',
            accessor: 'customer.lastname'
        },
    ]

    return (
        <div>
            
            <ReactTable defaultPageSize={10} filterable={true}
                data={trainings} columns={columns} />
            
        </div>
    )
}