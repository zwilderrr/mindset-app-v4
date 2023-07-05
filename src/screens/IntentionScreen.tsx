import { ActionBar, Text } from "react-native-ui-lib";
import { useEffect, useRef, useState } from "react";

import { Intention } from "@app/components/Intention";
import { IntentionType } from "@app/types";
import { Keyboard } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useGetFocus } from "@app/hooks/useGetFocus";
import { useMindset } from "@app/providers/MindsetProvider";

const drag = require("@app/assets/drag.png");

export default function IntentionScreen() {
	const focusFromStorage = useGetFocus();
	const [editing, setEditing] = useState<IntentionType | undefined>();
	const idRef = useRef("");
	const [focus, setFocus] = useState(focusFromStorage);

	const { addIntention, updateFocus } = useMindset();

	useEffect(() => {
		const keyboardDidHideListener = Keyboard.addListener(
			"keyboardDidHide",
			() => {
				setEditing(undefined);
			}
		);

		return () => {
			keyboardDidHideListener.remove();
		};
	}, []);

	useEffect(() => {
		updateFocus(focus);
	}, [JSON.stringify(focus)]);

	function handleOnPressIn(intention: IntentionType) {
		idRef.current = intention.id;
		setEditing(intention);
	}

	function handlePressAdd() {
		addIntention(focusFromStorage);
	}

	return (
		<>
			<Text>{focusFromStorage.title}</Text>
			<KeyboardAwareScrollView contentInsetAdjustmentBehavior="automatic">
				{focus.intentions.map((intention, idx) => {
					const isEditing = intention.id === editing?.id;
					return (
						<Intention
							key={intention.id}
							intention={intention}
							idx={idx}
							isEditing={isEditing}
							disableSwitch={Boolean(editing)}
							handleOnPressIn={handleOnPressIn}
							setFocus={setFocus}
						/>
					);
				})}
			</KeyboardAwareScrollView>

			<ActionBar
				actions={[
					{
						label: "Add",
						iconSource: drag,
						iconStyle: { height: 26, resizeMode: "contain" },
						onPress: handlePressAdd,
					},
					{ label: "" },
				]}
			/>
		</>
	);
}
