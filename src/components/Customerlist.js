import React from 'react';
import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import EditCustomer from './EditCustomer';
import AddCustomer from './AddCustomer';

import Addtraining from './Addtraining'
import addTraining from './Addtraining'


export default function Customerlist() {
    const [customers, setCustomers] = React.useState([]);
    const [msg, setMsg] = React.useState('');
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        getCustomers();
    }, []);

    const getCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json())
            .then(responseData => setCustomers(responseData.content))
            .catch(err => console.error(err))
    }

    const deleteCustomer = (link) => {
        if (window.confirm('Are you sure?')) {
            fetch(link, { method: 'DELETE' })
                .then(_ => getCustomers())
                .then(_ => {
                    console.log(link)
                    console.log(customers)
                    setOpen(true);
                    setMsg('Customer deleted');
                })
                .catch(err => console.error(err))
        }
    }

    const editCustomer = (link, customer) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        }
        )
            .then(_ => getCustomers())
            .then(_ => {
                setMsg('Customer info edited');
                setOpen(true);
            })
            .catch(err => console.error(err))
    }

    const handleClose = () => {
        setOpen(false);
    }

    const addCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(customer)
            }
        )
            .then(_ => getCustomers())
            .then(_ => {
                setMsg('New customer added');
                setOpen(true);
            })
            .catch(err => console.error(err))
    }

    const columns = [
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
        },
        {
            Cell: row => (<IconButton color="secondary" size="small" onClick={() => deleteCustomer(row.original.links[0].href)}><DeleteIcon />Delete</IconButton>)//props.customer.links.href
        },
        {
            Cell: row => (<EditCustomer customer={row.original} editCustomer={editCustomer}/>)
        },
        {
            Cell: row => (<Addtraining customer={row.original} addTraining={addTraining}/>)
        }
    ]
    
    return (
        <div>
            <AddCustomer addCustomer={addCustomer} />
            <ReactTable defaultPageSize={15} filterable={true}
                data={customers} columns={columns} />
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