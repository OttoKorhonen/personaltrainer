import React from 'react';
import MaterialTable from 'material-table';

export default function MaterialTableCustomerlist() {
    const[customers, setCustomers] = React.useState([]);

    React.useEffect(()=>{
        getCustomers();
    }, []);

    const getCustomers = () =>{
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

  const [state, setState] = React.useState({
    columns: [
      { title: 'Firstname', field: 'firstname' },
      { title: 'Lastname', field: 'lastname' },
      { title: 'Address', field: 'streetaddress'},
      { title: 'Post code', field: 'postcode'},
      { title: 'City', field: 'city'},
      { title: 'Email', field: 'email'},
      { title: 'Phone', field: 'phone'},
      {
          title: 'date',
          field: 'duration',
          activity: 'activity',
          //lookup: {},
      },
    ],
    data: [
      { firstname: '',
       lastname: '', 
       streetaddress: '', 
       postcode: '', 
       city: '', 
       email: '', 
       phone: ''},
      
    ],
  });

  return (
    <MaterialTable
      title="Customer list"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );
}