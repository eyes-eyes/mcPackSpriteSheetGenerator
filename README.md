#     mcPackSpriteSheetGenerator
This is a github page to a website that will automatically merge Minecraft resource pack files into serveral big sprite sheets.
Check the out the link: https://eyes-eyes.github.io/mcPackSpriteSheetGenerator/

## MUST used zipped folder

## Known issues
If a zipped folder says "This Folder is Empty" then it will not work!

## How to use Search
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

The carrot character ("^") shows results inside a directory (folder) containing the name.
For example (pack format 1 or known as 1.8.9):
> ^block

results in all the textures inside the _block folder_.
