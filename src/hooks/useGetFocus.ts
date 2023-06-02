import { FocusType } from "@app/types";
import { useMindset } from "@app/providers/MindsetProvider";
import { useRoute } from "@react-navigation/native";

export function useGetFocus() {
	const {
		params: { focusId },
	} = useRoute();

	const { getFocus } = useMindset();

	const focus = getFocus(focusId);

	return focus;
}
