import React from 'react';
import MaterialTable from 'material-table';

export default function MaterialTableCustomerlist() {
    const[customers, setCustomers] = React.useState([]);

    React.useEffect(()=>{
        getCustomers();
    }, []);

    const getCustomers = () =>{
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setCustomers(data))
        .catch(err => console.error(err))
    }

    const columns = [
      { title: 'Firstname', field: 'firstname' },
      { title: 'Lastname', field: 'lastname' },
      { title: 'Address', field: 'streetaddress'},
      { title: 'Post code', field: 'postcode'},
      { title: 'City', field: 'city'},
      { title: 'Email', field: 'email'},
      { title: 'Phone', field: 'phone'},
      {
        title: 'Date', field: 'date',
        title: 'Duration', field: 'duration',
        title: 'Activity', field: 'activity'

      }
    ]
    

  return (
    <MaterialTable
      title="Customer list"
      columns={columns}
      data={customers}s
    />
  );
}