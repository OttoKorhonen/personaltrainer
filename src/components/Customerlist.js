import React from 'react';
import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'


export default function Customerlist(){
    const[customers, setCustomers] = React.useState([]);

    React.useEffect(()=>{
        getCustomers();
    }, []);

    const getCustomers = () =>{
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(responseData => setCustomers(responseData.content))
        .catch(err => console.error(err))
    }

    const columns =[
        //{
       //     Cell: row => (<Button>Delete</Button>),
      //      CeLL: row => (<Button>Edit</Button>)
      //  },
     //   {
     //       Cell: row => (<Button>Add</Button>)
      //  },
        {
            Header: 'Firstname',
            accessor: 'firstname'
        },
        {
            Header: 'Lastname',
            accessor: 'lastname'
        },
        {
            Header: 'Street address',
            accessor: 'streetaddress'
        },
        {
            Header: 'Post code',
            accessor: 'postcode'
        },
        {
            Header: 'City',
            accessor: 'city'
        },
        {
            Header: 'Email',
            accessor: 'email'
        },
        {
            Header: 'Phone',
            accessor: 'phone'
        }
    ]

    return(
        <div>
            <ReactTable defaultPageSize={15} filterable={true}
             data={customers} columns={columns}/>
        </div>
    )
}