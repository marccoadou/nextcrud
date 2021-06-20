import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../lib/apolloRequest";
import { UserContext } from "../lib/UserContext";

export default function EditProfile({ email, firstName, lastName, setIsEditing }) {
	const { state, dispatch } = useContext(UserContext);
	const [updateUser, { data, loading }] = useMutation(UPDATE_USER);
	const [newEmail, setNewEmail] = useState(email);
	const [newFirstName, setNewFirstName] = useState(firstName);
	const [newLastName, setNewLastName] = useState(lastName);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const submitForm = (e) => {
		e.preventDefault();
		updateUser({ variables: { email: email, newEmail, newFirstName, newLastName, password } });
	};

	useEffect(() => {
		if (data?.updateUser.email) {
			dispatch({ type: "EMAIL", value: data.updateUser.email });
			setIsEditing(false);
		}
	});
	const changeNewFirstName = (e) => {
		setNewFirstName(e.target.value);
	};
	const changeNewLastName = (e) => {
		setNewLastName(e.target.value);
	};
	const changeNewEmail = (e) => {
		setNewEmail(e.target.value);
	};
	const changePassword = (e) => {
		setPassword(e.target.value);
	};
	const changeConfirmPassword = (e) => {
		setConfirmPassword(e.target.value);
	};

	return (
		<>
			<main className="container">
				<Form onSubmit={submitForm}>
					<Form.Group controlId="formBasicName">
						<Form.Label>First Name</Form.Label>
						<Form.Control
							type="Name"
							placeholder="Name"
							value={newFirstName}
							onChange={changeNewFirstName}
						/>
					</Form.Group>
					<Form.Group controlId="formBasicLastName">
						<Form.Label>Last Name</Form.Label>
						<Form.Control
							type="LastName"
							placeholder="Last name"
							value={newLastName}
							onChange={changeNewLastName}
						/>
					</Form.Group>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control
							type="email"
							placeholder="Enter email"
							value={newEmail}
							onChange={changeNewEmail}
						/>
					</Form.Group>
					<Form.Group controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Password"
							value={password}
							onChange={changePassword}
						/>
					</Form.Group>
					<Form.Group controlId="formBasicConfirmPassword">
						<Form.Label>Confirm your password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Confirm Password"
							value={confirmPassword}
							onChange={changeConfirmPassword}
						/>
					</Form.Group>
					<Button
						variant="primary"
						type="submit"
						disabled={password && password === confirmPassword ? false : true}>
						Submit your changes
					</Button>
				</Form>
				{data?.updateUser.email}
				{loading ? (
					<div>
						"we're running it"
						<Spinner animation="border" role="status">
							<span className="visually-hidden">Loading...</span>
						</Spinner>
					</div>
				) : (
					""
				)}
				{data?.updateUser === false ? "there has been an error, please check your credentials" : ""}
			</main>
		</>
	);
}
