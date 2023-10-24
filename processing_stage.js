// MOVED INTO index.html, please use the inline version as to allow for users without webhosts to run
// COPY THIS FILE DIRECTLY INTO THE HTML, this is left for syntax hylighting!!!!!!
// PLEASE DO NOT USE THIS FILE EXPECTING UPDATES
unfinished_objects = 0;

onmessage = (e) => {
    if (e.data["request"] == "handle_new_image") {
        unfinished_objects += 1
        try {
            createImageBitmap(e.data["blob"]).then((bitmap) => {
            
                bitmap.id_processing = e.data["index"]
                // output.push(bitmap)
                color_img = color_append_to_image(bitmap)
                unfinished_objects -= 1

                postMessage({"request":"handle_new_image","data":bitmap,"index": e.data["index"], "color": color_img})
            
            }).catch(e) {
                postMessage({"request":"handle_new_image","index": e.data["index"],"error":+e.message})
            }
        } catch (e) {
            postMessage({"request":"handle_new_image","index": e.data["index"],"error":+e.message})
        }
    } 
};

img_max_height = img_max_width = 16000;
f = new OffscreenCanvas(img_max_width, img_max_height).getContext("2d", {
    willReadFrequently: true,
    alpha: true,
    antialias: false,
});

function color_append_to_image(image) {
    

    out = [];
    

    if (image.avg_color) return
    obj = image;
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
    return image.avg_color = rgb2hsv(colors[0], colors[1], colors[2]);
}

function rgb2hsv(r, g, b) {
    let v = Math.max(r, g, b),
        c = v - Math.min(r, g, b);
    let h = c && (v == r ? (g - b) / c : v == g ? 2 + (b - r) / c : 4 + (r - g) / c);
    return [60 * (h < 0 ? h + 6 : h), v && c / v, v];
}