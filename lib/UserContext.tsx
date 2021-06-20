import { createContext, useContext } from "react";
export type UserContextContent = {
	state: {
		email: string;
	};
	dispatch: React.Dispatch<UserContextContent | unknown>;
};
export const UserContext = createContext<UserContextContent>({
	state: {
		email: "",
	},
	dispatch: () => {},
});

export const useUserContext = () => useContext(UserContext);
