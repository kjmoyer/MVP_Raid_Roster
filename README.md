# MVP_Raid_Roster
```diff
-Overview:
```
This raid roster application for World of Warcraft: Wrath of the Lich King allows a user to create users, add them to Guild Member and Non-Guild Member lists, add these characters to a raid roster of up to 25 characters, and keep track of what buffs and debuffs these specs will provide to the raid.

```diff
-Navigation:
```
Sign In Button: Allows a user to create a new guild, or sign in to an existing guild profile. The server uses a Bcrypt hashing function to provide password security. Upon signing, in existing characters for the guild will be displayed.

Swap List: Swaps the currently shown list between 'Guild Members' and 'Non-Guild Members'.

Add New Char/ Edit Char/ Delete Char Buttons: Modify the list of characters stored for the given guild. A character must be selected to use the edit/delete buttons else an error prompt will be displayed

Toggle Off Spec icons: toggle the current character between their main class spec and off spec.

Select Character: Clicking an item in the list will select that character at their current spec as ready to add to the raid.

Add to Raid Roster: Adds the currently selected character to the roster, making their name be visible in the raid roster below, and updating all current buffs and debuffs they provide.

Click 'X' on current character: removes that character from the raid roster, and updates buffs and debuffs to reflect any changed values.

Buffs/Debuffs columns: displays current buffs / debuffs provided to the raid based on raid composition with check marks or crosses.

Hover single buff/debuff: A tooltip displays which classes provide the highlighted buff or debuff to make filling missing values easy.

Raid Stats: Displays data on key raid comp metrics such as number of tanks/healers/interrupts etc.

Hover Raid stats: Displays which character names fulfill these roles.


![Alt Text](https://media.giphy.com/media/p7Hgtn7wdo3EKb53xx/giphy.gif)
