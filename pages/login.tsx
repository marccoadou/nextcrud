import React, { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useLazyQuery } from "@apollo/client";
import { LOGIN_VALID } from "../lib/apolloRequest";
import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "../lib/UserContext";
import Link from "next/link";

export default function Login({}) {
	const router = useRouter();
	const [validateLogin, { data, loading, error }] = useLazyQuery(LOGIN_VALID);
	const { state, dispatch } = useContext(UserContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const handleSubmit = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		validateLogin({ variables: { email, password } });
		dispatch({ type: "EMAIL", value: email });
	};
	const changeEmail = (e) => {
		setEmail(e.target.value);
	};

	const changePassword = (e) => {
		setPassword(e.target.value);
	};

	if (data?.validateLogin) {
		router.push("/profile");
	}
	console.log(`error : ${error}`);
	return (
		<main className="container">
			<h1>Sign in</h1>
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
				<Button variant="primary" type="submit">
					Submit
				</Button>
				<h5>
					{loading ? (
						<div>
							<Spinner animation="border" role="status">
								<span className="visually-hidden">Loading...</span>
							</Spinner>
							"We're checking for you"
						</div>
					) : (
						""
					)}
				</h5>
				<h5 className="error">
					{data?.validateLogin === false
						? "There has been an error with your credentials, please check them again"
						: ""}
				</h5>
			</Form>
			<Button
				variant="info"
				onClick={() => {
					router.push("/register");
				}}>
				Register here
			</Button>
		</main>
	);
}
