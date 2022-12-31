document.addEventListener("DOMContentLoaded", function() {
    var demoninstructions = document.getElementById("demoninstructions");
    var installationinstructions = document.getElementById("installationinstructions");
    var github = document.getElementById("github");
    var titleimg = document.getElementById("titleimg");
    var titleimgm = document.getElementById("titleimg-m");
    var preview2 = document.getElementById("preview2");
    var preview1 = document.getElementById("preview1");

    titleimg.onmousedown = function(event) {
        if (event.button == 1) {
            event.preventDefault();
            return false;
        }
    }
    titleimg.onmouseup = function(event) {
        switch(event.button) {
            case 0:// left
                window.location = "/index.html";
                break;g
            case 1: // middle
                window.open("/index.html", '_blank');
                break;
        }
    }

    titleimgm.onmousedown = function(event) {
        if (event.button == 1) {
            event.preventDefault();
            return false;
        }
    }
    titleimgm.onmouseup = function(event) {
        switch(event.button) {
            case 0:// left
                window.location = "/index.html";
                break;g
            case 1: // middle
                window.open("/index.html", '_blank');
                window.focus();
                break;
        }
    }

    preview1.onmousedown = function(event) {
        if (event.button == 1) {
            event.preventDefault();
            return false;
        }
    }
    preview1.onmouseup = function(event) {
        switch(event.button) {
            case 0:// left
                window.location = "https://static.dranothecat.com/productivitydemons.dranothecat.com/images/1-preview.png";
                break;
            case 1: // middle
                window.open("https://static.dranothecat.com/productivitydemons.dranothecat.com/images/1-preview.png", '_blank');
                window.focus();
                break;
        }
    }
    preview2.onmousedown = function(event) {
        if (event.button == 1) {
            event.preventDefault();
            return false;
        }
    }
    preview2.onmouseup = function(event) {
        switch(event.button) {
            case 0:// left
                window.location = "https://static.dranothecat.com/productivitydemons.dranothecat.com/images/2-preview.png";
                break;
            case 1: // middle
                window.open("https://static.dranothecat.com/productivitydemons.dranothecat.com/images/2-preview.png", '_blank');
                window.focus();
                break;
        }
    }
    

    github.onmousedown = function(event) {
        if (event.button == 1) {
            event.preventDefault();
            return false;
        }
    }
    github.onmouseup = function(event) {
        switch(event.button) {
            case 0:// left
                window.location = "https://github.com/DranoTheCat/Productivity-Demons";
                break;
            case 1: // middle
                window.open("https://github.com/DranoTheCat/Productivity-Demons", '_blank');
                window.focus();
                break;
        }
    }
    github.onmouseout = function(event) {
        github.src = "images/github.png";
    }
    github.onmouseover = function(event) {
        github.src = "images/github-mover.png";
    }
    
    installationinstructions.onmouseout = function(event) {
        installationinstructions.src = "images/installationinstructions.png";
    }
    installationinstructions.onmouseover = function(event) {
        installationinstructions.src = "images/installationinstructions-mover.png";
    }
    installationinstructions.onmousedown = function(event) {
        if (event.button == 1) {
            event.preventDefault();
            return false;
        }
    }
    installationinstructions.onmouseup = function(event) {
        switch(event.button) {
            case 0:// left
                window.location = "/installationinstructions.html";
                break;
            case 1: // middle
                window.open("/installationinstructions.html", '_blank');
                window.focus();
                break;
        }
    }

    demoninstructions.onmouseout = function(event) {
        demoninstructions.src = "images/demoninstructions.png";
    }
    demoninstructions.onmouseover = function(event) {
        demoninstructions.src = "images/demoninstructions-mover.png";
    }
    demoninstructions.onmousedown = function(event) {
        if (event.button == 1) {
            event.preventDefault();
            return false;
        }
    }
    demoninstructions.onmouseup = function(event) {
        switch(event.button) {
            case 0:// left
                window.location = "/demoninstructions.html";
                break;
            case 1: // middle
                window.open("/demoninstructions.html", '_blank');
                window.focus();
                break;
        }
    }

});