import { FocusType } from "types";
import { useMindset } from "@app/providers/IntentionProvider";
import { useRoute } from "@react-navigation/native";

export function useGetFocus(id?: string): FocusType {
	const {
		params: { focusId },
	} = useRoute();

	const { focuses } = useMindset();
	const focus = focuses.find(f => f.id === id || focusId);

	if (!focus) {
		throw new Error(`No focus found with id of ${focusId}`);
	}

	return focus;
}
