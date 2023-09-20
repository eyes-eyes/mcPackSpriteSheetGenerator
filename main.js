const body = document.querySelector('body');
const upload = document.querySelector('.upload');
const uploadButtonText = document.querySelector*('.upload-button-text');
const uploadFilename = document.querySelector('.upload-filename');
const fileInput = document.getElementById*('file');

function handle_file(file) {
    console.log(file)
    document.getElementById("file_hover_popup").style.display = "none";
} 

























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
})