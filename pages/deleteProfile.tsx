import { useMutation } from "@apollo/client";
import router, { useRouter } from "next/router";
import React, { useState } from "react";
import { useContext } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { REMOVE_USER } from "../lib/apolloRequest";
import { UserContext } from "../lib/UserContext";

export default function DeleteProfile() {
	const router = useRouter();
	const { state } = useContext(UserContext);
	const [deleteUser, { data, loading }] = useMutation(REMOVE_USER);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const handleSubmit = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		if (email === state.email) {
			deleteUser({ variables: { email, password } });
			router.push("/register");
		}
	};
	const changeEmail = (e) => {
		setEmail(e.target.value);
	};

	const changePassword = (e) => {
		setPassword(e.target.value);
	};

	return (
		<main className="container">
			<h1>Delete your profile </h1>
			<Form onSubmit={handleSubmit}>
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
				<Button variant="danger" type="submit">
					Delete profile
				</Button>
			</Form>
		</main>
	);
}
