import * as API from "../API";

import { FocusType, IntentionType } from "@app/types";
import { baseFocus, baseIntention } from "@app/dataUtils";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { SEED_DATA } from "@app/seedData";

type MindsetContextType = {
	focuses: FocusType[];
	addFocus: () => Promise<void>;
	getFocus: (focusId: string) => FocusType;
	updateFocus: (focus: FocusType) => Promise<void>;
	addIntention: (focus: FocusType) => Promise<void>;
	seedData: () => Promise<void>;
	clearData: () => Promise<void>;
};

const MindsetContext = createContext<undefined | MindsetContextType>(undefined);

export function useMindset() {
	const value = useContext(MindsetContext);
	if (value === undefined) {
		throw new Error("useMindset must be accessed within the MindsetContext");
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

	/** Focuses */
	async function loadFocuses() {
		const focuses = await API.getFocuses();
		setFocuses(focuses);
		setUpdated(true);
	}

	function getFocus(focusId: string): FocusType {
		const focus = focuses.find(f => f.id === focusId);

		if (!focus) {
			throw new Error(`No focus found with id of ${focusId}`);
		}

		return focus;
	}

	async function updateFocus(nextFocus: FocusType) {
		await API.updateFocus(nextFocus);
		setUpdated(false);
	}

	async function addFocus(focus: FocusType) {
		await API.addFocus(focus);
		setUpdated(false);
	}

	/** Intentions */
	async function addIntention(focus: FocusType) {
		focus.intentions.push(baseIntention());
		await API.updateFocus(focus);
		setUpdated(false);
	}

	/** utils */

	async function clearData(shouldUpdate = true) {
		const keys = await AsyncStorage.getAllKeys();
		if (keys) {
			// todo - cancel push notifications
			await AsyncStorage.multiRemove(keys);
		}
		if (shouldUpdate) {
			setUpdated(false);
		}
	}

	async function seedData() {
		await clearData(false);
		const focusOrder = [];
		for (const focus of SEED_DATA) {
			focusOrder.push(focus.id);
			await API.updateFocus(focus);
		}
		await API.updateFocusOrder(focusOrder);
		setUpdated(false);
	}

	const value = {
		focuses,
		addFocus,
		getFocus,
		addIntention,
		seedData,
		clearData,
		updateFocus,
	};

	return (
		<MindsetContext.Provider value={value}>{children}</MindsetContext.Provider>
	);
}
