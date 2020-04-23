import React from 'react';
import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'

export default function Traininglist(){
    const[trainings, setTrainings] = React.useState([]);

React.useEffect(()=>{
    getTrainings();
}, [])

    const getTrainings = () =>{
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(responseData => setTrainings(responseData.content))
        .catch(err => console.error(err))
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
        }
    ]

    return(
        <div>
           
            <ReactTable defaultPageSize={10} filterable={true}
             data={trainings} columns={columns}/>
        </div>
    )
}