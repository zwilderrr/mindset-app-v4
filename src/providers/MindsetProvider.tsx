import * as API from "../API";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { FocusType } from "../../types";

const MindsetContext = createContext<undefined | {}>(undefined);

export function useMindset() {
	const value = useContext(MindsetContext);
	if (value === undefined) {
		throw new Error("useMindset must be accessed within the MindsetContext");
	}

	return value;
}

export function MindsetProvider({ children }: { children: JSX.Element }) {
	const [focuses, setFocuses] = useState<FocusType[]>([]);
	const [updated, setUpdated] = useState(false);

	useEffect(() => {
		if (!updated) {
			loadFocuses();
		}
	}, [updated]);

	async function loadFocuses() {
		setUpdated(false);
		const focuses = await API.getFocuses();
		setFocuses(focuses);
		setUpdated(true);
	}

	function getFocus(id: string) {
		const focus = focuses.find(f => f.id === id);
		if (!focus) {
			throw new Error(`No focus found with id of ${id}`);
		}
		return focus;
	}

	const value = useMemo(() => ({ focuses, getFocus }), [focuses, getFocus]);

	return (
		<MindsetContext.Provider value={value}>{children}</MindsetContext.Provider>
	);
}
