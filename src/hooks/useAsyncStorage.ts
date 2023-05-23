import { useCallback, useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export function useAsyncStorage<T>(
	key: string,
	defaultValue: T
): [T, (nextValue: T) => Promise<void>] {
	const [value, setValue] = useState(defaultValue);
	const [updated, setUpdated] = useState(false);

	useFocusEffect(
		useCallback(() => {
			getStorageValue();
		}, [])
	);

	useEffect(() => {
		if (!updated) {
			getStorageValue();
		}
	}, [updated]);

	async function getStorageValue() {
		let nextValue = defaultValue;
		const fromStorage = await AsyncStorage.getItem(key);
		if (fromStorage) {
			nextValue = JSON.parse(fromStorage);
		}
		setValue(nextValue);
		setUpdated(true);
	}

	async function setStorageValue(nextValue: T) {
		await AsyncStorage.setItem(key, JSON.stringify(nextValue));
		setUpdated(false);
	}

	return [value, setStorageValue];
}
