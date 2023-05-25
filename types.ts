export type FocusType = {
	id: string;
	title: string;
	color: string;

	mindsets: Mindset[];

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
	// if one active day has passed without the user activating a Mindset, the currentStreak resets to 0
	currentStreak: number;
	bestStreak: number;
	// how many times over the life of a Focus that a Mindset has been activated.
	mindsetActivations: number;
	// number of times over the life of a Focus that it's been activated.
	focusActivations: number;

	// whether confetti shows when toggling on a Mindset
	showConfetti: boolean;
	// whether or not to notify the user when a Focus goes inactive
	notify: boolean;
};

export type Mindset = {
	id: string;
	title: string;
	emoji?: string;
	notes?: string;
	// the state the Mindset resets to. Most Mindsets default to Off, but negative Mindsets, like "impatient", default to *On*, requiring a user to turn them off
	defaultOn: boolean;
	currentOn: boolean;
};
