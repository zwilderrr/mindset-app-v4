import * as API from "../API";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { FocusType } from "../../types";
import { SEED_DATA } from "@app/seedData";

type MindsetContextType = {
	focuses: FocusType[];
	addFocus: (focus: FocusType) => Promise<void>;
	seedData: () => Promise<void>;
	clearData: () => Promise<void>;
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

	async function addFocus(focus: FocusType) {
		setUpdated(false);
		await API.setFocus(focus);
	}

	// utils

	async function seedData() {
		await clearData();
		const focusOrder = [];
		for (const focus of SEED_DATA) {
			focusOrder.push(focus.id);
			await API.setFocus(focus);
		}
		await API.setFocusOrder(focusOrder);
	}

	async function clearData() {
		const keys = await AsyncStorage.getAllKeys();
		if (keys) {
			// for (const k of keys) {
			// 	await cancelPushNotification(k);
			// }
			await AsyncStorage.multiRemove(keys);
		}
	}

	const value = useMemo(
		() => ({ focuses, addFocus, seedData, clearData }),
		[focuses, addFocus, seedData, clearData]
	);

	return (
		<MindsetContext.Provider value={value}>{children}</MindsetContext.Provider>
	);
}
