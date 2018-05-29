import React, { Component } from 'react';

import { Card, CardContent, Button, TextField } from '@material-ui/core';

class CreateCustomer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			form: false,
			firstName: '',
			lastName: '',
			email: '',
			phone: ''
		};
	}

	async createCustomer() {

		const rawResponse = await fetch('http://localhost:8080/customer/', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ 
				FirstName: this.state.firstName, 
				LastName: this.state.lastName,
				Email: this.state.email,
				Phone: this.state.phone
			})
		});

		if (rawResponse.status !== 200) {
			console.log('Customer Create failed');
		} else {
			this.setState({
				firstName: '',
				lastName: '',
				email: '',
				phone: ''
			});
		}
	}

	toggleForm = () => {
		if (this.state.form) {
			this.createCustomer();
		}

		this.setState({ form: !this.state.form });
	}

	handleTextFieldChange = (event) => {
		this.setState({ [event.target.id]: event.target.value });
	}

	render() {

		if (this.state.form) {
			return (
				<div>
					<Card style={{ width: '512px', margin: 'auto' }}>
						<CardContent>
							<TextField
								id="firstName"
								label="First Name"
								value={this.state.firstName}
								onChange={this.handleTextFieldChange}
								fullWidth
							/>

							<TextField
								id="lastName"
								label="Last Name"
								value={this.state.lastName}
								onChange={this.handleTextFieldChange}
								style={{ marginTop: '15px' }}
								fullWidth
							/>

							<TextField
								id="email"
								label="Email"
								value={this.state.email}
								onChange={this.handleTextFieldChange}
								style={{ marginTop: '15px' }}
								fullWidth
							/>

							<TextField
								id="phone"
								label="Phone"
								value={this.state.phone}
								onChange={this.handleTextFieldChange}
								style={{ marginTop: '15px' }}
								fullWidth
							/>

							<Button
								style={{ marginTop: '20px' }}
								onClick={this.toggleForm}
							>
								Cancel
							</Button>

							<Button
								style={{ marginTop: '20px' }}
								variant="raised"
            					color="primary"
								onClick={this.toggleForm}
							>
								Save
							</Button>
						</CardContent>
					</Card>
				</div>
			);
		} else {
			return (
				<div style={{ width: '512px', margin: 'auto' }}>
					<Button
						onClick={this.toggleForm}
						variant="raised"
						color="primary"
						fullWidth
						
					>
						Create New Customer
					</Button>
				</div>
			);
		}
	}
}

export default CreateCustomer;
