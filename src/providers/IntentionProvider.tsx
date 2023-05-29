import * as API from "../API";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { FocusType } from "../../types";

type MindsetContextType = {
	focuses: FocusType[];
};

const MindsetContext = createContext<undefined | MindsetContextType>(undefined);

export function useMindset() {
	const value = useContext(MindsetContext);
	if (value === undefined) {
		throw new Error(
			"useIntention must be accessed within the IntentionContext"
		);
	}

	return value;
}

export function MindsetProvider({ children }: { children: JSX.Element[] }) {
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

	const value = useMemo(() => ({ focuses }), [focuses]);

	return (
		<MindsetContext.Provider value={value}>{children}</MindsetContext.Provider>
	);
}
