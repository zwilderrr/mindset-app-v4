import { FocusType } from "types";
import { useMindset } from "@app/providers/IntentionProvider";
import { useRoute } from "@react-navigation/native";

export function useGetFocus(): FocusType {
	const {
		params: { focusId },
	} = useRoute();

	console.log({ focusId });

	const { focuses } = useMindset();
	const focus = focuses.find(f => f.id === focusId);

	if (!focus) {
		throw new Error(`No focus found with id of ${focusId}`);
	}

	return focus;
}
