/* 
All content and applicable code is ©2022 DranoTheCat.
*/
document.addEventListener("DOMContentLoaded", function() {
    var demoninstructions = document.getElementById("demoninstructions");
    var installationinstructions = document.getElementById("installationinstructions");
    var github = document.getElementById("github");
    var titleimg = document.getElementById("titleimg");
    var titleimgm = document.getElementById("titleimg-m");

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
                break;
        }
    }

});