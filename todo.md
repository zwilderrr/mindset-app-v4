[v4]

### ideas

toggling on a mindset makes a bar increase. when they are all toggled on, then the confetti bursts

[v3]

### Currently

- install app, show me some examples, add FA, freezes when clicking "done".
- when showing confetti
- when clicking "done" after adding a focus area
- when clicking on a focus area

if i really want to rearchitect things, remove MindsetProvider and make fixed routes for Homescreen and FocusArea screen. Then each screen loads the data it needs based on the params passed in and updates the title. That will reduce rerenders and makes sure all screens exist. (consider expo navigation).

I've tested it with confetti disabled, and it's frozen when clicking 'done', so it's not just the confetti. I think we have to try rearchitecting.

The logic around adding/closing a modal should be revisited, bc there are some holdouts from when i was handling the ability to save a draft. Also i wonder if the modal logic is off and the component is trying to access an undefined property. definitely freezing on this step. problem is i can't recreate it locally.

a - build a better error catcher

draggable flatlist - clicking "edit" renders a draggable list. otherwise, just show a flatlist. or just avoid the whole thing and make a non-collapsing header?

### P0

- [ ] needed for launch

  - [x] app intro slider
  - [x] update content to provide direction

- [x] sample data - make emojis JSON '"😊"'
- [x] clicking on the focus should open the edit modal
- [x] route to mindset after creating it so user can immediately create focuses
- [x] Notifications when a Mindset expires

  - [x] write a setBadgeCount function that is triggered in different places and returns the proper count (instead of increasing badge count in some places and decreasing in others)
  - [x] background

- [x] Reset focus area after 1159am, reset bestStreak after a day of inactivity

- [ ] bugs

  - [ ] confetti doesn't explode after each toggle (the issue is that faExpired isn't based on state, it's based on props, so as soon as any other mindsets update, faExpired is false. need to track it locally)
  - [x] emoji background color
  - [x] FAB moves a bit on scroll

  - [x] floating action button prevents search bar from collapsing
  - [x] can't delete a focus from the focus modal
  - [x] double counting mindsets when i go back to the home screen as a mindset is ending
  - [x] currentOn doesn't toggle off when a mindset becomes inactive, so if a mindset went inactive, any Focuses that appeared "off" will all appear on once one gets turned on
  - [x] creating a Focus with an emoji shows the emoji even though the Focus is inactive
  - [x] increasing fa count past target makes the whole thing go black.

- [x] fix search filtering
- [x] count logic

  - [x] check logic to increase/decrease best streak when changing goal target (search bestStreakDelta)
  - [x] check that completing fa's past a mindset's target doesn't increase bestStreak

- [x] mindset card style. don't push things. just use flex to balance it.
- [x] progress bar

  - [x] should decrease according to how much is left of the mindset's duration
  - [x] shouldn't reset if the focus isn't inactive
  - [x] styling

- [x] background fill ratio should increase according to completed / target, so that when target is reached, background is full
- [x] goals

  - [x] call checkShouldResetCount in whatever event handler gets called when the app is reopened
  - [x] checkShouldResetCount needs to account for week periods as well.

- [x] content changes

  - [x] Hint text on input fields to guide the user
  - [x] "Resets to on" content
  - [x] explain reset interval
  - [x] change Focus Area -> Mindset, and Mindset -> Focus

- [x] add a counter on the Mindset card that increments when they set any Focus
- [x] when resetting count or focuses, alert that the user can confirm changes by clicking done, or cancel
- [x] Padding around Blank Mindset screen shows "Show me how it's done" and "I want to try myself" buttons
- [x] refactor reset focuses and reset mindets
- [x] reset data flow
- [x] modal
  - [x] disabled the modal done button until there are changes.
  - [x] make header sticky
  - [x] refactor
  - [x] reset Focuses button
  - [x] Delete Mindset/Focus buttons
  - [x] emoji toggle
- [x] Focus emojis flash the hex value on click and drag, and just change to hex value on click with no drag
- [x] change the X to a blue 'cancel', and make the 'done' blue text
- [x] swipe to delete
- [x] swipe to edit settings
- [x] hit slop area
- [x] press and hold to reorder

### P1

- [ ] View all from main screen
  - [ ] Make the right chevron thicker, and on click, it should expand the Mindset and show the Focuses
    - [ ] Focuses that are active are black (with the emoji?); inactive ones are gray
- [ ] refactor draggable swappable to take a dynamic type T
- [ ] change variable naming
- [ ] settings object to prevent alerting a user after first seeing reset alerts
- [ ] user determines how many times X they want to activate a mindset over a period Y. the backround fill reduces according to the time remaining in Y. a mindset lasts, by default, X / Y, but can reset at any interval Z so that Z \* X <= Y. When an interval is over, a reminder is set, and/or the badge count increases. The count on the FA card reads N/X, and when N === X, it stays filled. Move the "reset focuses" to the FocusAreaScreen. Clicking it should no longer decrement the count. Make 'recieve notifications' and 'increase badge count' optional.

### P1

- [ ] stats

### MVP

- [x] search bar
- [x] 'when updated' confetti should fire for all toggles until navigating out
- [x] search bar collapse
- [x] update icon grid width
- [x] blank screen
  - [x] "No focus areas. Tap to create one or add a starter set
  - [x] "No Mindsets. Tap to create one now!"
  - [x] debug black background
- [x] changing the reset interval while FA is active. issue is that the fa view doesn't update.
  - [x] doesn't reset color bar
  - [x] countdown doesn't reset
  - [x] when inactive, turns the other fa background black
- [x] resets text color
- [x] creating a new mindset shows active emoji
- [x] clear mindset emoji
  - [x] increase count per row
- [x] "resets in" text
- [x] set description to empty string
- [x] search
- [x] mindsets are resetting
- [x] confetti and display logic
- [x] reset interval to infinity in seed data isn't auto selecting in FAModal
- [x] save draft mindset
- [x] reset interval logic (1)
  - [x] update data structure to expire a FA
  - [x] logic to display mindset according to expired FA
  - [x] ensure set action isn't done as an effect
- [x] add colors
- [x] reset interval selections
- [x] decide on modal header style
- [x] collapsing heading bug
- [x] haptic feedback for color and interval selection
- [x] text overflow
- [x] ant haptic wrapper
- [x] reorder mindsets
- [x] buttons for add/edit fa
- [x] dim fa text when editing
- [x] figure out Add button - where and what
- [x] figure out why reorderFA isn't updating
- [x] figure out why deleteFA isn't updating
- [x] haptic wrapper so all interactions result in feedback
- [x] modal styling
- [x] field labels
- [x] reset all button
- [x] wrap app in provider
- [x] large title removes extra space on scroll
