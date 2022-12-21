document.addEventListener("DOMContentLoaded", function() {
    window.onresize = function(){ location.reload(); }

    var fps = 60; // Strangely, doesn't look as good at 24fps despite matching the animations

    var canvas = document.getElementById('fire');
    var ctx = canvas.getContext('2d');
    
    var pixelSize = 4;
    tw = window.innerWidth;
    if (tw > 1900) { // Probably have a 4k display
        pixelSize = 8;
    }

    // For efficiency, only half the width is calculated (and then copied, with a seam in the middle)
    // Also, the heatField needs to be scaled up by pixelSize to be rendered.
    // Therefore, if the half the width isn't exactly divisible by pixelSize, horizontal skew
    // will occur.  This is bad.
    if (tw % (pixelSize * 2) != 0) {
        tw -= (tw % (pixelSize * 2));
    }
    canvas.width = tw;
    canvas.height = window.innerHeight;
    
    var canvasWidth = Math.trunc(Math.trunc(canvas.width / pixelSize) / 2); 
    var canvasHeight = Math.trunc(canvas.height / pixelSize);

    var imageData = new ImageData(canvas.width, canvas.height);
    var data = imageData.data;
    var time = new Date().getTime();

    // Init background
    for (let i = 0; i < canvas.height; i++) {
        let base_index = i * canvas.width * 4;
        for (let j = 0; j < canvas.width; j++) {
            let index = base_index + j * 4;
            data[index] = 0;
            data[index + 1] = 0;
            data[index + 2] = 0;
            data[index + 3] = 0;
        }
    }

    var heatField = [];
    for (let y = 0; y < canvasHeight; y++) {
        let yi = y * canvasWidth;
        for (let x = 0; x < canvasWidth; x++) {
            heatField[yi + x] = 0;
        }
    }

    var heatTransfer = 0.99;
    var fireMoveThreshold = 0.33;
    var lastTime = 0;
    var totalFrames = 0;
    
    function processFire() {
        // request animation frame
        window.requestAnimationFrame(processFire);
        
        var now = new Date().getTime();
        /*dt = now - time;
        if (dt < (1000 / fps))
            return; // skip a frame*/
        time = now;
        totalFrames++;
        if (now - lastTime > 1000) {
            console.log("FPS: " + totalFrames / ((now - lastTime) / 1000));
            lastTime = now;
            totalFrames = 0;
        }

        // Add new heat
        let base_index = (canvasHeight - 1) * canvasWidth;
        for (let x = 0; x < canvasWidth; x++) {
            // Intensity of new heat should range between 0.5 - 1
            heatField[base_index + x] = 1 * noise.simplex3(x / 100, now / 100, now * 100);
            if (heatField[base_index + x] < 0.5) {
                heatField[base_index + x] = 0.5;
            }
        }

        // Move heat, dissipating in the process and generate smoke
        for (let y = 1; y < canvasHeight; y++) {
            // TODO - Generate Smoke
            let base_index = y * canvasWidth;
            for (let x = 0; x < canvasWidth; x++) {
                let heat_amount = heatTransfer * heatField[base_index + x];
                
                if (noise.simplex3(x / 100, (y-1) / 100, now * 100) > fireMoveThreshold) {
                    heatField[base_index - canvasWidth + x] = heat_amount;
                } else {
                    if (x > 0) {
                        if (Math.random() > 0.85) {
                            heatField[base_index - canvasWidth + (x-1)] = heat_amount;
                            continue;
                        }
                    }
                    if (x < canvas.width - 1) {
                            if (Math.random() > 0.85) {
                            //if (noise.simplex3((x+1) / 100, (y-1) / 100, now * 100) > fireMoveThreshold) {
                                heatField[base_index - canvasWidth + (x+1)] = heat_amount;
                                continue;
                            }
                    }
                    if (x > 0) {
                        if (Math.random() > 0.5) {
                            heatField[base_index + (x-1)] = heat_amount;
                            continue;
                        }
                    }
                    if (x < canvas.width - 1) {
                        if (Math.random() > 0.5) {
                            heatField[base_index + (x+1)] = heat_amount;
                        }
                    }
                }
            }
        }
      
        // Render frame
        let ps2 = pixelSize * pixelSize;
        let cwps2 = canvasWidth * ps2 * 2;
        let chunk = canvasWidth * pixelSize * 4 * 2;
        for (let y = 0; y < canvasHeight; y++) {
            let base_heat_index = y * canvasWidth;
            let base_data_index = y * cwps2 * 4;
            for (let x = 0; x < canvasWidth; x++) {
                let heat_index = base_heat_index + x;
                let heat_amount = Math.round(255 * heatField[heat_index]);
                let mid_data_index = base_data_index + x * pixelSize * 4;

                let r = 64;
                let g = 0;
                let b = 0;
                
                if (heat_amount > 172) {
                    r = 256;
                    g = 256;
                    b = 200;
                } else if (heat_amount > 128) {
                    r = 256;
                    g = 128;
                    b = 32;
                } else if (heat_amount > 92) {
                    r = 256;
                    g = 92;
                    b = 24;
                } else if (heat_amount > 64) {
                    r = 256;
                    g = 64;
                    b = 16;
                } else if (heat_amount > 32) {
                    r = 128;
                    g = 16;
                    b = 4;
                } else if (heat_amount > 16) {
                    r = 128;
                    g = 8;
                    b = 0;
                }

                data[mid_data_index] = r;
                data[mid_data_index + 1] = g;
                data[mid_data_index + 2] = b;
                data[mid_data_index + 3] = heat_amount;

                for (let y2 = 0; y2 < pixelSize; y2++) {
                    let inner_data_index = mid_data_index + y2 * chunk;
                    for (let x2 = 0; x2 < pixelSize; x2++) {
                        let data_index = inner_data_index + x2 * 4;
                        let mirror_data_index = data_index + canvasWidth * pixelSize * 4;
                        data[data_index] = r;  
                        data[data_index + 1] = g;
                        data[data_index + 2] = b;
                        data[data_index + 3] = heat_amount;
                        data[mirror_data_index] = r;  
                        data[mirror_data_index + 1] = g;
                        data[mirror_data_index + 2] = b;
                        data[mirror_data_index + 3] = heat_amount;
                    }
                }               
            }
        }
    
        ctx.putImageData(imageData, 0, 0);
    };

    window.requestAnimationFrame(processFire);
});
