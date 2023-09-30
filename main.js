

let file_object_raw = null;
let file_object_zip = null;
let zip_path_objects = {};
let zip_orig_path_objects = [];
let pack_mcmeta_data = {};
let pack_version = 0;



//Constants
const version_codes = {
    "1": ["1.6.1", "1.8.9"],
    "2": ["1.9", "1.10.2"],
    "3": ["1.11", "1.12.2"],
    "4": ["1.13", "1.14.4"],
    "5": ["1.15", "1.16.1"],
    "6": ["1.16.2", "1.16.5"],
    "7": ["1.17", "1.17.1"],
    "8": ["1.18", "1.18.2"],
    "9": ["1.19", "1.19.2"],
    "10": ["1.19", "1.19.2"],
    "11": ["1.19.2", "1.19.2"],
    "12": ["1.19.3", "1.19.3"],
    "13": ["1.19.4", "1.19.4"],
    "14": ["1.19.4", "1.19.4"],
    "15": ["1.20", "1.20.1"],
    "16": ["1.20", "1.20.1"],
    "17": ["1.20", "1.20.1"],
    "18": ["1.20.2", "1.20.2"]
}


const color_codes = {
    "0":["#000000"],
    "1":["#0000AA"],
    "2":["#00AA00"],
    "3":["#00AAAA"],
    "4":["#AA0000"],
    "5":["#AA00AA"],
    "6":["#FFAA00"],
    "7":["#AAAAAA"],
    "8":["#555555"],
    "9":["#5555FF"],
    "a":["#55FF55"],
    "b":["#55FFFF"],
    "c":["#FF5555"],
    "d":["#FF55FF"],
    "e":["#FFFF55"],
    "f":["#FFFFFF"],
}


//Constants




async function pack_data_parse() {
    mcmeta = zip_path_objects["pack.mcmeta"]
    if (mcmeta) {
        mcmeta_data = await read_file_to_str(mcmeta)
        try {
            packmcmeta_json = JSON.parse(mcmeta_data)
        } catch (e) {
            console.log("error parsing json")
            return 1
        }

        if (packmcmeta_json) {
            pack_version = packmcmeta_json?.["pack"]?.["pack_format"]
            if (!pack_version) {
                console.log("no pack format")
                return 1
            }

            pack_mcmeta_data = packmcmeta_json

            update_pack_version(pack_version)
        } else {
            console.log("json invalid")
            return 1
        }
    } else {
        console.log("error opening file")
        return 1
    }
}

function update_pack_version(pack_version) {
    pack_minecraft_version_names = version_codes[pack_version.toString()]
    if (!pack_minecraft_version_names) {
        pack_minecraft_version_names = ["Unknown","Unknown"]
    }
    document.getElementById("pack_version_top_bar").innerText = "Pack version: "+pack_version+" ("+pack_minecraft_version_names[0]+"-"+pack_minecraft_version_names[1]+")"
}


function zip_new_entry_handler(entries) {
    zip_path_objects = {}
    for (i in entries) {
        path_arrary = entries[i].filename.split("/")

        fillObjectAtDepth(zip_path_objects,entries[i],path_arrary)
    }
    zip_orig_path_objects = entries

    

    pack_data_parse().then((o) => {if (o == 1) {error_invalid_pack("cant parse pack.mcmeta")}})
}

function handle_file(file) {
    console.log(file)
    document.getElementById("file_hover_popup").style.display = "none";
    document.getElementById("main_file_selector_areas").style.display = "none";
    document.getElementById("main_site_data").style.display = "block";
    file_object_raw = file;


    console.log(file_object_raw.name.replace(".zip",""))

    document.getElementById("pack_name_top_bar").innerHTML = minecraft_name_to_html(file_object_raw.name.replace(".zip","").replace(/^[!\s]*/gm,"")).innerHTML;

    file_object_zip = new zip.ZipReader(new zip.BlobReader(file));
    file_object_zip.getEntries().then(zip_new_entry_handler)

} 

function back_to_file_selector() {
    document.getElementById("main_file_selector_areas").style.display = "block";
    document.getElementById("main_site_data").style.display = "none";
    document.getElementById("pack_version_top_bar").innerText = "Pack version: (opening)"
    document.getElementById("pack_name_top_bar").innerText = "None"
}
















function error_invalid_pack(message) {
    pack_invalid = 1;
    back_to_file_selector();
    alert("invalid pack:\r\n"+message)
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
            }
        }
    );
}



function search_object_tree(root,search_value) {
    let output_array = []
    for (i in root) {
        // console.log(i)
        

        //quick check if file
        if (typeof(root[i].filename) == typeof("")) {
            // console.log(i)
            if (i.toString().includes(search_value)) {
                output_array.push(root[i])
                console.log(i)
                // debugger;
            }
        } else {
            output_array.push(...search_object_tree(root[i],search_value))
        }
    }
    return output_array
}

function search_user_input(search_string) {
    output = []
    search_array = search_string.split(" ")
    for (i in zip_orig_path_objects) {
        current_name = get_just_file_name(zip_orig_path_objects[i])
        if (current_name.endsWith(".png")) {
            current_eligablility = true;
            for (o in search_array) {
                if (!current_name.includes(search_array[o])) {
                    current_eligablility = false;
                }
            }
            if (current_eligablility) {
                output.push(zip_orig_path_objects[i])
            }
        }
    }
    

    search_results = document.getElementById("search_results")
    if (output.length == 0) {
        search_results.innerHTML = "<p>no ballz</p>"
    } else {
        search_results.innerHTML = ""
        for (i in output) {
            current_result_itter = document.createElement("p")
            current_result_itter.innerText = get_just_file_name(output[i])
            search_results.appendChild(current_result_itter)
        }
    }
}

function get_just_file_name(fileobj) {
    fil_name = fileobj.filename 
    fil_name = fil_name ? fil_name : ""
    return fil_name.split("/").reverse()[0]
}

//Shows colors and removed codes in pack name

function minecraft_name_to_html(name) {
    default_settings = {
        "color": "#fff",
        "bold": false,
        "italic": false,
        "underline": false
    }
    current_setting = default_settings
    make_new_html_element_with_settings = (text,settings) => {
        current_element = document.createElement("span")
        current_element.style.fontWeight = settings.bold ? "bold" : "";
        current_element.style.color = settings.color;
        current_element.style.textDecoration = settings.underline ? "underline" : "";
        current_element.style.fontStyle = settings.italic ? "italic" : "";
        current_element.innerText = text
        return current_element
    }

    main_p = document.createElement("p")

    text_buffer = ""
    for (let i = 0; i < name.length; i++) {
        if (name[i] == "§") {
            main_p.appendChild(make_new_html_element_with_settings(text_buffer,current_setting))
            text_buffer = ""
            i+=1
            if (color_codes[name[i]]) {
                current_setting.color = color_codes[name[i]]
            } else {
                switch (name[i]) {
                    case "l":
                      current_setting.bold = true
                    case "n":
                        current_setting.underline = true
                    case "o":
                        current_setting.italic = true
                    case "r":
                        current_setting = default_settings
                }
            }
        } else {
            text_buffer += name[i]
        }
    }

    main_p.appendChild(make_new_html_element_with_settings(text_buffer,current_setting))

    return main_p
    
}
//helper function





function install_event_listners() {
    window.addEventListener("dragover", (ev) => {
        document.getElementById("file_hover_popup").style.display = "block";
        ev.preventDefault();
    }, false);
    
    window.addEventListener("dragleave",(ev) => {
        document.getElementById("file_hover_popup").style.display = "none";
        ev.preventDefault();
    },false);
    
    window.addEventListener("drop",(ev) => {
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
    },false)
    
    document.getElementById("input_main_upload").addEventListener("change", ()=> {
        files = document.getElementById("input_main_upload").files;
        if (!!files[0]) {
            handle_file(files[0]);
        }

        document.getElementById("input_main_upload").value = "";
    })
}


window.addEventListener("load",install_event_listners);