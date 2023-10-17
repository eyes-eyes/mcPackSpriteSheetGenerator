let file_object_raw = null;
let file_object_zip = null;
let zip_path_objects = {};
let zip_orig_path_objects = [];
let pack_mcmeta_data = {};
let pack_version = 0;
let pagination = 0;

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
        "^minecraft ^block oak",
        "^minecraft ^block spruce",
        "^minecraft ^block birch",
        "^minecraft ^block jungle",
        "^minecraft ^block acacia",
        "^minecraft ^block dark oak",
        "^minecraft ^block mangrove",
        "^minecraft ^block cherry",
    ],
    stones: [
        "^minecraft ^block stone !redstone !grindstone !lodestone !sword !axe !shovel !hoe !pickaxe !stonecutter !glowstone !slab !dripstone",
        "^minecraft ^block granite !slab",
        "^minecraft ^block diorite !slab",
        "^minecraft ^block andesite !slab",
        "^minecraft ^block sandstone !slab",
        "^minecraft ^block Obsidian !slab",
        "^minecraft ^block blackstone !slab",
    ],
    statusEffects: ["^minecraft ^mob_effect"],
    sediments: [
        "^minecraft ^block grass block !sea !tallgrass !tall",
        "^minecraft ^block Mycelium",
        "^minecraft ^block Podzol",
        "^minecraft ^block dirt",
        "^minecraft ^block farmland",
        "^minecraft ^block gravel",
        "^minecraft ^block sand !sandstone !soul",
    ],
    armors: [
        "^minecraft ^item Leather Cap",
        "^minecraft ^item Leather helmet !overlay",
        "^minecraft ^item Chainmail Helmet",
        "^minecraft ^item Iron Helmet",
        "^minecraft ^item Gold Helmet",
        "^minecraft ^item Diamond Helmet",
        "^minecraft ^item Netherite Helmet",
        "^minecraft ^item Leather Tunic",
        "^minecraft ^item Chainmail Chestplate",
        "^minecraft ^item Iron Chestplate",
        "^minecraft ^item gold Chestplate",
        "^minecraft ^item Diamond Chestplate",
        "^minecraft ^item Netherite Chestplate",
        "^minecraft ^item Leather Pants",
        "^minecraft ^item Chainmail Leggings",
        "^minecraft ^item Iron Leggings",
        "^minecraft ^item gold Leggings",
        "^minecraft ^item Diamond Leggings",
        "^minecraft ^item Netherite Leggings",
        "^minecraft ^item Leather Boots !overlay",
        "^minecraft ^item Chainmail Boots",
        "^minecraft ^item Iron Boots",
        "^minecraft ^item gold Boots",
        "^minecraft ^item Diamond Boots",
        "^minecraft ^item Netherite Boots",
        "^minecraft ^item Leather Horse Armor",
        "^minecraft ^item Iron Horse Armor",
        "^minecraft ^item gold Horse Armor",
        "^minecraft ^item Diamond Horse Armor",
        "^minecraft ^item Turtle Helmet",
    ],
    toolsets: [
        "^minecraft ^item Wood Sword",
        "^minecraft ^item Stone Sword",
        "^minecraft ^item Iron Sword",
        "^minecraft ^item gold Sword",
        "^minecraft ^item Diamond Sword",
        "^minecraft ^item Netherite Sword",
        "^minecraft ^item Wood Pickaxe",
        "^minecraft ^item Stone Pickaxe",
        "^minecraft ^item Iron Pickaxe",
        "^minecraft ^item gold Pickaxe",
        "^minecraft ^item Diamond Pickaxe",
        "^minecraft ^item Netherite Pickaxe",
        "^minecraft ^item Wood Axe",
        "^minecraft ^item Stone Axe",
        "^minecraft ^item Iron Axe",
        "^minecraft ^item gold Axe",
        "^minecraft ^item Diamond Axe",
        "^minecraft ^item Netherite Axe",
        "^minecraft ^item Wood Shovel",
        "^minecraft ^item Stone Shovel",
        "^minecraft ^item Iron Shovel",
        "^minecraft ^item gold Shovel",
        "^minecraft ^item Diamond Shovel",
        "^minecraft ^item Netherite Shovel",
        "^minecraft ^item Wood Hoe",
        "^minecraft ^item Stone Hoe",
        "^minecraft ^item Iron Hoe",
        "^minecraft ^item gold Hoe",
        "^minecraft ^item Diamond Hoe",
        "^minecraft ^item Netherite Hoe",
    ],
    foods: [
        "^minecraft ^item Cooked Beef",
        "^minecraft ^item Cooked Salmon",
        "^minecraft ^item Steak",
        "^minecraft ^item Tropical Fish",
        "^minecraft ^item Raw Chicken",
        "^minecraft ^item Pufferfish",
        "^minecraft ^item Melon Slice",
        "^minecraft ^item Cooked Chicken",
        "^minecraft ^item Apple",
        "^minecraft ^item Mushroom Stew",
        "^minecraft ^item Raw Mutton",
        "^minecraft ^item gold Apple",
        "^minecraft ^item Baked Potato",
        "^minecraft ^item Cooked Mutton",
        "^minecraft ^item Beetroot !seed",
        "^minecraft ^item Poisonous Potato",
        "^minecraft ^item Raw Porkchop",
        "^minecraft ^item Beetroot Soup",
        "^minecraft ^item Pumpkin Pie",
        "^minecraft ^item Cooked Porkchop",
        "^minecraft ^item Bread",
        "^minecraft ^item Rabbit Stew",
        "^minecraft ^item Raw Rabbit",
        "^minecraft ^item Chorus Fruit",
        "^minecraft ^item Rotten Flesh",
        "^minecraft ^item Cooked Rabbit",
        "^minecraft ^item Cookie",
        "^minecraft ^item Spider Eye",
        "^minecraft ^item Raw Cod",
        "^minecraft ^item Dried Kelp",
        "^minecraft ^item Suspicious Stew",
        "^minecraft ^item Cooked Cod",
        "^minecraft ^item gold Carrot",
        "^minecraft ^item Raw Salmon",
        "^minecraft ^item Honey Bottle",
    ],
    ores: [
        "^minecraft ^block Coal Ore",
        "^minecraft ^block Iron Ore",
        "^minecraft ^block Gold Ore",
        "^minecraft ^block Redstone Ore !torch",
        "^minecraft ^block Emerald Ore",
        "^minecraft ^block Lapis Lazuli Ore",
        "^minecraft ^block Diamond Ore",
        "^minecraft ^block Copper Ore",
        "^minecraft ^block Deepslate Coal Ore",
        "^minecraft ^block Deepslate Iron Ore",
        "^minecraft ^block Deepslate Gold Ore",
        "^minecraft ^block Deepslate Redstone Ore",
        "^minecraft ^block Deepslate Emerald Ore",
        "^minecraft ^block Deepslate Lapis Lazuli Ore",
        "^minecraft ^block Deepslate Diamond Ore",
        "^minecraft ^block Deepslate Copper Ore",
        "^minecraft ^block Nether Gold Ore",
        "^minecraft ^block Nether Quartz Ore",
        "^minecraft ^block Ancient Debris",
        "^minecraft ^block Block Iron",
        "^minecraft ^block Block Gold",
        "^minecraft ^block Block Redstone",
        "^minecraft ^block Block Emerald",
        "^minecraft ^block Block Lapis",
        "^minecraft ^block Block Diamond",
        "^minecraft ^block Block Copper",
        "^minecraft ^block Block Quartz !chiseled",
        "^minecraft ^block Block Netherite",
        "^minecraft ^block raw iron block",
        "^minecraft ^block raw gold block",
        "^minecraft ^block raw copper block",
    ],
    minerals: [
        "^minecraft ^item emerald !empty",
        "^minecraft ^item diamond !sword !shovel !axe !pickaxe !hoe !armor !helmet !chestplate !leggings !boots !empty",
        "^minecraft ^item copper ingot",
        "^minecraft ^item iron ingot",
        "^minecraft ^item iron nugget",
        "^minecraft ^item gold ingot",
        "^minecraft ^item gold nugget",
        "^minecraft ^item netherite ingot",
        "^minecraft ^item netherite scrap",
        "^minecraft ^item redstone !overlay !dot !line !empty",
        "^minecraft ^item coal !block",
        "^minecraft ^item charcoal !block",
        "^minecraft ^item Lapis Lazuli !block !empty",
        "^minecraft ^item raw copper !block",
        "^minecraft ^item raw iron !block",
        "^minecraft ^item raw gold !block",
        "^minecraft ^item quartz !block !empty",
    ],
    balls: [
        "^minecraft ^item ender pearl",
        "^minecraft ^item eye of ender",
        "^minecraft ^item snowball",
        "^minecraft ^item slimeball",
        "^minecraft ^item egg !leggings !overlay !spawn",
        "^minecraft ^item magma cream",
        "^minecraft ^item fireball",
        "^minecraft ^item fire charge !firework",
        "^minecraft ^item Heart of the Sea",
    ],
    cropStages: [
        "^minecraft ^block wheat stage",
        "^minecraft ^block carrot stage",
        "^minecraft ^block beetroot stage",
        "^minecraft ^block cocoa stage",
        "^minecraft ^block potatoes stage",
        "^minecraft ^block bamboo stage",
    ],
    vehicles: ["^minecraft ^item Minecart", "^item boat"],
    musicDiscs: ["^minecraft music disc"],
    shulkerBoxes: ["^minecraft ^block Shulker Box"],
    buckets: ["^minecraft ^item bucket"],
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
        // if ()
        // if (isNotCombinedKey) {
        //     back_to_file_selector();
        // }
        // if (pagination == 2)
        back_button();
    }
};

function back_button() {
    switch (pagination) {
        case 1:
            back_to_file_selector();
            clear_selected();
            break;
        case 2:
            back_to_edit_page();
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

        // if (!get_just_file_name(entries[i]).startsWith("."))
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

    document.getElementById("pack_name_top_bar").innerHTML =
        minecraft_name_to_html(
            file_object_raw.name.replace(".zip", "").replace(/^[!\s]*/gm, "")
        ).innerHTML;

    file_object_zip = new zip.ZipReader(new zip.BlobReader(file));
    file_object_zip.getEntries().then(zip_new_entry_handler);
}

function back_to_file_selector() {
    pagination = 0;
    document.getElementById("main_file_selector_areas").style.display = "block";
    document.getElementById("main_site_data").style.display = "none";
    document.getElementById("pack_version_top_bar").innerText =
        "Pack version: (opening)";
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

function search_user_input(search_string) {
    last_user_inputStringThing = search_string;
    output = [];
    search_array = search_string.split(" ");
    for (i in zip_orig_path_objects) {
        current_name = get_just_file_name(zip_orig_path_objects[i]);
        current_long_name = zip_orig_path_objects[i].filename;
        if (
            current_name.endsWith(".png") &&
            !get_just_file_name(zip_orig_path_objects[i]).startsWith(".")
        ) {
            current_eligablility = true;
            for (o in search_array) {
                searched_level_path =
                    search_array[o][0] == "^"
                        ? current_long_name
                        : current_name;
                search_string_current =
                    search_array[o][0] == "^"
                        ? search_array[o].slice(1)
                        : search_array[o];
                if (search_string_current[0] == "!") {
                    if (
                        searched_level_path.includes(
                            search_string_current.slice(1)
                        )
                    ) {
                        current_eligablility = false;
                    }
                } else {
                    if (!searched_level_path.includes(search_string_current)) {
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
            current_result_itter.setAttribute("hover_text", output[i].filename);
            current_result_itter.innerText = get_just_file_name(
                output[i]
            ).replace(".png", "");
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
            current_result_itter.setAttribute(
                "hover_text",
                search_selected_items[i].filename
            );
            current_result_itter.innerText = get_just_file_name(
                search_selected_items[i]
            ).replace(".png", "");
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
    document
        .querySelectorAll(".switch > input[type=checkbox]")
        .forEach(function (currentValue) {
            currentValue.checked = false;
        });
    document.getElementById("checkingGroups").checked = false;
    document.getElementById("counterTotal").innerText =
        "(" + search_selected_items.length + ") " + "Total Textures:";
}

//! group selection method
function group_selected(obj) {
    group_add_remove = java_mc_groups[obj.id];

    output = [];
    for (apple in group_add_remove) {
        search_string = group_add_remove[apple].toLowerCase();
        search_array = search_string.split(" ");
        for (i in zip_orig_path_objects) {
            current_name = get_just_file_name(zip_orig_path_objects[i]);
            current_long_name = zip_orig_path_objects[i].filename; //get_just_file_name(zip_orig_path_objects[i]);
            if (
                current_name.endsWith(".png") &&
                !get_just_file_name(zip_orig_path_objects[i]).startsWith(".")
            ) {
                current_eligablility = true;
                for (o in search_array) {
                    searched_level_path =
                        search_array[o][0] == "^"
                            ? current_long_name
                            : current_name;
                    search_string_current =
                        search_array[o][0] == "^"
                            ? search_array[o].slice(1)
                            : search_array[o];

                    if (search_string_current[0] == "!") {
                        if (
                            searched_level_path.includes(
                                search_string_current.slice(1)
                            )
                        ) {
                            current_eligablility = false;
                        }
                    } else {
                        if (
                            !searched_level_path.includes(search_string_current)
                        ) {
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
    document.getElementById("counterTotal").innerText =
        "(" + search_selected_items.length + ") " + "Total Textures:";

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
                        if (file.type == "application/x-zip-compressed")
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

// FUNCTION TO PROCEED TO DOWNLOAD PAGE
function proceed() {
    if (search_selected_items.length == 0) {
        return;
    } else {
        pagination = 2;
        document.getElementById("main_file_selector_areas").style.display =
            "none";
        document.getElementById("main_site_data").style.display = "block";
        document.getElementById("generate_page").style.display = "block";
        document.getElementById("edit_page").style.display = "none";

        document.getElementById("I_like_sharing_cat_loading").style.display =
            "block";

        generate_final_text_list().then(() => {
            generate_final_image();
        });
    }
}

async function generate_final_text_list() {
    document.getElementById("out_canvas").width = 0;
    textures_list_final = search_selected_items;
    final_textures_list = [];
    for (i in textures_list_final) {
        final_textures_list.push(
            await createImageBitmap(
                await textures_list_final[i].getData(new zip.BlobWriter())
            )
        );
    }
    document.getElementById("I_like_sharing_cat_loading").style.display =
        "none";
}

let final_textures_list = [];
// ! generate final image function!!!
async function generate_final_image() {
    out = sort_and_draw_image(
        final_textures_list,
        document.getElementById("width_input_generate").valueAsNumber || 0
    );
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

function sort_and_draw_image(image_array, width) {
    img_max_dimensions = [0, 0];
    img_area_needed = 0;
    img_min_dimensions = [9999999, 9999999];
    for (i of image_array) {
        img_max_dimensions[0] = Math.max(img_max_dimensions[0], i.width);
        img_max_dimensions[1] = Math.max(img_max_dimensions[1], i.height);
        img_min_dimensions[0] = Math.min(img_min_dimensions[0], i.width);
        img_min_dimensions[1] = Math.min(img_min_dimensions[1], i.height);
        // console.log("sizes", img_max_dimensions, img_min_dimensions);
        img_area_needed += i.height * i.width;
    }

    if (width == 0) {
        width =
            Math.ceil(Math.sqrt(img_area_needed) / img_min_dimensions[0]) *
            img_min_dimensions[0];
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

    for (image of image_array) {
        if (image.width > width - line_width_used_tmp) {
            line_offset_top += line_height_used_temp;
            line_width_used_tmp = 0;
            line_height_used_temp = 0;
            // continue;
        }

        ctx.drawImage(image, line_width_used_tmp, line_offset_top);

        line_height_used_temp = Math.max(line_height_used_temp, image.height);
        line_width_used_tmp += image.width;
    }
    line_offset_top += line_height_used_temp;

    return [offscreen.transferToImageBitmap(), [line_offset_top, width]];
}

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
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download =
        file_object_raw.name.replace(".zip", "").replace(/^[!\s]*/gm, "") +
        "_SPRITESHEET" +
        ".png";
    link.click();
}

function back_to_edit_page() {
    pagination = 1;
    document.getElementById("main_file_selector_areas").style.display = "none";
    document.getElementById("main_site_data").style.display = "block";
    document.getElementById("generate_page").style.display = "none";
    document.getElementById("edit_page").style.display = "block";
}

window.addEventListener("load", install_event_listners);

function toggle_all_groups(checked) {
    document
        .querySelectorAll(".switch > input[type=checkbox]")
        .forEach(function (currentValue) {
            currentValue.checked = checked;
            group_selected(currentValue);
        });
}

function toggle_all_searched() {
    document.querySelectorAll("#search_results > div").forEach((element) => {
        let current_item_name_again = element.fill_obj;
        if (!element.getAttribute("checkd")) {
            if (!search_selected_items.includes(current_item_name_again)) {
                search_selected_items.unshift(current_item_name_again);
            }
        } else {
            search_selected_items = search_selected_items.filter(
                (a) => a !== current_item_name_again
            );
        }

        element.setAttribute(
            "checkd",
            !element.getAttribute("checkd") ? "true" : ""
        );
    });
    generate_selected_textures_list();
}

// const canvas = document.getElementById("out_canvas");
// const ctx = canvas.getContext("2d");

// const imageSources = [
//     "images/bamboo.png",
//     "images/barrier.png",
//     "images/beef.png",
//     "images/beetroot.png",
// ];

// var columns = 2;
// var rows = 2;

// const imageWidth = canvas.width / columns;
// const imageHeight = canvas.height / rows;

// let imagesLoaded = 0;
// imageSources.forEach((src, index) => {
//     const img = new Image();
//     img.src = src;
//     img.onload = () => {
//         const row = Math.floor(index / columns);
//         const col = index % columns;
//         ctx.drawImage(
//             img,
//             col * imageWidth,
//             row * imageHeight,
//             imageWidth,
//             imageHeight
//         );
//         imagesLoaded++;
//         if (imagesLoaded == imageSources.length) {
//             console.log("All images loaded and drawn on the canvas.");
//         }
//     };
// });
