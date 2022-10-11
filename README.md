# MVP_Raid_Roster

Overview:
This raid roster application for World of Warcraft: Wrath of the Lich King allows a user to create users, add them to Guild Member and Non-Guild Member lists, add these characters to a raid roster of up to 25 characters, and keep track of what buffs and debuffs these specs will provide to the raid.

Navigation:
Add New Character Button: brings up a modal form to enter new character information to be added to the database and character lists.

Swap List: Swaps the currently shown list between 'Guild Members' and 'Non-Guild Members'.

Toggle Off Spec icons: toggle the current character between their main class spec and off spec.

Select Character: Clicking an item in the list will select that character at their current spec as ready to add to the raid.

Add to Raid Roster: Adds the currently selected character to the roster, making their name be visible in the raid roster below, and updating all current buffs and debuffs they provide.

Click 'X' on current character: removes that character from the raid roster, and updates buffs and debuffs to reflect any changed values.

Buffs/Debuffs columns: displays current buffs / debuffs provided to the raid based on raid composition with check marks or crosses.

Hover single buff/debuff: A tooltip displays which classes provide the highlighted buff or debuff to make filling missing values easy.


Planned improvements:
Optimize for mobile by making sure that the buffs/debuffs do not overlap the raid roster components when the screen size is reduced.

Edit/Delete Char buttons: edit information or delete character altogether from a list/database.

Implement user credentials and authentication to allow multiple views with specific guild and non-guild lists.

Add other cooldowns by the buff/debuff section with count (such as innervate, and BattleRez).

Add a component listing the # of tanks, healers, ranged DPS, and melee dps chars in Raid.

Update tooltip for active buffs: changes from what classes could provide this to what chars are currently providing this.

![Alt Text](https://giphy.com/embed/p7Hgtn7wdo3EKb53xx" width="480" height="304" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/p7Hgtn7wdo3EKb53xx)
