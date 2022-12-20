// start effect when dom is loaded
document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById('fire');
    var ctx = canvas.getContext('2d');
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;
    var intensity = null;
    var fps = 13;
    var threshold = 0.5;
    var imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    var data = imageData.data;
    var numPixels = data.length / 4;
    
    var colors = [];
    
    for (var i = 0; i < 256; i++) {
        var color = [];
        color[0] = color[1] = color[2] = 0;
        colors[i] = color;
    }
    
    for (var i = 0; i < 32; ++i) {
        colors[i][2] = i << 1;
        colors[i + 32][0] = i << 3;
        colors[i + 32][2] = 64 - (i << 1);
        colors[i + 64][0] = 255;
        colors[i + 64][1] = i << 3;
        colors[i + 96][0] = 255;
        colors[i + 96][1] = 255;
        colors[i + 96][2] = i << 2;
        colors[i + 128][0] = 255;
        colors[i + 128][1] = 255;
        colors[i + 128][2] = 64 + (i << 2);
        colors[i + 160][0] = 255;
        colors[i + 160][1] = 255;
        colors[i + 160][2] = 128 + (i << 2);
        colors[i + 192][0] = 255;
        colors[i + 192][1] = 255;
        colors[i + 192][2] = 192 + i;
        colors[i + 224][0] = 255;
        colors[i + 224][1] = 255;
        colors[i + 224][2] = 224 + i;
    }
    
    // Let's pixelate it by clamping nearby values
    for (let i = 0; i < 24; i++) {
        for (let j = 0; j < 10; j++) {
            colors[i*10 + j][0] = colors[i*10][0];
            colors[i*10 + j][1] = colors[i*10][1];
            colors[i*10 + j][2] = colors[i*10][2];
        }
    }
    
    var fire = [];
    // init fire array
    for (var i = 0; i < canvasWidth * canvasHeight; i++) {
        fire[i] = 0;
    }
    
    var time = new Date().getTime();
    
    function randomizeThreshold() {
        threshold += Math.random() * 0.2 - 0.1;
        threshold = Math.min(Math.max(threshold, 0.5), 0.8);
    }
    
    function burnBurnBurn() {
        // request animation frame
        window.requestAnimationFrame(burnBurnBurn);
        var now = new Date().getTime();
        dt = now - time;
        
        if (dt < (1000 / fps))
            return; // skip a frame
            
        time = now;
        
        var bottomLine = canvasWidth * (canvasHeight - 1);
        
        // draw random pixels at the bottom line
        // The 16 is there to pixelate it
        for (var x = 0; x < canvasWidth; x+=16) {
            var value = 0;
            
            if (Math.random() > threshold)
                value = 200;
                
            for (let j = 0; j < 16; j++) {
                fire[bottomLine + x + j] = value;
            }
            
        }

        
        // move flip upwards, start at bottom
        var value = 0;
        
        for (var y = 0; y < canvasHeight; ++y) {
            for (var x = 0; x < canvasWidth; ++x) {
                if (x == 0) {
                    value = fire[bottomLine];
                    value += fire[bottomLine];
                    value += fire[bottomLine - canvasWidth];
                    value /= 3;
                } else if (x == canvasWidth -1) {
                    value = fire[bottomLine + x];
                    value += fire[bottomLine - canvasWidth + x];
                    value += fire[bottomLine + x - 1];
                    value /= 3;
                } else {
                    value = fire[bottomLine + x];
                    value += fire[bottomLine + x + 1];
                    value += fire[bottomLine + x - 1];
                    value += fire[bottomLine - canvasWidth + x];
                    value /= 4;
                }
                
                if (value > 1)
                    value -= 1;
                
                value = Math.floor(value);
                var index = bottomLine - canvasWidth + x;
                fire[index] = value;
            }
            
            bottomLine -= canvasWidth;
        }
        
        var skipRows = 2; // skip the bottom 2 rows
        
        // render the flames using our color table
        for (var y = skipRows; y < canvasHeight; ++y) {
            for (var x = 0; x < canvasWidth; ++x) {
                var index = y * canvasWidth * 4 + x * 4;
                var value = fire[(y - skipRows) * canvasWidth + x];
                
                data[index] = colors[value][0];
                data[++index] = colors[value][1];
                data[++index] = colors[value][2];
                if (colors[value][0] > 1) {
                    data[++index] = colors[value][0];
                } else {
                    data[++index] = 0;
                }
            }
        }
        
        // sometimes change fire intensity
        if (intensity == null) {
            if (Math.random() > 0.95) {
                randomizeThreshold();
            }
        }
        
        ctx.putImageData(imageData, 0, 0);
    };

    window.requestAnimationFrame(burnBurnBurn);
});