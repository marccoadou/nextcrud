import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../lib/apolloRequest";
import { useRouter } from "next/router";

export default function Register({}) {
	const router = useRouter();
	const [registerUser] = useMutation(REGISTER_USER);
	const [name, setName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const changeName = (e) => {
		setName(e.target.value);
	};
	const changeLastName = (e) => {
		setLastName(e.target.value);
	};
	const changeEmail = (e) => {
		setEmail(e.target.value);
	};
	const changePassword = (e) => {
		setPassword(e.target.value);
	};
	const changeConfirmPassword = (e) => {
		setConfirmPassword(e.target.value);
	};

	const submitForm = (e) => {
		e.preventDefault();
		registerUser({ variables: { email, password, firstName: name, lastName } }).then((response) => {
			if (response.data.register === true) {
				router.push("/login");
			} else {
				// setErrorMessage(response.data.register);
			}

			// response.data.register == true we link to login page.
			// false we print error message
		});
	};
	return (
		<main className="container">
			<h1>Register on my awesome website!</h1>
			<Form onSubmit={submitForm}>
				<Form.Group controlId="formBasicName">
					<Form.Label>First Name</Form.Label>
					<Form.Control type="Name" placeholder="Name" value={name} onChange={changeName} />
				</Form.Group>
				<Form.Group controlId="formBasicLastName">
					<Form.Label>Last Name</Form.Label>
					<Form.Control
						type="LastName"
						placeholder="Last name"
						value={lastName}
						onChange={changeLastName}
					/>
				</Form.Group>
				<Form.Group controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter email"
						value={email}
						onChange={changeEmail}
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
					Register
				</Button>
			</Form>
			<Button
				variant="info"
				onClick={() => {
					router.push("/login");
				}}>
				Login here
			</Button>
		</main>
	);
}
