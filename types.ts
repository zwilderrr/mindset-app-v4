export type FocusType = {
	id: string;
	title: string;
	color: string;

	intentions: IntentionType[];

	// part of day the user wants to be notified
	activeStart: number;
	activeEnd: number;
	activeDays: number[];
	// most recent day a user hit his goals. used to determine the current streak
	lastCompletedDay: number;

	// how many times a day a user wants to activate a Focus
	target: number;
	// how many times a user has activated a Focus
	activations: number;
	// if one active day has passed without the user activating an Intention, the currentStreak resets to 0
	currentStreak: number;
	bestStreak: number;
	// how many times over the life of a Focus that an Intention has been activated.
	intentionActivations: number;
	// number of times over the life of a Focus that it's been activated.
	focusActivations: number;

	// whether confetti shows when toggling on a Intention
	showConfetti: boolean;
	// whether or not to notify the user when a Focus goes inactive
	notify: boolean;
};

export type IntentionType = {
	id: string;
	title: string;
	emoji?: string;
	notes?: string;
	// the state the Intention resets to. Most Intentions default to Off, but negative Intentions, like "impatient", default to *On*, requiring a user to turn them off
	defaultOn: boolean;
	currentOn: boolean;
};
