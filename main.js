/*const body = document.querySelector('body');
const upload = document.querySelector('.upload');
const uploadButtonText = document.querySelector*('.upload-button-text');
const uploadFilename = document.querySelector('.upload-filename');
const fileInput = document.getElementById('file');
const dropArea = document.querySelector('.drop-area');*/

let file_object_raw = null;
let file_object_zip = null;
let zip_path_objects = {};
let pack_mcmetta_data = {};



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
    "12": ["1.19.3"],
    "13": ["1.19.4"],
    "14": ["1.19.4"],
    "15": ["1.20", "1.20.1"],
    "16": ["1.20", "1.20.1"],
    "17": ["1.20", "1.20.1"],
    "18": ["1.20.2"]
}


//Constants



let fileNameElement = document.querySelector("#main_site_data p");

function zip_new_entry_handler(entries) {
    for (i in entries) {
        path_arrary = entries[i].filename.split("/")

        current_path_loc = zip_path_objects
        for (o in path_arrary) {
            current_path_loc = current_path_loc[path_arrary[o]] ? current_path_loc[path_arrary[o]] : {}
        }
        current_path_loc = entries[i]
    }

    

    // pack_data_parse()
}

function handle_file(file) {
    console.log(file)
    document.getElementById("file_hover_popup").style.display = "none";
    document.getElementById("main_file_selector_areas").style.display = "none";
    document.getElementById("main_site_data").style.display = "block";
    file_object_raw = file;

    fileNameElement.innerText = file.name;

    file_object_zip = new zip.ZipReader(new zip.BlobReader(file));
    file_object_zip.getEntries().then(zip_new_entry_handler)

} 

function back_to_file_selector() {
    document.getElementById("main_file_selector_areas").style.display = "block";
    document.getElementById("main_site_data").style.display = "none";
}






















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