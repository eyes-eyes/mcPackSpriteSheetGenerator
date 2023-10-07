let file_object_raw = null;
let file_object_zip = null;
let zip_path_objects = {};
let zip_orig_path_objects = [];
let pack_mcmeta_data = {};
let pack_version = 0;

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

const java_mc_groups = {
    woodVariants: [
        "oak",
        "spruce",
        "birch",
        "jungle",
        "acacia",
        "dark oak",
        "mangrove",
        "cherry",
    ],
    stones: [
        "stone",
        "granite",
        "diorite",
        "andesite",
        "sandstone",
        "Obsidian",
    ],
    sediments: [
        "grass block",
        "Mycelium",
        "Podzol",
        "dirt",
        "farmland",
        "gravel",
        "sand",
    ],
    armors: [
        "Leather Cap",
        "Chainmail Helmet",
        "Iron Helmet",
        "Golden Helmet",
        "Diamond Helmet",
        "Netherite Helmet",
        "Leather Tunic",
        "Chainmail Chestplate",
        "Iron Chestplate",
        "Golden Chestplate",
        "Diamond Chestplate",
        "Netherite Chestplate",
        "Leather Pants",
        "Chainmail Leggings",
        "Iron Leggings",
        "Golden Leggings",
        "Diamond Leggings",
        "Netherite Leggings",
        "Leather Boots",
        "Chainmail Boots",
        "Iron Boots",
        "Golden Boots",
        "Diamond Boots",
        "Netherite Boots",
        "Leather Horse Armor",
        "Iron Horse Armor",
        "Golden Horse Armor",
        "Diamond Horse Armor",
        "Turtle Helmet",
    ],
    toolsets: [
        "Wooden Sword",
        "Stone Sword",
        "Iron Sword",
        "Golden Sword",
        "Diamond Sword",
        "Netherite Sword",
        "Wooden Pickaxe",
        "Stone Pickaxe",
        "Iron Pickaxe",
        "Golden Pickaxe",
        "Diamond Pickaxe",
        "Netherite Pickaxe",
        "Wooden Axe",
        "Stone Axe",
        "Iron Axe",
        "Golden Axe",
        "Diamond Axe",
        "Netherite Axe",
        "Wooden Shovel",
        "Stone Shovel",
        "Iron Shovel",
        "Golden Shovel",
        "Diamond Shovel",
        "Netherite Shovel",
        "Wooden Hoe",
        "Stone Hoe",
        "Iron Hoe",
        "Golden Hoe",
        "Diamond Hoe",
        "Netherite Hoe",
    ],
    foods: [
        "Raw Beef",
        "Cooked Salmon",
        "Steak",
        "Tropical Fish",
        "Raw Chicken",
        "Pufferfish",
        "Melon Slice",
        "Cooked Chicken",
        "Apple",
        "Mushroom Stew",
        "Raw Mutton",
        "Golden Apple",
        "Baked Potato",
        "Cooked Mutton",
        "Beetroot",
        "Poisonous Potato",
        "Raw Porkchop",
        "Beetroot Soup",
        "Pumpkin Pie",
        "Cooked Porkchop",
        "Bread",
        "Rabbit Stew",
        "Raw Rabbit",
        "Chorus Fruit",
        "Rotten Flesh",
        "Cooked Rabbit",
        "Cookie",
        "Spider Eye",
        "Raw Cod",
        "Dried Kelp",
        "Suspicious Stew",
        "Cooked Cod",
        "Golden Carrot",
        "Raw Salmon",
        "Honey Bottle",
    ],
    ores: [
        "Coal Ore",
        "Iron Ore",
        "Gold Ore",
        "Redstone Ore",
        "Emerald Ore",
        "Lapis Lazuli Ore",
        "Diamond Ore",
        "Copper Ore",
        "Deepslate Coal Ore",
        "Deepslate Iron Ore",
        "Deepslate Gold Ore",
        "Deepslate Redstone Ore",
        "Deepslate Emerald Ore",
        "Deepslate Lapis Lazuli Ore",
        "Deepslate Diamond Ore",
        "Deepslate Copper Ore",
        "Nether Gold Ore",
        "Nether Quartz Ore",
        "Ancient Debris",
        "Block of Iron",
        "Block of Gold",
        "Block of Redstone",
        "Block of Emerald",
        "Block of Lapis Lazuli",
        "Block of Diamond",
        "Block of Copper",
        "Block of Quartz",
        "Block of Netherite",
        "Block of Raw Iron",
        "Block of Raw Gold",
        "Block of Raw Copper",
    ],
    minerals: [
        "emerald",
        "diamond",
        "copper ingot",
        "iron ingot",
        "iron nugget",
        "gold ingot",
        "gold nugget",
        "netherite ingot",
        "netherite scrap",
        "redstone dust",
        "coal",
        "charcoal",
        "Lapis Lazuli",
        "raw copper",
        "raw iron",
        "raw gold",
        "nether quartz",
    ],
    balls: [
        "ender pearl",
        "eye of ender",
        "snowball",
        "slimeball",
        "egg",
        "magma cream",
        "fire charge",
        "Heart of the Sea",
    ],
    cropStages: [
        "wheat_stage",
        "carrots_stage",
        "beetroots_stage",
        "cocoa_stage",
        "potatoes_stage",
        "bamboo_stage",
    ],
    vehicles: ["Minecart", "boat"],
    musicDisc: ["muisc disc"],
    shulkerBoxes: [
        "Shulker Box",
        "White Shulker Box",
        "Light Gray Shulker Box",
        "Gray Shulker Box",
        "Black Shulker Box",
        "Brown Shulker Box",
        "Red Shulker Box",
        "Orange Shulker Box",
        "Yellow Shulker Box",
        "Lime Shulker Box",
        "Green Shulker Box",
        "Cyan Shulker Box",
        "Light Blue Shulker Box",
        "Blue Shulker Box",
        "Purple Shulker Box",
        "Magenta Shulker Box",
        "Pink Shulker Box",
    ],
};

document.onkeydown = function (evt) {
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
        isEscape = evt.key === "Escape" || evt.key === "Esc";
    } else {
        isEscape = evt.keyCode === 27;
    }
    if (isEscape) {
        const isNotCombinedKey = !(
            event.ctrlKey ||
            event.altKey ||
            event.shiftKey
        );
        if (isNotCombinedKey) {
            back_to_file_selector();
        }
        back_to_file_selector();
    }
};

async function pack_data_parse() {
    mcmeta = zip_path_objects["pack.mcmeta"];
    if (mcmeta) {
        mcmeta_data = await read_file_to_str(mcmeta);
        try {
            packmcmeta_json = JSON.parse(
                mcmeta_data.replaceAll("\r", "").replaceAll("\n", "")
            );
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
        path_arrary = entries[i].filename.split("/");

        fillObjectAtDepth(zip_path_objects, entries[i], path_arrary);
    }
    zip_orig_path_objects = entries;

    pack_data_parse().then((o) => {
        if (o == 1) {
            error_invalid_pack("cant parse pack.mcmeta");
        }
    });
}

function handle_file(file) {
    console.log(file);
    document.getElementById("file_hover_popup").style.display = "none";
    document.getElementById("main_file_selector_areas").style.display = "none";
    document.getElementById("main_site_data").style.display = "block";
    file_object_raw = file;

    console.log(file_object_raw.name.replace(".zip", ""));

    document.getElementById("pack_name_top_bar").innerHTML =
        minecraft_name_to_html(
            file_object_raw.name.replace(".zip", "").replace(/^[!\s]*/gm, "")
        ).innerHTML;

    file_object_zip = new zip.ZipReader(new zip.BlobReader(file));
    file_object_zip.getEntries().then(zip_new_entry_handler);
}

function back_to_file_selector() {
    document.getElementById("main_file_selector_areas").style.display = "block";
    document.getElementById("main_site_data").style.display = "none";
    document.getElementById("pack_version_top_bar").innerText =
        "Pack version: (opening)";
    document.getElementById("pack_name_top_bar").innerText = "None";
}

// FUNCTION TO PROCEED TO DOWNLOAD PAGE
function proceed() {}

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

function search_user_input(search_string) {
    last_user_inputStringThing = search_string;
    output = [];
    search_array = search_string.split(" ");
    for (i in zip_orig_path_objects) {
        current_name = zip_orig_path_objects[i].filename; //get_just_file_name(zip_orig_path_objects[i]);
        if (current_name.endsWith(".png")) {
            current_eligablility = true;
            for (o in search_array) {
                if (search_array[o][0] == "!") {
                    if (current_name.includes(search_array[o].slice(1))) {
                        current_eligablility = false;
                    }
                } else {
                    if (!current_name.includes(search_array[o])) {
                        current_eligablility = false;
                    }
                }
            }
            if (current_eligablility) {
                output.push(zip_orig_path_objects[i]);
            }
        }
    }

    search_results = document.getElementById("search_results");
    if (output.length == 0) {
        search_results.innerHTML = "<p>no ballz</p>";
    } else {
        search_results.innerHTML = "";
        for (i in output) {
            current_result_itter = document.createElement("div");
            current_result_itter.addEventListener("click", (e) => {
                let current_item_name_again = e.target.fill_obj;
                console.log(current_item_name_again);
                console.log(
                    search_selected_items.includes(current_item_name_again)
                );

                if (!e.target.getAttribute("checkd")) {
                    if (
                        !search_selected_items.includes(current_item_name_again)
                    ) {
                        search_selected_items.unshift(current_item_name_again);
                    }
                } else {
                    search_selected_items = search_selected_items.filter(
                        (a) => a !== current_item_name_again
                    );
                }

                e.target.setAttribute(
                    "checkd",
                    !e.target.getAttribute("checkd") ? "true" : ""
                );

                generate_selected_textures_list();
            });
            // current_result_itter.setAttribute("checkd",true);
            current_result_itter.innerText = get_just_file_name(output[i]);
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
                console.log(
                    search_selected_items.includes(current_item_name_again)
                );

                if (!e.target.getAttribute("checkd")) {
                    if (
                        !search_selected_items.includes(current_item_name_again)
                    ) {
                        search_selected_items.unshift(current_item_name_again);
                    }
                } else {
                    // search_selected_items.pop(current_item_name_again);
                    search_selected_items = search_selected_items.filter(
                        (a) => a !== current_item_name_again
                    );
                }

                e.target.setAttribute(
                    "checkd",
                    !e.target.getAttribute("checkd") ? "true" : ""
                );

                generate_selected_textures_list();
                search_user_input(last_user_inputStringThing);
            });
            // current_result_itter.setAttribute("checkd",true);
            current_result_itter.innerText = get_just_file_name(
                search_selected_items[i]
            );
            current_result_itter.fill_obj = search_selected_items[i];
            if (search_selected_items.includes(search_selected_items[i])) {
                current_result_itter.setAttribute("checkd", "true");
            }
            search_results.appendChild(current_result_itter);
        }
    }
}

function clear_selected() {
    search_selected_items = [];
    generate_selected_textures_list();
    search_user_input(last_user_inputStringThing);
}

//! group selection method
function group_selected(obj) {
    // console.log(obj, obj.id);

    // switch (obj.id) {
    //     case value:

    //         break;

    //     default:
    //         break;
    // }

    group_add_remove = java_mc_groups[obj.id];

    output = [];
    for (apple in group_add_remove) {
        search_string = group_add_remove[apple].toLowerCase();
        search_array = search_string.split(" ");
        for (i in zip_orig_path_objects) {
            current_name = zip_orig_path_objects[i].filename; //get_just_file_name(zip_orig_path_objects[i]);
            if (current_name.endsWith(".png")) {
                current_eligablility = true;
                for (o in search_array) {
                    if (search_array[o][0] == "!") {
                        if (current_name.includes(search_array[o].slice(1))) {
                            current_eligablility = false;
                        }
                    } else {
                        if (!current_name.includes(search_array[o])) {
                            current_eligablility = false;
                        }
                    }
                }
                if (current_eligablility) {
                    output.push(zip_orig_path_objects[i]);
                }
            }
        }
    }

    for (i in output) {
        if (obj.checked) {
            if (!search_selected_items.includes(output[i])) {
                search_selected_items.unshift(output[i]);
            }
        } else {
            search_selected_items = search_selected_items.filter(
                (a) => a !== output[i]
            );
        }
    }

    generate_selected_textures_list();
    search_user_input(last_user_inputStringThing);

    // console.log(obj.id + (obj.checked ? " CHECKED" : " Unchecked"));
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
        current_element.style.textDecoration = settings.underline
            ? "underline"
            : "";
        current_element.style.fontStyle = settings.italic ? "italic" : "";
        current_element.innerText = text;
        return current_element;
    };

    main_p = document.createElement("p");

    text_buffer = "";
    for (let i = 0; i < name.length; i++) {
        if (name[i] == "§") {
            main_p.appendChild(
                make_new_html_element_with_settings(
                    text_buffer,
                    current_setting
                )
            );
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

    main_p.appendChild(
        make_new_html_element_with_settings(text_buffer, current_setting)
    );

    return main_p;
}
//helper function

function install_event_listners() {
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
            // Prevent default behavior (Prevent file from being opened)
            ev.preventDefault();

            if (ev.dataTransfer.items) {
                // Use DataTransferItemList interface to access the file(s)
                [...ev.dataTransfer.items].forEach((item, i) => {
                    // If dropped items aren't files, reject them
                    if (item.kind === "file") {
                        const file = item.getAsFile();
                        handle_file(file);
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

    document
        .getElementById("input_main_upload")
        .addEventListener("change", () => {
            files = document.getElementById("input_main_upload").files;
            if (!!files[0]) {
                handle_file(files[0]);
            }

            document.getElementById("input_main_upload").value = "";
        });
}

window.addEventListener("load", install_event_listners);
