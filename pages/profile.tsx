import { Button, Spinner } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { GET_USER_INFO } from "../lib/apolloRequest";
import React, { useContext, useState } from "react";
import EditProfile from "../components/EditProfile";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { UserContext } from "../lib/UserContext";

export default function Profile() {
	const router = useRouter();
	const { state, dispatch } = useContext(UserContext);
	const { data, loading, error } = useQuery(GET_USER_INFO, {
		variables: { email: state.email },
		pollInterval: 5000,
	});

	useEffect(() => {
		if (state.email === "") {
			router.push("/login");
		}
	});
	const [isEditing, setIsEditing] = useState(false);

	if (loading) {
		return (
			<>
				<Spinner animation="border" role="status">
					<span className="visually-hidden">Loading...</span>
				</Spinner>
			</>
		);
	}
	if (error) {
		return <>Error </>;
	}
	return (
		<main className="container">
			<Button
				variant="danger"
				onClick={() => {
					dispatch({ type: "EMAIL", value: "" });
					router.push("/login");
				}}>
				Disconnect
			</Button>
			<h1>Welcome home {data?.getUser.firstName}</h1>
			{isEditing ? (
				<>
					<EditProfile
						email={data?.getUser.email}
						firstName={data?.getUser.firstName}
						lastName={data?.getUser.lastName}
						setIsEditing={setIsEditing}
					/>
				</>
			) : (
				<>
					<h4>{data?.getUser.firstName}</h4>
					<h4>{data?.getUser.lastName}</h4>
					<h4>{data?.getUser.email}</h4>
				</>
			)}
			<Button
				variant={isEditing ? "danger" : "info"}
				onClick={() => {
					setIsEditing(!isEditing);
				}}>
				{isEditing ? "Cancel" : "Edit Profile"}
			</Button>
			<Button
				variant="danger"
				onClick={() => {
					router.push("/deleteProfile");
				}}>
				Delete Profile
			</Button>
		</main>
	);
}
