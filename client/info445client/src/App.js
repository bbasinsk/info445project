import React, { Component } from 'react';
import './App.css';

import { AppBar, Toolbar, Typography, Button, TextField } from '@material-ui/core';
import CustomerResult from './CustomerResult';
import CreateCustomer from './CreateCustomer';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      customerTextField: '',
      customerList: [],
    };
  }

  searchCustomers = () => {
    let query = this.state.customerTextField;

    fetch('http://localhost:8080/customer/' + query) // Call the fetch function passing the url of the API as a parameter
      .then((resp) => resp.json()) // Transform the data into json
      .then((customers) => {
        this.setState({ customerList: customers });
      })
      .catch((error) => console.log(error));
  }

  handleTextFieldChange = (event) => {
    this.setState({ customerTextField: event.target.value });
  }


  render() {

    const divStyle = {
      padding: '0px 20px',
      display: 'flex',
      'justifyContent': 'flex-end',
      marginBottom: '20px'
    };

    const buttonStyle = {
      "height": "20px",
      "alignSelf": "flex-end",
      'marginLeft': '10px',
      'marginBottom': '5px',
    }

    return (
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Customers
          </Typography>
          </Toolbar>
        </AppBar>

        <div style={divStyle}>
          <TextField
            id="name"
            label="Search Customer"
            value={this.state.customerTextField}
            placeholder="Name, Email, or Phone"
            onChange={this.handleTextFieldChange}
            fullWidth
            margin="normal"
          />

          <Button
            variant="raised"
            color="primary"
            style={buttonStyle}
            onClick={this.searchCustomers}
          >
            Search
          </Button>
        </div>

        <CreateCustomer />

        <div style={{ padding: '20px', textAlign: 'left' }}>
          
          {this.state.customerList.map(customer => {

            return <CustomerResult
              key={customer.CustomerID}
              customerID={customer.CustomerID}
              firstName={customer.CustomerFName}
              lastName={customer.CustomerLName}
              email={customer.Email}
              phone={customer.PhoneNumber}
              cardClick={this.searchTransactions}
            />
          })}

        </div>

      </div>
    );
  }
}

export default App;
