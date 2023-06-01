import AsyncStorage from "@react-native-async-storage/async-storage";
import { FocusType } from "./types";

const FOCUS_ORDER = "focusOrder";

async function getItem<T>(key: string): Promise<T | null> {
	const item = await AsyncStorage.getItem(key);
	if (item === null) {
		if (key === FOCUS_ORDER) {
			await setItem(FOCUS_ORDER, []);
			return [] as T;
		}
		throw new Error(`No value in storage exists for the "${key}" key.`);
	}
	return JSON.parse(item);
}

async function getMulti<T>(keys: string[]): Promise<T[]> {
	const items = await AsyncStorage.multiGet(keys);
	const obj = Object.fromEntries(items);
	return keys.map(k => {
		const val = obj[k];
		if (val === null) {
			throw new Error(`No value in storage exists for the "${k}" key.`);
		}
		return JSON.parse(val);
	});
}

async function setItem<T>(key: string, val: T) {
	await AsyncStorage.setItem(key, JSON.stringify(val));
}

async function removeItem(key: string) {
	await AsyncStorage.removeItem(key);
}

async function getFocusOrder() {
	const focusOrder = await getItem<string[]>(FOCUS_ORDER);
	return focusOrder || [];
}
export async function setFocusOrder(focusOrder: string[]) {
	await setItem("focusOrder", focusOrder);
}

export async function getFocuses() {
	const focusOrder = await getFocusOrder();
	return getMulti<FocusType>(focusOrder);
}

export async function setFocus(focus: FocusType) {
	await setItem<FocusType>(focus.id, focus);
}
