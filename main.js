function error_occurred(err, file, line, col, error) {
    alert(
        `${line}:${col}\nError occurred :(, we don't know what type but heres the trace for us, please send!\n\n${error.stack.toString()}`
    );
}

window.addEventListener("error", error_occurred);
window.addEventListener("unhandledrejection", error_occurred);

let file_object_raw = null;
let file_object_zip = null;
let zip_path_objects = {};
let zip_orig_path_objects = [];
let pack_mcmeta_data = {};
let pack_version = 0;
let pagination = 0;

const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const modal = document.getElementById("canvasModal");

search_selected_items = [];
last_user_inputStringThing = "";

//Constants
const version_codes = {
    1: ["1.6.1", "1.8.9"],
    2: ["1.9", "1.10.2"],
    3: ["1.11", "1.12.2"],
    4: ["1.13", "1.14.4"],
    5: ["1.15", "1.16.1"],
    6: ["1.16.2", "1.16.5"],
    7: ["1.17", "1.17.1"],
    8: ["1.18", "1.18.2"],
    9: ["1.19", "1.19.2"],
    10: ["1.19", "1.19.2"],
    11: ["1.19.2", "1.19.2"],
    12: ["1.19.3", "1.19.3"],
    13: ["1.19.4", "1.19.4"],
    14: ["1.19.4", "1.19.4"],
    15: ["1.20", "1.20.1"],
    16: ["1.20", "1.20.1"],
    17: ["1.20", "1.20.1"],
    18: ["1.20.2", "1.20.2"],
    19: ["1.21", "1.21"],
};

//Constants
const color_codes = {
    0: ["#000000"],
    1: ["#0000AA"],
    2: ["#00AA00"],
    3: ["#00AAAA"],
    4: ["#AA0000"],
    5: ["#AA00AA"],
    6: ["#FFAA00"],
    7: ["#AAAAAA"],
    8: ["#555555"],
    9: ["#5555FF"],
    a: ["#55FF55"],
    b: ["#55FFFF"],
    c: ["#FF5555"],
    d: ["#FF55FF"],
    e: ["#FFFF55"],
    f: ["#FFFFFF"],
};

let cached_java_mc_groups_list = {};

const java_mc_groups = {
    /*

    woodVariants: [[[],[]],"type":"single_line","direction":"horizontal"]
    woodVariants: [[[],[]],"type":"single_line","direction":"horizontal"]

    "single"



    */

    woodVariants: {
        "^minecraft": {
            "^block !troll ^!entity": {
                "!door": {
                    "oak !dark": null,
                    spruce: null,
                    birch: null,
                    jungle: null,
                    acacia: null,
                    "dark oak": null,
                    mangrove: null,
                    cherry: null,
                },
            },
        },
    },
    signs: {
        "^minecraft ^item !troll ^!entity ^!block sign": null,
    },

    doors: {
        "^minecraft": {
            "^block !tip": {
                door: {
                    upper: null,
                    lower: null,
                    top: null,
                    bottom: null,
                    "": null, //the whole list now other than aboves parts should be selected
                },
            },
        },
    },
    doorItems: {
        "^minecraft": {
            "^item !tip": {
                door: {
                    "": null, //the whole list now other than aboves parts should be selected
                },
            },
        },
    },
    stones: {
        "^minecraft": {
            "^block": {
                "!slab": {
                    granite: null,
                    diorite: null,
                    andesite: null,
                    sandstone: null,
                    obsidian: null,
                    blackstone: null,
                    "stone !redstone !grindstone !lodestone !sword !axe !shovel !hoe !pickaxe !stonecutter !glowstone !slab !dripstone":
                        null,
                },
            },
        },
    },
    statusEffects: { "^minecraft": { "^mob_effect": null } },
    sediments: {
        "^minecraft": {
            "^block": {
                "grass block !sea !tallgrass !tall !model": null,
                Mycelium: null,
                Podzol: null,
                dirt: null,
                farmland: null,
                gravel: null,
                "sand !sandstone !soul": null,
            },
        },
    },
    armors: {
        "^minecraft": {
            "^item": {
                "Leather Cap": null,
                "Leather helmet !overlay": null,
                "Chainmail Helmet": null,
                "Iron Helmet": null,
                "Gold Helmet": null,
                "Diamond Helmet": null,
                "Netherite Helmet": null,
                "Leather Tunic !overlay": null,
                "Leather chestplate !overlay": null,
                "Chainmail Chestplate": null,
                "Iron Chestplate": null,
                "gold Chestplate": null,
                "Diamond Chestplate": null,
                "Netherite Chestplate": null,
                "Leather Pants": null,
                "Leather Leggings !overlay": null,
                "Chainmail Leggings": null,
                "Iron Leggings": null,
                "gold Leggings": null,
                "Diamond Leggings": null,
                "Netherite Leggings": null,
                "Leather Boots !overlay": null,
                "Chainmail Boots": null,
                "Iron Boots": null,
                "gold Boots": null,
                "Diamond Boots": null,
                "Netherite Boots": null,
                "Leather Horse Armor": null,
                "Iron Horse Armor": null,
                "gold Horse Armor": null,
                "Diamond Horse Armor": null,
                "Turtle Helmet": null,
            },
        },
    },
    toolsets: {
        "^minecraft": {
            "^item": {
                "Wood Sword": null,
                "Stone Sword": null,
                "Iron Sword": null,
                "gold Sword": null,
                "Diamond Sword": null,
                "Netherite Sword": null,
                "Wood Pickaxe": null,
                "Stone Pickaxe": null,
                "Iron Pickaxe": null,
                "gold Pickaxe": null,
                "Diamond Pickaxe": null,
                "Netherite Pickaxe": null,
                "Wood Axe !pick !pick": null,
                "Stone Axe !pick": null,
                "Iron Axe !pick": null,
                "gold Axe !pick": null,
                "Diamond Axe !pick": null,
                "Netherite Axe !pick": null,
                "Wood Shovel": null,
                "Stone Shovel": null,
                "Iron Shovel": null,
                "gold Shovel": null,
                "Diamond Shovel": null,
                "Netherite Shovel": null,
                "Wood Hoe": null,
                "Stone Hoe": null,
                "Iron Hoe": null,
                "gold Hoe": null,
                "Diamond Hoe": null,
                "Netherite Hoe": null,
            },
        },
    },
    foods: {
        "^minecraft": {
            "^item !model": {
                "Cooked Beef": null,
                "Cooked Salmon": null,
                Steak: null,
                "Tropical Fish": null,
                "Raw Chicken": null,
                pufferfish: null,
                "melon slice !glister": null,
                "melon slice glister": null,
                "Cooked Chicken": null,
                Apple: null,
                "Mushroom Stew": null,
                "Raw Mutton": null,
                "gold Apple": null,
                "Baked Potato": null,
                "Cooked Mutton": null,
                "Beetroot !seed": null,
                "Poisonous Potato": null,
                "Raw Porkchop": null,
                "Beetroot Soup": null,
                "Pumpkin Pie": null,
                "Cooked Porkchop": null,
                Bread: null,
                "Rabbit Stew": null,
                "Rabbit !hide !foot !stew": null,
                "Chorus Fruit": null,
                "Rotten Flesh": null,
                "Cook Rabbit": null,
                Cookie: null,
                "Spider Eye": null,
                "Raw Cod": null,
                "Dried Kelp": null,
                "Suspicious Stew": null,
                "Cooked Cod": null,
                "carrot !stick": null,
                "Raw Salmon": null,
                "Honey Bottle": null,
            },
        },
    },

    ores: {
        "^minecraft": {
            "^block": {
                "Coal Ore !deepslate": null,
                "Iron Ore !deepslate": null,
                "Gold Ore !deepslate": null,
                "Redstone Ore !torch !deepslate": null,
                "Lapis Ore !deepslate": null,
                "Emerald Ore !deepslate": null,
                "Diamond Ore !deepslate": null,
                "Copper Ore !deepslate": null,
                "Deepslate Coal Ore": null,
                "Deepslate Iron Ore": null,
                "Deepslate Gold Ore": null,
                "Deepslate Redstone Ore": null,
                "Deepslate Lapis Ore": null,
                "Deepslate Emerald Ore": null,
                "Deepslate Diamond Ore": null,
                "Deepslate Copper Ore": null,
                "Nether Gold Ore": null,
                "Quartz Ore": null,
                "Ancient Debris": null,
                "Block coal": null,
                "Block Iron !raw": null,
                "Block Gold !raw": null,
                "Block Redstone": null,
                "Block Lapis": null,
                "Block Emerald": null,
                "Block Diamond": null,
                "Block Netherite": null,
                "Block Copper": null,
                "raw iron block": null,
                "raw gold block": null,
                "raw copper block": null,
            },
        },
    },

    minerals: {
        "^minecraft": {
            "^item": {
                "emerald !empty": null,
                "diamond !sword !shovel !axe !pickaxe !hoe !armor !helmet !chestplate !leggings !boots !empty":
                    null,
                "copper ingot": null,
                "iron ingot": null,
                "iron nugget": null,
                "gold ingot": null,
                "gold nugget": null,
                "netherite ingot": null,
                "netherite scrap": null,
                "redstone !overlay !dot !line !empty !torch": null,
                "coal !block": null,
                "charcoal !block": null,
                "Lapis Lazuli !block !empty": null,
                "raw copper !block": null,
                "raw iron !block": null,
                "raw gold !block !berry": null,
                "quartz !block !empty": null,
            },
        },
    },

    balls: {
        "^minecraft": {
            "^item": {
                "ender pearl": null,
                "eye of ender": null,
                snowball: null,
                "slime ball": null,
                "egg !leggings !overlay !spawn": null,
                "magma cream": null,
                fireball: null,
                "fire charge !firework": null,
                "Heart Sea !model": null,
            },
        },
    },

    cropStages: {
        "^minecraft": {
            "^block": {
                "wheat stage": null,
                "carrot stage": null,
                "beetroot stage": null,
                "cocoa stage": null,
                "potatoes stage": null,
                "bamboo stage": null,
            },
        },
    },

    vehicles: {
        "^minecraft ^texture ^item ^!entity ": {
            Minecart: null,
            boat: null,
        },
    },
    rangedThings: {
        "^minecraft ^item": {
            "bow !cross !bowl": null,
            "arrow !crossbow": null,
            crossbow: null,
            "fishing rod": null,
            "carrot stick": null,
            "warped stick": null,
            trident: null,
            "firework rocket !overlay": null,
        },
    },
    utilityItems: {
        "^minecraft ^item": {
            "totem undy": null,
            "spyglass !model": null,
            "name tag": null,
            lead: null,
            saddle: null,
            "totem undy": null,
            "goat horn": null,
            bundle: null,
            shear: null,
            "flint and steel": null,
            elytra: null,
        },
    },
    // utilityBlocks: {
    //     "^minecraft ^texture ^block": {
    //         "craft table": {
    //             top: null,
    //             "": null,
    //         },
    //         "cartograph table": {
    //             top: null,
    //             "": null,
    //         },
    //         "fletch table": {
    //             top: null,
    //             "": null,
    //         },
    //         "smith table": {
    //             top: null,
    //             "": null,
    //         },
    //         "stonecut !saw": {
    //             top: null,
    //             "": null,
    //         },
    //         loom: {
    //             top: null,
    //             "": null,
    //         },
    //         "furnace !blast": {
    //             top: null,
    //             "": null,
    //         },
    //         "blast furnace": {
    //             top: null,
    //             "": null,
    //         },
    //         smoker: {
    //             top: null,
    //             "": null,
    //         },
    //     },
    // },
    musicDiscs: {
        "^minecraft ^item": {
            "music disc": null,
            record: null,
        },
    },
    shulkerBoxes: {
        "^minecraft": {
            "^block shulker box": {
                black: null,
                "blue !light": null,
                brown: null,
                cyan: null,
                "gray !light": null,
                green: null,
                "light blue": null,
                "light gray": null,
                lime: null,
                magenta: null,
                orange: null,
                pink: null,
                purple: null,
                red: null,
                white: null,
                yellow: null,
                "shulker box": null,
            },
        },
    },
    wools: { "^minecraft ^texture ^block wool": null },
    terracottas: {
        "^minecraft": {
            "^block terracotta": {
                black: null,
                "blue !light": null,
                brown: null,
                cyan: null,
                "gray !light": null,
                green: null,
                "light blue": null,
                "light gray": null,
                lime: null,
                magenta: null,
                orange: null,
                pink: null,
                purple: null,
                red: null,
                white: null,
                yellow: null,
                terracotta: null,
            },
        },
    },
    potterySherds: {
        "^minecraft ^item pottery": null,
    },
    smithingTemplates: {
        "^minecraft ^item ^!block": {
            "smith upgrade": null,
            "smith template": null,
        },
    },
    concretes: {
        "^minecraft": {
            "^block concrete": {
                black: null,
                "blue !light": null,
                brown: null,
                cyan: null,
                "gray !light": null,
                green: null,
                "light blue": null,
                "light gray": null,
                lime: null,
                magenta: null,
                orange: null,
                pink: null,
                purple: null,
                red: null,
                white: null,
                yellow: null,
            },
        },
    },
    materials: {
        "^minecraft ^texture ^item": {
            "amethyst shard": null,
            "blaze rod": null,
            "blaze powder": null,
            bone: null,
            clay: null,
            "disc frag": null,
            "dragon breath": null,
            "echo shard": null,
            feather: null,
            string: null,
            "flint !steel": null,
            "ghast tear": null,
            "glowstone dust": null,
            gunpowder: null,
            "sugar !cane": null,
            honeycomb: null,
            "ink !pink": null,
            shell: null,
            "nether star": null,
            "phantom membrane": null,
            "prismarine !wall": null,
            "rabbit hide !cook !stew": null,
            "rabbit foot !cook !stew": null,
            scute: null,
            book: null,
            "brick !wall !fence": null,
            "ferment spider eye": null,
            "firework star !overlay": null,
            "leather !overlay !helmet !": null,
            paper: null,
            // "goat horn": null,
        },
    },
    beds: {
        "^minecraft ^item bed !rock": null,
    },
    candles: {
        "^minecraft": {
            "^item candle": {
                black: null,
                "blue !light": null,
                brown: null,
                cyan: null,
                "gray !light": null,
                green: null,
                "light blue": null,
                "light gray": null,
                lime: null,
                magenta: null,
                orange: null,
                pink: null,
                purple: null,
                red: null,
                white: null,
                yellow: null,
                candle: null,
            },
        },
    },
    dyes: {
        "^minecraft ^item ^dye": null,
    },
    glasses: {
        "^minecraft": {
            "^block glass !pane": {
                black: null,
                "blue !light": null,
                brown: null,
                cyan: null,
                "gray !light": null,
                green: null,
                "light blue": null,
                "light gray": null,
                lime: null,
                magenta: null,
                orange: null,
                pink: null,
                purple: null,
                red: null,
                white: null,
                yellow: null,
                glass: null,
            },
        },
    },
    buckets: { "^minecraft ^item !model bucket": null },
};

document.onkeydown = function (evt) {
    const isNotCombinedKey = !(event.ctrlKey || event.altKey || event.shiftKey);
    evt = evt || window.event;
    var isEscape = false;
    var isSlash = false;
    if ("key" in evt) {
        isEscape = evt.key === "Escape" || evt.key === "Esc";
        isSlash = evt.key === "/";
    } else {
        isEscape = evt.keyCode === 27;
        isSlash = evt.keyCode === 191;
    }
    if (isEscape) {
        if (isNotCombinedKey) {
            back_button();
        }
    }
    if (isSlash) {
        if (isNotCombinedKey) {
            if (document.getElementById("searchTerm") !== document.activeElement) {
                document.getElementById("searchTerm").focus();
                evt.preventDefault();
            }
        }
    }
};

function back_button() {
    switch (pagination) {
        case 1:
            back_to_file_selector();
            document.getElementById("searchTerm").value = "";
            clear_selected();
            break;
        case 2:
            back_to_edit_page();
            document.getElementById("width_input_generate").value = "";
            closeModal();
            break;
        // back_to_file_selector()

        default:
            break;
    }
}

async function pack_data_parse() {
    mcmeta = zip_path_objects["pack.mcmeta"];
    if (mcmeta) {
        mcmeta_data = await read_file_to_str(mcmeta);
        try {
            packmcmeta_json = JSON.parse(mcmeta_data.replaceAll("\r", "").replaceAll("\n", ""));
        } catch (e) {
            console.log("error parsing json");
            return 1;
        }

        if (packmcmeta_json) {
            pack_version = packmcmeta_json?.["pack"]?.["pack_format"];
            if (!pack_version) {
                console.log("no pack format");
                return 1;
            }

            pack_mcmeta_data = packmcmeta_json;

            update_pack_version(pack_version);
        } else {
            console.log("json invalid");
            return 1;
        }
    } else {
        console.log("error opening file");
        return 1;
    }
}

function update_pack_version(pack_version) {
    pack_minecraft_version_names = version_codes[pack_version.toString()];
    if (!pack_minecraft_version_names) {
        pack_minecraft_version_names = ["Unknown", "Unknown"];
    }
    document.getElementById("pack_version_top_bar").innerText =
        "Pack version: " +
        pack_version +
        " (" +
        pack_minecraft_version_names[0] +
        "-" +
        pack_minecraft_version_names[1] +
        ")";
}

function zip_new_entry_handler(entries) {
    zip_path_objects = {};
    for (i in entries) {
        path_array = entries[i].filename.split("/");
        entries[i].short_name = get_just_file_name(entries[i]);
        entries[i].is_png = entries[i].filename.endsWith(".png");
        entries[i].is_hidden = entries[i].short_name.endsWith(".");
        entries[i].groups = [];

        // if (!get_just_file_name(entries[i]).startsWith("."))
        fillObjectAtDepth(zip_path_objects, entries[i], path_array);
    }
    zip_orig_path_objects = entries;

    pack_data_parse().then((o) => {
        if (o == 1) {
            error_invalid_pack("cant parse pack.mcmeta");
        }
    });

    //cached_java_mc_groups_list
    for (i in java_mc_groups) {
        console.log("starting group: " + i);
        let out = multi_level_search_group_init(zip_orig_path_objects, java_mc_groups[i]);
        cached_java_mc_groups_list[i] = out;
        for (o of out) {
            o.groups.push(i);
        }
    }
}

// BEFORE CALLING THIS PLEASE .filter for is_png true and is_hidden false
function multi_level_search_group(current_objs, group_obj) {
    let out = [];
    for (search in group_obj) {
        let search_sup_result = current_objs;
        for (search_section of search.toLowerCase().split(" ")) {
            search_sup_result = search_sup_result.filter(construct_function_for_search(search_section));
        }

        if (group_obj[search] == null) {
            out.push(...search_sup_result);
        } else {
            out.push(...multi_level_search_group(search_sup_result, group_obj[search]));
        }
    }

    return out;
}

function multi_level_search_group_init(current_objs, group_obj) {
    real_current_objs = current_objs.filter((a) => {
        return a.is_png && !a.is_hidden && !a.short_name.startsWith("._");
    });

    let out = multi_level_search_group(real_current_objs, group_obj);

    return Array.from(new Set(out)); // rm duplicates and reorder
}

function construct_function_for_search(search_term) {
    if (search_term.startsWith("^!")) {
        let real_search_term = search_term.slice(2);
        return (input) => {
            return !input.filename.includes(real_search_term);
        };
    } else if (search_term.startsWith("!")) {
        let real_search_term = search_term.slice(1);
        return (input) => {
            return !input.short_name.includes(real_search_term);
        };
    } else if (search_term.startsWith("^")) {
        let real_search_term = search_term.slice(1);
        return (input) => {
            return input.filename.includes(real_search_term);
        };
    } else {
        let real_search_term = search_term;
        return (input) => {
            return input.short_name.includes(real_search_term);
        };
    }
}

function handle_file(file) {
    pagination = 1;
    console.log(file);
    document.getElementById("file_hover_popup").style.display = "none";
    document.getElementById("main_file_selector_areas").style.display = "none";
    document.getElementById("main_site_data").style.display = "block";
    document.getElementById("edit_page").style.display = "block";
    document.getElementById("generate_page").style.display = "none";
    clear_selected();

    file_object_raw = file;

    console.log(file_object_raw.name.replace(".zip", ""));

    document.getElementById("pack_name_top_bar").innerHTML = minecraft_name_to_html(
        file_object_raw.name.replace(".zip", "").replace(/^[!\s]*/gm, "")
    ).innerHTML;

    file_object_zip = new zip.ZipReader(new zip.BlobReader(file));
    file_object_zip.getEntries().then(zip_new_entry_handler);
}

function back_to_file_selector() {
    pagination = 0;
    document.getElementById("main_file_selector_areas").style.display = "block";
    document.getElementById("main_site_data").style.display = "none";
    document.getElementById("pack_version_top_bar").innerText = "Pack version: (opening)";
    document.getElementById("pack_name_top_bar").innerText = "None";
    document.getElementById("edit_page").style.display = "none";
    document.getElementById("generate_page").style.display = "none";
}

function error_invalid_pack(message) {
    pack_invalid = 1;
    back_to_file_selector();
    alert("invalid pack:\r\n" + message);
}

//helper functions
const fillObjectAtDepth = (object, value, depthArray) => {
    let currentObj = object;

    for (let i = 0; i < depthArray.length - 1; i++) {
        const key = depthArray[i];
        if (!currentObj[key]) {
            currentObj[key] = {};
        }
        currentObj = currentObj[key];
    }

    // Set the value at the final depth
    currentObj[depthArray[depthArray.length - 1]] = value;
    return object;
};
const getObjectAtDepth = (object, depthArray) => {
    let currentObj = object;

    for (let i = 0; i < depthArray.length - 1; i++) {
        const key = depthArray[i];
        if (!currentObj[key]) {
            currentObj[key] = {};
        }
        currentObj = currentObj[key];
    }

    // Set the value at the final depth
    return currentObj[depthArray[depthArray.length - 1]];
};
function read_file_to_str(file) {
    return file.getData(
        // writer
        new zip.TextWriter(),
        // options
        {
            onprogress: (index, max) => {
                // onprogress callback
            },
        }
    );
}

function search_object_tree(root, search_value) {
    let output_array = [];
    for (i in root) {
        // console.log(i)

        //quick check if file
        if (typeof root[i].filename == typeof "") {
            // console.log(i)
            if (i.toString().includes(search_value)) {
                output_array.push(root[i]);
                console.log(i);
                // debugger;
            }
        } else {
            output_array.push(...search_object_tree(root[i], search_value));
        }
    }
    return output_array;
}

async function search_user_input(search_string) {
    last_user_inputStringThing = search_string;
    output = [];
    // search_array = search_string.split(" ");
    // for (i in zip_orig_path_objects) {
    //     current_name = get_just_file_name(zip_orig_path_objects[i]);
    //     current_long_name = zip_orig_path_objects[i].filename;
    //     if (
    //         current_name.endsWith(".png") &&
    //         !get_just_file_name(zip_orig_path_objects[i]).startsWith(".")
    //     ) {
    //         current_eligibility = true;
    //         for (o in search_array) {
    //             searched_level_path =
    //                 search_array[o][0] == "^" ? current_long_name : current_name;
    //             search_string_current =
    //                 search_array[o][0] == "^"
    //                     ? search_array[o].slice(1)
    //                     : search_array[o];
    //             if (search_string_current[0] == "!") {
    //                 if (searched_level_path.includes(search_string_current.slice(1))) {
    //                     current_eligibility = false;
    //                 }
    //             } else {
    //                 if (!searched_level_path.includes(search_string_current)) {
    //                     current_eligibility = false;
    //                 }
    //             }
    //         }
    //         if (current_eligibility) {
    //             output.push(zip_orig_path_objects[i]);
    //         }
    // }

    let search_sup_result = zip_orig_path_objects.filter((a) => {
        return a.is_png && !a.is_hidden && !a.short_name.startsWith("._");
    });
    for (search_section of search_string.toLowerCase().split(" ")) {
        search_sup_result = search_sup_result.filter(construct_function_for_search(search_section));
    }

    output = search_sup_result;

    search_results = document.getElementById("search_results");
    if (output.length == 0) {
        search_results.innerHTML = "<p>Nothing here!</p>";
    } else {
        search_results.innerHTML = "";
        for (i in output) {
            current_result_itter = document.createElement("div");
            current_result_itter.addEventListener("click", (e) => {
                let current_item_name_again = e.target.fill_obj;
                console.log(current_item_name_again);
                console.log(search_selected_items.includes(current_item_name_again));

                if (!e.target.getAttribute("checkd")) {
                    if (!search_selected_items.includes(current_item_name_again)) {
                        search_selected_items.unshift(current_item_name_again);
                    }
                } else {
                    search_selected_items = search_selected_items.filter(
                        (a) => a !== current_item_name_again
                    );
                }

                e.target.setAttribute("checkd", !e.target.getAttribute("checkd") ? "true" : "");

                generate_selected_textures_list();
            });
            current_result_itter.setAttribute("hover_text", output[i].filename);
            current_result_itter.innerText = output[i].short_name.replace(".png", "");
            current_result_itter.fill_obj = output[i];
            if (search_selected_items.includes(output[i])) {
                current_result_itter.setAttribute("checkd", "true");
            }
            search_results.appendChild(current_result_itter);
        }
    }
}

function get_just_file_name(fileobj) {
    fil_name = fileobj.filename;
    fil_name = fil_name ? fil_name : "";
    return fil_name.split("/").reverse()[0];
}

function generate_selected_textures_list() {
    search_results = document.getElementById("total_textures_input");
    if (search_selected_items.length == 0) {
        search_results.innerHTML = "<p>Nothing here!</p>";
    } else {
        search_results.innerHTML = "";
        for (i in search_selected_items) {
            current_result_itter = document.createElement("div");
            current_result_itter.addEventListener("click", (e) => {
                let current_item_name_again = e.target.fill_obj;
                console.log(current_item_name_again);
                console.log(search_selected_items.includes(current_item_name_again));

                if (!e.target.getAttribute("checkd")) {
                    if (!search_selected_items.includes(current_item_name_again)) {
                        search_selected_items.unshift(current_item_name_again);
                    }
                } else {
                    // search_selected_items.pop(current_item_name_again);
                    search_selected_items = search_selected_items.filter(
                        (a) => a !== current_item_name_again
                    );
                }

                e.target.setAttribute("checkd", !e.target.getAttribute("checkd") ? "true" : "");

                generate_selected_textures_list();
                search_user_input(last_user_inputStringThing);
            });
            // current_result_itter.setAttribute("checkd",true);
            current_result_itter.setAttribute("hover_text", search_selected_items[i].filename);
            current_result_itter.innerText = get_just_file_name(search_selected_items[i]).replace(".png", "");
            current_result_itter.fill_obj = search_selected_items[i];
            if (search_selected_items.includes(search_selected_items[i])) {
                current_result_itter.setAttribute("checkd", "true");
            }
            search_results.appendChild(current_result_itter);
        }
    }
    document.getElementById("counterTotal").innerText =
        "(" + search_selected_items.length + ") " + "Total Textures:";
}

function clear_selected() {
    search_selected_items = [];
    generate_selected_textures_list();
    search_user_input(last_user_inputStringThing);
    document.querySelectorAll(".switch > input[type=checkbox]").forEach(function (currentValue) {
        currentValue.checked = false;
    });
    document.getElementById("checkingGroups").checked = false;
    document.getElementById("counterTotal").innerText =
        "(" + search_selected_items.length + ") " + "Total Textures:";
}

//! group selection method
function group_selected(obj, dont_update_search) {
    // group_add_remove = java_mc_groups[obj.id];

    // output = [];
    // for (apple in group_add_remove) {
    //     search_string = group_add_remove[apple].toLowerCase();
    //     search_array = search_string.split(" ");
    //     for (i in zip_orig_path_objects) {
    //         current_name = get_just_file_name(zip_orig_path_objects[i]);
    //         current_long_name = zip_orig_path_objects[i].filename; //get_just_file_name(zip_orig_path_objects[i]);
    //         if (
    //             current_name.endsWith(".png") &&
    //             !get_just_file_name(zip_orig_path_objects[i]).startsWith(".")
    //         ) {
    //             current_eligibility = true;
    //             for (o in search_array) {
    //                 searched_level_path =
    //                     search_array[o][0] == "^"
    //                         ? current_long_name
    //                         : current_name;
    //                 search_string_current =
    //                     search_array[o][0] == "^"
    //                         ? search_array[o].slice(1)
    //                         : search_array[o];

    //                 if (search_string_current[0] == "!") {
    //                     if (
    //                         searched_level_path.includes(
    //                             search_string_current.slice(1)
    //                         )
    //                     ) {
    //                         current_eligibility = false;
    //                     }
    //                 } else {
    //                     if (
    //                         !searched_level_path.includes(search_string_current)
    //                     ) {
    //                         current_eligibility = false;
    //                     }
    //                 }
    //             }
    //             if (current_eligibility) {
    //                 output.push(zip_orig_path_objects[i]);
    //             }
    //         }
    //     }
    // }

    // output = group_search_collon_d(group_add_remove, zip_orig_path_objects);
    // output = multi_level_search_group_init(zip_orig_path_objects,group_add_remove);

    output = cached_java_mc_groups_list[obj.id] || [];

    // for (i in output) {
    //     if (obj.checked) {
    //         if (!search_selected_items.includes(output[i])) {
    //             search_selected_items.unshift(output[i]);
    //         }
    //     } else {
    //         search_selected_items = search_selected_items.filter(
    //             (a) => a !== output[i]
    //         );
    //     }
    // }

    if (obj.checked) {
        // for (i in output) {
        //     if (!search_selected_items.includes(output[i])) {
        //         search_selected_items.unshift(output[i]);
        //     }
        // }
        search_selected_items.unshift(...output);
        search_selected_items = Array.from(new Set(search_selected_items));
    } else {
        search_selected_items = search_selected_items.filter((a) => !output.includes(a));
    }

    if (!dont_update_search) {
        generate_selected_textures_list();
        search_user_input(last_user_inputStringThing);

        document.getElementById("counterTotal").innerText =
            "(" + search_selected_items.length + ") " + "Total Textures:";
    }

    // console.log(obj.id + (obj.checked ? " CHECKED" : " Unchecked"));
}

function group_search_collon_d(group_add_remove, obj_to_search) {
    output = [];
    for (apple in group_add_remove) {
        search_string = group_add_remove[apple].toLowerCase();
        search_array = search_string.split(" ");
        for (i in obj_to_search) {
            current_name = get_just_file_name(obj_to_search[i]);
            current_long_name = obj_to_search[i].filename; //get_just_file_name(zip_orig_path_objects[i]);
            if (current_name.endsWith(".png") && !get_just_file_name(obj_to_search[i]).startsWith(".")) {
                current_eligibility = true;
                for (o in search_array) {
                    searched_level_path = search_array[o][0] == "^" ? current_long_name : current_name;
                    search_string_current =
                        search_array[o][0] == "^" ? search_array[o].slice(1) : search_array[o];

                    if (search_string_current[0] == "!") {
                        if (searched_level_path.includes(search_string_current.slice(1))) {
                            current_eligibility = false;
                        }
                    } else {
                        if (!searched_level_path.includes(search_string_current)) {
                            current_eligibility = false;
                        }
                    }
                }
                if (current_eligibility) {
                    output.unshift(obj_to_search[i]);
                }
            }
        }
    }
    return output;
}

//Shows colors and removed codes in pack name

function minecraft_name_to_html(name) {
    default_settings = {
        color: "#fff",
        bold: false,
        italic: false,
        underline: false,
    };
    current_setting = default_settings;
    make_new_html_element_with_settings = (text, settings) => {
        current_element = document.createElement("span");
        current_element.style.fontWeight = settings.bold ? "bold" : "";
        current_element.style.color = settings.color;
        current_element.style.textDecoration = settings.underline ? "underline" : "";
        current_element.style.fontStyle = settings.italic ? "italic" : "";
        current_element.innerText = text;
        return current_element;
    };

    main_p = document.createElement("p");

    text_buffer = "";
    for (let i = 0; i < name.length; i++) {
        if (name[i] == "§") {
            main_p.appendChild(make_new_html_element_with_settings(text_buffer, current_setting));
            text_buffer = "";
            i += 1;
            if (color_codes[name[i]]) {
                current_setting.color = color_codes[name[i]];
            } else {
                switch (name[i]) {
                    case "l":
                        current_setting.bold = true;
                    case "n":
                        current_setting.underline = true;
                    case "o":
                        current_setting.italic = true;
                    case "r":
                        current_setting = default_settings;
                }
            }
        } else {
            text_buffer += name[i];
        }
    }

    main_p.appendChild(make_new_html_element_with_settings(text_buffer, current_setting));

    return main_p;
}
//helper function

function install_event_listeners() {
    window.addEventListener(
        "dragover",
        (ev) => {
            document.getElementById("file_hover_popup").style.display = "block";
            ev.preventDefault();
        },
        false
    );

    window.addEventListener(
        "dragleave",
        (ev) => {
            document.getElementById("file_hover_popup").style.display = "none";
            ev.preventDefault();
        },
        false
    );

    window.addEventListener(
        "drop",
        (ev) => {
            document.getElementById("file_hover_popup").style.display = "none";

            // Prevent default behavior (Prevent file from being opened)
            ev.preventDefault();

            if (pagination != 0) return;

            if (ev.dataTransfer.items) {
                // Use DataTransferItemList interface to access the file(s)
                [...ev.dataTransfer.items].forEach((item, i) => {
                    // If dropped items aren't files, reject them
                    if (item.kind === "file") {
                        const file = item.getAsFile();
                        // console.log(file);
                        if (file.type == "application/x-zip-compressed") handle_file(file);
                    }
                });
            } else {
                // Use DataTransfer interface to access the file(s)
                [...ev.dataTransfer.files].forEach((file, i) => {
                    handle_file(file);
                });
            }
        },
        false
    );

    document.getElementById("input_main_upload").addEventListener("change", () => {
        files = document.getElementById("input_main_upload").files;
        if (!!files[0]) {
            handle_file(files[0]);
        }

        document.getElementById("input_main_upload").value = "";
    });
}

// FUNCTION TO PROCEED TO DOWNLOAD PAGE
function proceed() {
    if (search_selected_items.length == 0) {
        return;
    } else {
        pagination = 2;
        document.getElementById("main_file_selector_areas").style.display = "none";
        document.getElementById("main_site_data").style.display = "block";
        document.getElementById("generate_page").style.display = "block";
        document.getElementById("edit_page").style.display = "none";

        document.getElementById("I_like_sharing_cat_loading").style.display = "block";

        generate_final_text_list();
        // .then(() => {
        //     generate_final_image();
        // });
    }
}
obj_group_locations = {};
generate_final_text_list_objs_processing = 0;
async function generate_final_text_list() {
    document.getElementById("out_canvas").width = 0;
    textures_list_final = search_selected_items;

    obj_group_locations = {};
    console.log("group starting");
    for (group_add_remove_index in java_mc_groups) {
        if (!document.getElementById(group_add_remove_index).checked) continue;

        // group_add_remove = java_mc_groups[group_add_remove_index];
        // objs_in_this_group = group_search_collon_d(group_add_remove, textures_list_final);

        // objs_in_this_group = multi_level_search_group_init(textures_list_final,group_add_remove)

        objs_in_this_group = cached_java_mc_groups_list[group_add_remove_index].filter((ind) => {
            return textures_list_final.includes(ind);
        });

        for (i of objs_in_this_group) {
            obj_group_locations[i.filename] = group_add_remove_index;
        }
    }
    console.log("group done");
    // console.log(obj_group_locations);

    upper_lower_array = [];

    final_textures_list = {};

    setup_processing_stage();
    for (i in textures_list_final) {
        // console.log("sending image")
        generate_final_text_list_objs_processing += 1;
        processing_stage.postMessage({
            request: "handle_new_image",
            index: i,
            blob: await textures_list_final[i].getData(new zip.BlobWriter()),
        });
    }

    // for (i in textures_list_final) {
    //     file_name_tmp = textures_list_final?.[i].filename;
    //     if (
    //         final_textures_list[obj_group_locations?.[file_name_tmp] || "UNDEF"] ==
    //         undefined
    //     ) {
    //         final_textures_list[obj_group_locations?.[file_name_tmp] || "UNDEF"] = [];
    //     }

    //     // if (file_name_tmp.endsWith("door_upper") || file_name_tmp.endsWith("door_top")) {upper_lower_array.push()}
    //     // (file_name_tmp.endsWith("door_lower") || file_name_tmp.endsWith("door_bottom"))

    //     img_bitmap_tmp = await createImageBitmap(

    //     );

    //     img_bitmap_tmp.file_obj = textures_list_final[i];

    //     img_bitmap_tmp.group_type = obj_group_locations?.[file_name_tmp] || "UNDEF"

    //     index_push =
    //         final_textures_list[obj_group_locations?.[file_name_tmp] || "UNDEF"].push(
    //             img_bitmap_tmp
    //         );

    //     // if () {upper_lower_array.push()}
    // }
    // for (obj_group_this_tmp in final_textures_list) {
    //     color_append_to_imaged(final_textures_list[obj_group_this_tmp]);
    // }
}
processing_stage = null;
function setup_processing_stage() {
    if (processing_stage) return;

    const blob_inline_js = new Blob(
        [document.getElementById("jsworker-inlinescript-processing_stage.js").innerText],
        { type: "text/javascript" }
    );

    processing_stage = new Worker(window.URL.createObjectURL(blob_inline_js));
    // processing_stage = new Worker("processing_stage.js");
    processing_stage.onmessage = (e) => {
        textures_list_final = search_selected_items;

        if (e.data["request"] == "handle_new_image") {
            // console.log(e);
            if (e.data["error"]) {
                alert(
                    "error while processing image:" +
                        textures_list_final?.[e?.data["index"]]?.filename +
                        "\n\n" +
                        e.data["error"]
                );
            }

            // console.log("processing_finished!")
            if (!e.data["error"]) {
                img_bitmap_tmp = e.data["data"];
                i = e.data["index"];
                img_bitmap_tmp.avg_color = e.data["color"];
                // console.log(e, i)
                file_name_tmp = textures_list_final?.[i].filename;
                if (final_textures_list[obj_group_locations?.[file_name_tmp] || "UNDEF"] == undefined) {
                    final_textures_list[obj_group_locations?.[file_name_tmp] || "UNDEF"] = [];
                }

                img_bitmap_tmp.file_obj = textures_list_final[i];

                img_bitmap_tmp.group_type = obj_group_locations?.[file_name_tmp] || "UNDEF";

                index_push =
                    final_textures_list[obj_group_locations?.[file_name_tmp] || "UNDEF"].push(img_bitmap_tmp);
            }

            generate_final_text_list_objs_processing -= 1;

            if (generate_final_text_list_objs_processing == 0) {
                document.getElementById("I_like_sharing_cat_loading").style.display = "none";
                generate_final_image();
            }
        }
    };
}

textures_offset_list_and_locations = { groups: {}, items: [] }; //[{"loc": [0,0,10,10],"path":null,"file_obj":null,"group":"asd"}]
// [{"loc":[],"group":""}]

let final_textures_list = {};
// ! generate final image function!!!
async function generate_final_image() {
    // console.log(final_textures_list);

    real_final_textures_list = (final_textures_list["UNDEF"] || []).slice();

    for (let i in final_textures_list) {
        if (i == "UNDEF") continue;
        // console.log(final_textures_list[i]);

        current_text_list = final_textures_list[i].slice();
        if (document.getElementById("deconstruct").checked) {
            real_final_textures_list.push(...current_text_list);
        } else {
            if (document.getElementById("sortInGroups").checked) {
                if (document.getElementById("option2").checked) {
                    current_text_list.sort((a, b) => {
                        return a.height - b.height;
                    });
                }

                if (document.getElementById("option1").checked) {
                    current_text_list.sort((a, b) => {
                        return a.avg_color[0] - b.avg_color[0];
                    });
                }
            }

            // if (document.getElementById("option1").checked) {

            // }

            group_texture_tmp = sort_and_draw_image(
                current_text_list,
                document.getElementById("width_input_generate").valueAsNumber || 0,
                true
            );

            textures_offset_list_and_locations["groups"][i] = group_texture_tmp[2];

            group_texture_tmp[0].group_name_ye = i;

            real_final_textures_list.push(group_texture_tmp[0]);
        }
    }

    // console.log(":D");
    // console.log(real_final_textures_list);

    if (document.getElementById("option2").checked) {
        real_final_textures_list.sort((a, b) => {
            return a.height - b.height;
        });
    }

    if (document.getElementById("option1").checked) {
        color_append_to_imaged(real_final_textures_list);
        real_final_textures_list.sort((a, b) => {
            return a.avg_color[0] - b.avg_color[0];
        });
    }

    out = sort_and_draw_image(
        real_final_textures_list,
        document.getElementById("width_input_generate").valueAsNumber || 0
    );

    textures_offset_list_and_locations["items"] = out[2];

    console.log((window.ffff = out));

    const canvas = document.getElementById("out_canvas");
    canvas.width = out[1][1];
    canvas.height = out[1][0];

    canvas.style.width = out[1][1] < out[1][0] ? "auto" : "100%";
    canvas.style.height = out[1][1] < out[1][0] ? "100%" : "auto";

    // canvas.height = canvas.width = Math.max(out[1][1], out[1][0]);

    const ctx = canvas.getContext("2d");
    ctx.drawImage(out[0], 0, 0);
}

function rgb2hsv(r, g, b) {
    let v = Math.max(r, g, b),
        c = v - Math.min(r, g, b);
    let h = c && (v == r ? (g - b) / c : v == g ? 2 + (b - r) / c : 4 + (r - g) / c);
    return [60 * (h < 0 ? h + 6 : h), v && c / v, v];
}

function color_append_to_imaged(images) {
    img_max_height = img_max_width = 16000;

    out = [];
    f = new OffscreenCanvas(img_max_width, img_max_height).getContext("2d", {
        willReadFrequently: true,
        alpha: true,
        antialias: false,
    });
    for (i in images) {
        if (images[i].avg_color) continue;
        obj = images[i];
        f.drawImage(obj, 0, 0);
        colors = [0, 0, 0];
        px_data = f.getImageData(0, 0, obj.width, obj.height).data;
        pixels_in_use = 0;
        for (color_ind = 0; color_ind < px_data.length; color_ind += 4) {
            if (px_data[color_ind + 3] == 0) continue;
            colors[0] += px_data[color_ind + 0];
            colors[1] += px_data[color_ind + 1];
            colors[2] += px_data[color_ind + 2];
            pixels_in_use += 1;
        }

        colors[0] /= pixels_in_use;
        colors[1] /= pixels_in_use;
        colors[2] /= pixels_in_use;
        // console.log(colors)
        images[i].avg_color = rgb2hsv(colors[0], colors[1], colors[2]);
    }
}

function sort_and_draw_image(image_array_in, width, add_color_data) {
    image_array = image_array_in.slice();

    if (document.getElementById("mergeStuff").checked) {
        combined_parts_included = {};

        for (let i in image_array) {
            obj_tmp = image_array[i];
            if (!obj_tmp.file_obj) continue;
            name_tmp = obj_tmp.file_obj.filename.replace(".png", "");
            door_upper =
                (name_tmp.endsWith("_upper") || name_tmp.endsWith("_top")) && name_tmp.includes("door");
            door_lower =
                (name_tmp.endsWith("_lower") || name_tmp.endsWith("_bottom")) && name_tmp.includes("door");
            if (door_upper || door_lower) {
                name_tmp_normalized = name_tmp
                    .replaceAll("_upper", "")
                    .replaceAll("_lower", "")
                    .replaceAll("_top", "")
                    .replaceAll("_bottom", "");
                opposite_part_name_tmp = name_tmp_normalized + (!door_upper ? "_TOP" : "_BOTTOM");
                current_parr_name_tmp = name_tmp_normalized + (door_upper ? "_TOP" : "_BOTTOM");

                opposite_part_index_tmp = combined_parts_included[opposite_part_name_tmp];
                if (opposite_part_index_tmp) {
                    opposite_part_obj_tmp = image_array[opposite_part_index_tmp];

                    let offscreen_merge_canvas = new OffscreenCanvas(
                        Math.max(opposite_part_obj_tmp.width, obj_tmp.width),
                        opposite_part_obj_tmp.height + obj_tmp.height
                    );
                    merge_ctx = offscreen_merge_canvas.getContext("2d", {
                        willReadFrequently: true,
                        alpha: true,
                        antialias: false,
                    });

                    if (door_upper) {
                        merge_ctx.drawImage(obj_tmp, 0, 0);
                        merge_ctx.drawImage(opposite_part_obj_tmp, 0, obj_tmp.height);
                    } else {
                        merge_ctx.drawImage(opposite_part_obj_tmp, 0, 0);
                        merge_ctx.drawImage(obj_tmp, 0, opposite_part_obj_tmp.height);
                    }

                    // image_array.splice(opposite_part_index_tmp, 1);
                    // image_array.splice(i, 1);
                    // remove both self and the other :D

                    opposite_part_obj_tmp.disabled = true;
                    obj_tmp.disabled = true;

                    tmp_out = offscreen_merge_canvas.transferToImageBitmap();
                    // tmp_out.filename

                    tmp_out.fake_file_name = name_tmp_normalized;
                    image_array.push(tmp_out);
                } else {
                    combined_parts_included[current_parr_name_tmp] = i;
                }
            }
        }
    } else {
        for (let i of image_array) i.disabled = false;
    }

    image_array = image_array.filter((a) => {
        return !a.disabled;
    });

    img_max_dimensions = [0, 0];
    img_area_needed = 0;
    img_min_dimensions = [9999999, 9999999];
    for (let i of image_array) {
        img_max_dimensions[0] = Math.max(img_max_dimensions[0], i.width);
        img_max_dimensions[1] = Math.max(img_max_dimensions[1], i.height);
        img_min_dimensions[0] = Math.min(img_min_dimensions[0], i.width);
        img_min_dimensions[1] = Math.min(img_min_dimensions[1], i.height);
        // console.log("sizes", img_max_dimensions, img_min_dimensions);
        img_area_needed += i.height * i.width;
    }

    if (width == 0) {
        width = Math.ceil(Math.sqrt(img_area_needed) / img_min_dimensions[0]) * img_min_dimensions[0];
        // console.log("Width2 " + width);
    }

    width = Math.max(width, img_max_dimensions[0]);
    // console.log("Width3 " + width);

    const offscreen = new OffscreenCanvas(width, 16384);
    const ctx = offscreen.getContext("2d", {
        willReadFrequently: true,
        alpha: true,
        antialias: false,
    });

    line_height_used_temp = 0;
    line_width_used_tmp = 0;
    line_offset_top = 0;

    placed_image_locations = []; // {"loc":[],img_dat:}

    for (image of image_array) {
        if (image.width > width - line_width_used_tmp) {
            line_offset_top += line_height_used_temp;
            line_width_used_tmp = 0;
            line_height_used_temp = 0;
            // continue;
        }

        ctx.drawImage(image, line_width_used_tmp, line_offset_top);

        placed_image_locations.push({
            loc: [line_width_used_tmp, line_offset_top, image.width, image.height],
            img: image,
        });

        line_height_used_temp = Math.max(line_height_used_temp, image.height);
        line_width_used_tmp += image.width;
    }
    line_offset_top += line_height_used_temp;

    tmp_canvas = new OffscreenCanvas(width, line_offset_top);

    tmp_ctx = tmp_canvas.getContext("2d", {
        willReadFrequently: true,
        alpha: true,
        antialias: false,
    });

    tmp_ctx.drawImage(offscreen, 0, 0);

    // console.log(placed_image_locations)

    out_bmp = tmp_canvas.transferToImageBitmap();

    if (add_color_data) {
        colors = [0, 0, 0];
        px_data = tmp_ctx.getImageData(0, 0, width, line_offset_top).data;
        pixels_in_use = 0;
        for (color_ind = 0; color_ind < px_data.length; color_ind += 4) {
            if (px_data[color_ind + 3] == 0) continue;
            colors[0] += px_data[color_ind + 0];
            colors[1] += px_data[color_ind + 1];
            colors[2] += px_data[color_ind + 2];
            pixels_in_use += 1;
        }

        colors[0] /= pixels_in_use;
        colors[1] /= pixels_in_use;
        colors[2] /= pixels_in_use;
        out_bmp.avg_color = rgb2hsv(colors[0], colors[1], colors[2]);
    }

    return [out_bmp, [line_offset_top, width], placed_image_locations];
}

function get_image_from_loc(x, y) {
    hovered_img = null;
    for (i of textures_offset_list_and_locations["items"]) {
        if (i.loc[0] <= x && i.loc[1] <= y && i.loc[0] + i.loc[2] > x && i.loc[1] + i.loc[3] > y) {
            hovered_img = i;
            break;
        }
    }

    if (hovered_img != null) {
        if (hovered_img.img.group_name_ye) {
            x -= hovered_img.loc[0];
            y -= hovered_img.loc[1];
            for (i of textures_offset_list_and_locations["groups"][hovered_img.img.group_name_ye]) {
                if (i.loc[0] <= x && i.loc[1] <= y && i.loc[0] + i.loc[2] > x && i.loc[1] + i.loc[3] > y) {
                    hovered_img = i;
                    break;
                }
            }
        }
    }
    return hovered_img;
}

function hover_canvas(event, click) {
    if (!click && !document.getElementById("hover_update_on_move").checked) return;
    // console.log(performance.now())
    x = event.clientX;
    y = event.clientY;

    rect = event.target.getBoundingClientRect();

    x -= rect.x;
    y -= rect.y;

    x /= rect.width;
    y /= rect.height;

    x *= event.target.width;
    y *= event.target.height;

    // console.log(get_image_from_loc(x,y).img.file_obj.filename)
    // console.log(performance.now())

    img_obj = get_image_from_loc(x, y)?.img;

    img_name = img_obj?.file_obj?.filename || img_obj?.fake_file_name;

    if (!document.getElementById("hover_full_name").checked)
        img_name = img_name?.split("/")?.at(-1)?.replaceAll(".png", "");

    document.getElementById("hovered_output").innerText = img_name || "N/A";
}

function hover_zoom_canvas(event, click) {
    x = event.clientX;
    y = event.clientY;

    rect = event.target.getBoundingClientRect();

    x -= rect.x;
    y -= rect.y;

    x /= rect.width;
    y /= rect.height;

    x *= event.target.width;
    y *= event.target.height;

    zoom_size_lol = 32;

    // let canvas_in_tmp = document.getElementById("modalCanvas");

    // let ctx_in_tmp = canvas_in_tmp.getContext("2d", {
    //     willReadFrequently: true,
    //     alpha: true,
    //     antialias: false,
    // });

    if (zoom_modal_canvas_data_for_fast_access == null) return;

    let canvas_out_tmp = document.getElementById("zoomModalCanvas");

    let ctx_out_tmp = canvas_out_tmp.getContext("2d", {
        willReadFrequently: true,
        alpha: true,
        antialias: false,
    });

    canvas_out_tmp.width = canvas_out_tmp.height = zoom_size_lol;

    // ctx_out_tmp.clearRect(0, 0, zoom_size_lol, zoom_size_lol);

    // console.log("asd");
    ctx_out_tmp.putImageData(
        zoom_modal_canvas_data_for_fast_access,
        0 - (x - zoom_size_lol / 2),
        0 - (y - zoom_size_lol / 2),
        x - zoom_size_lol / 2,
        y - zoom_size_lol / 2,
        zoom_size_lol,
        zoom_size_lol
    );

    // ctx_out_tmp.putImageData(
    //     ctx_in_tmp.getImageData(x - zoom_size_lol / 2, y - zoom_size_lol / 2, zoom_size_lol, zoom_size_lol),
    //     0,
    //     0
    // );

    if (!click && !document.getElementById("zoom_hover_update_on_move").checked) return;

    img_obj = get_image_from_loc(x, y)?.img;

    img_name = img_obj?.file_obj?.filename || img_obj?.fake_file_name;

    if (!document.getElementById("zoom_hover_full_name").checked)
        img_name = img_name?.split("/")?.at(-1)?.replaceAll(".png", "");

    document.getElementById("zoom_hovered_output").innerText = img_name || "N/A";
}

let zoom_modal_canvas_data_for_fast_access = null;

//!zoom canvas function!!
function openModal() {
    const modal = document.getElementById("canvasModal");
    modal.style.display = "block";

    const modalCanvas = document.getElementById("modalCanvas");
    const originalCanvas = document.getElementById("out_canvas");

    // const scale_up_amt =
    //     1 +
    //     document.getElementById("scale_01").checked +
    //     document.getElementById("scale_02").checked * 4 +
    //     document.getElementById("scale_03").checked * 9;

    // const offscreen_upscale_canvas = new OffscreenCanvas(
    //     originalCanvas.width * scale_up_amt,
    //     originalCanvas.height * scale_up_amt
    // );

    // const upscale_ctx = offscreen_upscale_canvas.getContext("2d", {
    //     willReadFrequently: true,
    //     alpha: true,
    //     antialias: false,
    // });

    // if (document.getElementById("export_preview_color").checked) {
    //     upscale_ctx.fillStyle = document.getElementById("preview_background_color_input").value;
    //     upscale_ctx.fillRect(0, 0, offscreen_upscale_canvas.width, offscreen_upscale_canvas.height);
    // }

    // upscale_ctx.imageSmoothingEnabled = false;

    // upscale_ctx.drawImage(
    //     originalCanvas,
    //     0,
    //     0,
    //     originalCanvas.width * scale_up_amt,
    //     originalCanvas.height * scale_up_amt
    // );

    // modalCanvas.width = offscreen_upscale_canvas.width;
    // modalCanvas.height = offscreen_upscale_canvas.height;

    modalCanvas.width = originalCanvas.width;
    modalCanvas.height = originalCanvas.height;

    modalCanvas.style.width = originalCanvas.width < originalCanvas.height ? "auto" : "100%";
    modalCanvas.style.height = originalCanvas.width < originalCanvas.height ? "100%" : "auto";

    // canvas.height = canvas.width = Math.max(out[1][1], out[1][0]);

    const ctx = modalCanvas.getContext("2d");
    ctx.drawImage(originalCanvas, 0, 0);

    zoom_modal_canvas_data_for_fast_access = originalCanvas
        .getContext("2d")
        .getImageData(0, 0, originalCanvas.width, originalCanvas.height);
}

function closeModal() {
    const modal = document.getElementById("canvasModal");
    modal.style.display = "none";
}

// function initModal() {
//     const openModalBtn = document.getElementById("openModalBtn");
// const closeModalBtn = document.getElementById("closeModalBtn");

//     openModalBtn.addEventListener("click", openModal);
// closeModalBtn.addEventListener("click", closeModal);

//     window.addEventListener("click", (event) => {
//         const modal = document.getElementById("canvasModal");
//         if (event.target === modal) {
//             closeModal();
//         }
//     });
// }

// initModal();

// imageWorker=null;
// function sort_and_draw_image(image_array) {
//     if (imageWorker == null)
//         imageWorker = new Worker(getWorkerURL("image_combiner.js"));

//     image_test = new ImageBitmap();

//     imageWorker.postMessage(image_test,[image_test])
//     // used_width, used_height = 0;

// }

// function start_image_worker() {

// }

// function download_Sprites() {
//     const downloadButton = document.getElementById("downloadButton");
//     const canvas = document.getElementById("out_canvas");
//     const image = canvas.toDataURL("image/png");
//     const link = document.createElement("a");
//     link.href = image;
//     link.download = "myImage.png";
//     link.click();
// }

function download_button_clicked() {
    const canvas = document.getElementById("out_canvas");
    scale_up_amt =
        1 +
        document.getElementById("scale_01").checked +
        document.getElementById("scale_02").checked * 4 +
        document.getElementById("scale_03").checked * 9;

    let offscreen_upscale_canvas = new OffscreenCanvas(
        canvas.width * scale_up_amt,
        canvas.height * scale_up_amt
    );
    upscale_ctx = offscreen_upscale_canvas.getContext("2d", {
        willReadFrequently: true,
        alpha: true,
        antialias: false,
    });
    if (document.getElementById("export_preview_color").checked) {
        upscale_ctx.fillStyle = document.getElementById("preview_background_color_input").value;
        upscale_ctx.fillRect(0, 0, canvas.width * scale_up_amt, canvas.height * scale_up_amt);
    }
    upscale_ctx.imageSmoothingEnabled = false;

    upscale_ctx.drawImage(canvas, 0, 0, canvas.width * scale_up_amt, canvas.height * scale_up_amt);

    // const image = offscreen_upscale_canvas.toDataURL("image/png");

    offscreen_upscale_canvas.convertToBlob().then((blob_D) => {
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob_D); //image;
        link.download =
            file_object_raw.name.replace(".zip", "").replace(/^[!\s]*/gm, "") + "_SPRITESHEET" + ".png";
        link.click();
    });
}

function copy_image_button_clicked() {
    const canvas = document.getElementById("out_canvas");

    scale_up_amt =
        1 +
        document.getElementById("scale_01").checked +
        document.getElementById("scale_02").checked * 4 +
        document.getElementById("scale_03").checked * 9;

    let offscreen_upscale_canvas = new OffscreenCanvas(
        canvas.width * scale_up_amt,
        canvas.height * scale_up_amt
    );
    upscale_ctx = offscreen_upscale_canvas.getContext("2d", {
        willReadFrequently: true,
        alpha: true,
        antialias: false,
    });
    if (document.getElementById("export_preview_color").checked) {
        upscale_ctx.fillStyle = document.getElementById("preview_background_color_input").value;
        upscale_ctx.fillRect(0, 0, canvas.width * scale_up_amt, canvas.height * scale_up_amt);
    }
    upscale_ctx.imageSmoothingEnabled = false;
    upscale_ctx.drawImage(canvas, 0, 0, canvas.width * scale_up_amt, canvas.height * scale_up_amt);

    offscreen_upscale_canvas.convertToBlob().then((blob_D) => {
        navigator.clipboard.write([
            new ClipboardItem({
                "image/png": blob_D,
            }),
        ]);
    });
}

function back_to_edit_page() {
    pagination = 1;
    document.getElementById("main_file_selector_areas").style.display = "none";
    document.getElementById("main_site_data").style.display = "block";
    document.getElementById("generate_page").style.display = "none";
    document.getElementById("edit_page").style.display = "block";
}

window.addEventListener("load", install_event_listeners);

function toggle_all_groups(checked) {
    document.querySelectorAll(".switch > input[type=checkbox]").forEach(function (currentValue) {
        currentValue.checked = checked;
        group_selected(currentValue, true);
    });

    generate_selected_textures_list();
    search_user_input(last_user_inputStringThing);

    document.getElementById("counterTotal").innerText =
        "(" + search_selected_items.length + ") " + "Total Textures:";
}

function toggle_all_searched() {
    document.querySelectorAll("#search_results > div").forEach((element) => {
        let current_item_name_again = element.fill_obj;
        if (!element.getAttribute("checkd")) {
            if (!search_selected_items.includes(current_item_name_again)) {
                search_selected_items.unshift(current_item_name_again);
            }
        } else {
            search_selected_items = search_selected_items.filter((a) => a !== current_item_name_again);
        }

        element.setAttribute("checkd", !element.getAttribute("checkd") ? "true" : "");
    });
    generate_selected_textures_list();
}

function copyText() {
    let copiedtext = [];
    for (i of search_selected_items) {
        tmp_name = get_just_file_name(i).replaceAll(".png", "");
        if (tmp_name.startsWith("._")) continue;

        door_upper = (tmp_name.endsWith("_upper") || tmp_name.endsWith("_top")) && tmp_name.includes("door");
        door_lower =
            (tmp_name.endsWith("_lower") || tmp_name.endsWith("_bottom")) && tmp_name.includes("door");

        if (door_upper || door_lower) {
            door_generalized = tmp_name
                .replaceAll("_upper", "")
                .replaceAll("_lower", "")
                .replaceAll("_top", "")
                .replaceAll("_bottom", "");
            oposite_name = door_generalized + (door_upper ? "_BOTTOM" : "_TOP");
            if (copiedtext.includes(oposite_name)) {
                copiedtext = copiedtext.filter((a) => {
                    return a != oposite_name;
                });
                copiedtext.push(door_generalized);
            } else {
                copiedtext.push(door_generalized + (door_lower ? "_BOTTOM" : "_TOP"));
            }
        } else {
            copiedtext.push(tmp_name);
        }
    }

    // search_selected_items

    navigator.clipboard.writeText(copiedtext.join(", ").replaceAll("_", " "));
}
