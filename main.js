/*const body = document.querySelector('body');
const upload = document.querySelector('.upload');
const uploadButtonText = document.querySelector*('.upload-button-text');
const uploadFilename = document.querySelector('.upload-filename');
const fileInput = document.getElementById('file');
const dropArea = document.querySelector('.drop-area');*/

let file_object_raw = null;
let file_object_zip = null;
let zip_path_objects = {}



function zip_new_entry_handler(entries) {
    entries.
    zip_path_objects
}

function handle_file(file) {
    console.log(file)
    document.getElementById("file_hover_popup").style.display = "none";
    document.getElementById("main_file_selector_areas").style.display = "none";
    document.getElementById("main_site_data").style.display = "block";
    file_object_raw = file;

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