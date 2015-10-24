var Controller = (function () {
    function Controller() {
        this.c = 0;
    }
    Controller.prototype.keyUp = function (key) {
        switch (key) {
            case 32: 
                Controller.space = false;
                break;
            case 81:
                Controller.moveLeft = false;
                break;
            case 90:
                Controller.moveForward = false;
                break;
            case 68:
                Controller.moveRight = false;
                break;
            case 83:
                Controller.moveBackward = false;
                break;
        }
    };

    Controller.prototype.keyDown = function (key) {
        switch (key) {
            case 32:
                Controller.space = true;
                break;
            case 81:
                Controller.moveLeft = true;
                console.log("left")
                break;
            case 90:
                Controller.moveForward = true;
                console.log("forward")
                break;
            case 68:
                Controller.moveRight = true;
                console.log("right")
                break;
            case 83:
                Controller.moveBackward = true;
                console.log("backward")
                break;
           
                this.c++;
                break;
        }
    };
    Controller.moveForward = false;
    Controller.moveBackward = false;
    Controller.moveLeft = false;
    Controller.moveRight = false;
    Controller.driftMode = false;
    return Controller;
})();