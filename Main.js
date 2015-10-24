'use strict';
var Main = (function () {
    function Main(canvas, divFps, stats) {
        var _this = this;
        this.canvas = canvas;
        this.divFps = divFps;
        this.stats = stats;

        this.startTime = Date.now();
        this.lap = 0;
        this.totalLap = 3;
        this.pastCP = false;
        this.finished = false;
        this.currentLapTime = 0;
        this.lastLapTime = 0;
        this.bestLapTime = 0;
        this.newTime = 0;
        this.elapsed = 0;
        this.lapTime = 0;

        this.gameState = "run";

        if (!BABYLON.Engine.isSupported()) {
            window.alert('Dayum, Browser not supported!');
        } else {
            this.control = new Controller();
            this.engine = new BABYLON.Engine(this.canvas, true);

            this.iScene = new MainScene(this.engine);

            this.scene = this.iScene.getScene();
            // this.scene.debugLayer.show();

            //  this.scene.clearColor = new BABYLON.Color3(1, 1, 1);
            window.addEventListener("resize", function () {
                engine.resize();
            });
        }

        // link camera arrow function
        this.scene.executeWhenReady(function () {
            return;
            // return _this.iniCamera();
        });


        this.engine.runRenderLoop(function () {

           return _this.mainLoop();

       });

        //Module Timer 
        //Set the elapsed time
        this.Timer = function() {
            this.newTime = Date.now();
            this.elapsed = (this.newTime - this.startTime); 
        };

        this.TimeToString=function(time){
            var minutes = Math.floor((time/1000) / 60);  //minutes
            var seconds = Math.floor((time/1000) - (minutes*60));        //secondes

            return minutes.toString() + "." + seconds.toString();
        }

        this.RenderTime = function(id, pTime){
            document.getElementById(id).innerHTML = this.TimeToString(pTime);
        }



        document.addEventListener('keydown', function (event) {
            return _this.keyDown(event);
        });
        document.addEventListener('keyup', function (event) {
            return _this.keyUp(event);
        });
    }
    Main.prototype.keyUp = function (event) {
        // console.log(event.keyCode);
        this.control.keyUp(event.keyCode);
    };

    Main.prototype.keyDown = function (event) {
        //  console.log(event.keyCode);
        this.control.keyDown(event.keyCode);
    };

    Main.prototype.mainLoop = function () {

        if (this.iScene.isLoaded) {

            if (this.scene) {
                // this.divFps.innerHTML = BABYLON.Tools.GetFps().toFixed() + " fps";

                if(this.iScene.car.isLoaded)
                {
                    this.iScene.car.updateCar();
                    this.iScene.car.improveDrive();
                    this.TimeLap(this.iScene);
                }

                if (this.iScene.map != null) 
                {
                    this.iScene.map.checkHole(this.iScene.car);
                };
                
                this.scene.render();

            }
        }
    };

    Main.prototype.TimeLap = function(scene)
    {

        this.Timer();
        this.lapTime = this.elapsed - this.lastLapTime;
        this.RenderTime("current_lap_time_value", this.lapTime);
        // console.log(scene.car.model);
        // console.log(scene.map.finishLine);

        if (scene.car.model.intersectsMesh(scene.map.finishLine, false) && this.pastCP) 
        {   
            console.log("dayum");
            if(this.lapTime < this.bestLapTime || this.bestLapTime == 0){
                this.bestLapTime = this.lapTime;
                this.RenderTime("fast_lap_time_value", this.bestLapTime);
            }
            this.RenderTime("last_lap_time_value", this.lapTime);
            this.lastLapTime = this.elapsed;
            this.lapTime = 0;


            this.lap+=1;
            this.pastCP = false;
            if(this.lap == this.totalLap)
            {
                this.finished = true;
                console.log("GAME FINISHED");
            }
        } 
        if (scene.car.model.intersectsMesh(scene.map.checkPoint, false)) 
        {
            this.pastCP = true;

        }
    }

    Main.prototype.iniCamera = function () {
        if (this.scene.activeCamera) {
            //scene.enablePhysics();
            // this.scene.activeCamera.attachControl(this.canvas);

        }
    };
    return Main;
})();

