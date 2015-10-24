window.onload = function () {
    var canvas = document.getElementById("renderCanvas");
    var divFps = document.getElementById("fps");
    var stats = document.getElementById("stats");
    var main = new Main(canvas, divFps, stats);
};