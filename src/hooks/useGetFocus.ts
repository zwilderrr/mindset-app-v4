import { useEffect, useState } from "react";

import { useMindset } from "@app/providers/MindsetProvider";
import { useRoute } from "@react-navigation/native";

/**
 * Rendering and editing the focus from storage directly is slow and janky.
 * This hook allows for state to manage the Focus (making it fast and not janky),
 * while also updating the storage on each change.
 */
export function useFocus() {
	const {
		params: { focusId },
	} = useRoute();

	const { getFocus } = useMindset();

	const focusFromStorage = getFocus(focusId);

	const [focus, setFocus] = useState(focusFromStorage);

	useEffect(() => {
		setFocus(focusFromStorage);
	}, [JSON.stringify(focusFromStorage)]);

	return { focus, setFocus };
}
