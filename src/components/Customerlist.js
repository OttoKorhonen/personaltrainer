import React from 'react';
import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'
import SettingsIcon from '@material-ui/icons/Settings';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditCustomer from './EditCustomer';



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
                    setOpen(true);
                    setMsg('Customer deleted');
                })
                .catch(err => console.error(err))
        }
    }

    const editCustomer =(link, customer) =>{
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(customer)
        }
        )
        .then(_ => getCustomers())
        .then(_ =>{
            setMsg('New customer added');
            setOpen(true);
        })
        .catch(err => console.error(err))
        }

    const handleClose = () => {
        setOpen(false);
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
            Cell: row => (<IconButton color="secondary" size="small" onClick={() => deleteCustomer(row.original.links.href)}><DeleteIcon /></IconButton>)
        },
        {
            Cell: row => (<IconButton onClick={()=> EditCustomer} color="primary" size="small">
                <SettingsIcon />
            </IconButton>)
        },
        {
            Cell: row => (<IconButton color="primary" size="small">
                <AddIcon />
            </IconButton>)
        }
    ]

    return (
        <div>
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