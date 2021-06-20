import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink, from } from "@apollo/client";
import { CookiesProvider } from "react-cookie";
import { useReducer } from "react";
import reducer from "../lib/reducer";
import { UserContext } from "../lib/UserContext";
import React from "react";
const link = from([new HttpLink({ uri: "http://localhost:4000" })]);
const client = new ApolloClient({
	connectToDevTools: true,
	cache: new InMemoryCache({
		addTypename: true,
	}),
	link: link,
});

export interface State {
	email: string;
}

function MyApp({ Component, pageProps }) {
	const [state, dispatch] = useReducer(reducer, { email: "" });

	return (
		<UserContext.Provider value={{ state, dispatch }}>
			<CookiesProvider>
				<ApolloProvider client={client}>
					<Component {...pageProps} />
				</ApolloProvider>
			</CookiesProvider>
		</UserContext.Provider>
	);
}

export default MyApp;
