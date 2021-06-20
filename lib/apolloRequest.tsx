import { gql } from "@apollo/client";

export const GET_USER_INFO = gql`
	query getUser($email: String!) {
		getUser(email: $email) {
			id
			firstName
			lastName
			email
		}
	}
`;

export const REGISTER_USER = gql`
	mutation registerUser(
		$firstName: String!
		$lastName: String!
		$email: String!
		$password: String!
	) {
		register(firstName: $firstName, lastName: $lastName, email: $email, password: $password)
	}
`;

export const UPDATE_USER = gql`
	mutation updateUser(
		$email: String!
		$newFirstName: String!
		$newLastName: String!
		$newEmail: String!
		$password: String!
	) {
		updateUser(
			email: $email
			newFirstName: $newFirstName
			newLastName: $newLastName
			newEmail: $newEmail
			password: $password
		) {
			firstName
			lastName
			email
		}
	}
`;

export const LOGIN_VALID = gql`
	query validateLogin($email: String!, $password: String!) {
		validateLogin(email: $email, password: $password)
	}
`;

export const REMOVE_USER = gql`
	mutation removeUser($email: String!, $password: String!) {
		removeUser(email: $email, password: $password)
	}
`;
