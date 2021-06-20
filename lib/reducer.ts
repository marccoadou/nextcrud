import { State } from "../pages/_app";

export default function reducer(state: State, action: { type: any; value: any }) {
	switch (action.type) {
		case "EMAIL":
			return { email: action.value };
			break;
		default:
			return state;
			break;
	}
}
