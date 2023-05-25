import AsyncStorage from "@react-native-async-storage/async-storage";
import { FocusType } from "../types";

function uuidv4() {
	return Math.ceil(Math.random() * 1000000000000000).toString();
}

async function getItem<T>(key: string): Promise<T | null> {
	const item = await AsyncStorage.getItem(key);
	if (item === null) {
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
	const focusOrder = await getItem<string[]>("focusOrder");
	return focusOrder || [];
}

export async function getFocuses() {
	const focusOrder = await getFocusOrder();
	return getMulti<FocusType>(focusOrder);
}
