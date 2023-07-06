import { Modal as RNUIModal, Text, View } from "react-native-ui-lib";

import { SafeAreaView } from "react-native";

type ModalProps = {
	title: string;
	doneLabel?: string;
	cancelLabel?: string;
	modalOpen: boolean;
	onCancel: () => void;
	onDone: () => void;
	children: React.ReactNode;
};

export function Modal({
	title,
	doneLabel = "Done",
	cancelLabel = "Cancel",
	modalOpen,
	onCancel,
	onDone,
	children,
}: ModalProps) {
	return (
		<RNUIModal visible={modalOpen} animationType="slide">
			<SafeAreaView>
				<RNUIModal.TopBar
					title={title}
					doneLabel={doneLabel}
					cancelLabel={cancelLabel}
					cancelIcon={null}
					onCancel={onCancel}
					onDone={onDone}
				/>
			</SafeAreaView>

			<View paddingL-16 paddingR-16 height="100%">
				{children}
			</View>
		</RNUIModal>
	);
}
