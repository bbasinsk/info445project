import React, { Component } from 'react';

import { Typography, Card, CardContent, Button, TextField } from '@material-ui/core';

class CustomerResult extends Component {
	constructor(props) {
		super(props);
		this.state = {
			edit: false
		};
	}

	componentDidMount() {
		this.setState({
			firstName: this.props.firstName,
			lastName: this.props.lastName,
			email: this.props.email,
			phone: this.props.phone
		});
	}

	async updateCustomer() {
		let customerID = this.props.customerID;
		console.log(customerID)

		const rawResponse = await fetch('http://localhost:8080/customer/' + customerID, {
			method: 'PUT',
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
			console.log('Update failed');
		}
	}

	editBox = (customerID) => {
		if (this.state.edit) {
			this.updateCustomer();
		}

		this.setState({ edit: !this.state.edit });
	}

	handleTextFieldChange = (event) => {
		this.setState({ [event.target.id]: event.target.value });
	}

	render() {

		if (this.state.edit) {
			return (
				<div>
					<Card style={{ marginBottom: '20px' }}>
						<CardContent>
							<TextField
								id="firstName"
								label="First Name"
								value={this.state.firstName}
								onChange={this.handleTextFieldChange}
							/>

							<TextField
								id="lastName"
								label="Last Name"
								value={this.state.lastName}
								onChange={this.handleTextFieldChange}
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
								onClick={this.editBox}
							>
								Save
							</Button>
						</CardContent>
					</Card>
				</div>
			);
		} else {
			return (
				<div>
					<Card style={{ marginBottom: '20px' }}>
						<CardContent>
							<Typography variant="headline">
								{this.state.firstName + " " + this.state.lastName}
							</Typography>
							<Typography variant="subheading" color='textSecondary'>
								{this.state.email}
							</Typography>
							<Typography variant="subheading" color='textSecondary'>
								{this.state.phone}
							</Typography>

							<Button
								style={{ marginTop: '20px' }}
								onClick={this.editBox}
							>
								Edit
							</Button>
						</CardContent>
					</Card>
				</div>
			);
		}
	}
}

export default CustomerResult;
