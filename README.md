#     mcPackSpriteSheetGenerator
This is a github page to a website that will automatically merge Minecraft resource pack files into several big sprite sheets.
Check the out the link: https://eyes-eyes.github.io/mcPackSpriteSheetGenerator/

# Credits
Teamed up with davidawesome on discord (still has not been paid) (I told him I would XD) (:D)

Portions of this software are copyright of their respective authors and released under the MIT license:
Copyright - 2023 Pradeepsaranbishnoi (Pradeep Saran)
Copyright - 2023 Yaya12085 (Yaya Mohamed)
Copyright - 2023 r7chardgh (Richard Tsang)
Copyright - 2023 Galahhad (Galahad)
Copyright - 2023 cssbuttons-io (cssbuttons.io)
Copyright - 2023 vinodjangid07 (Vinod )
Copyright - 2023 SteveBloX (SteveBloX)  



## MUST used zipped folder

## Known issues
If a zipped folder says "This Folder is Empty" then it will not work!

# How to use Search
_Remember not to confuse file names with game names!_

To get all minecraft items do
> ^minecraft ^item ^!gui

### Anti-search
The exclamation mark ("!") is an **anti-search**. Results containing the word after a exclamation mark will **NOT** be shown.
For example (pack format 1 or known as 1.8.9):
> diamond !ore

results in
- diamond_block
- horse_armor_diamond
- diamond
- diamond_axe
- diamond_boots
- diamond_chestplate
- diamond_helmet
- diamond_hoe
- diamond horse _armor
- diamond_leggings
- diamond pickaxe
- diamond_shovel
- diamond sword

### Directory search
The carrot character ("^") shows results inside a directory (folder) containing the name.
For example (pack format 1 or known as 1.8.9):
> ^block

results in all the textures inside the _block folder_.

### Advanced search
Now you can use this in conjunction with each other like this:
> ^block diamond

results in 
- diamond_block
- diamond_ore

