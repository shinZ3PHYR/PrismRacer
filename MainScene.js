'use strict';
var MainScene = (function (){
  function MainScene(engine){

   this.engine = engine;
   this.scene = new BABYLON.Scene(engine);

   this.scene.enablePhysics();
   this.scene.setGravity(new BABYLON.Vector3(0, -20, 0));

   this.camera = null;
   this.loader;

   this.car = null;

    // this.background = new BABYLON.Layer("back0", "assets/bg.jpg", this.scene, true, new BABYLON.Color4(1,1,1,1));

    this.isLoaded = false;
    this.scene.enablePhysics();




        // create layer fake backGround
        // var background0 = new BABYLON.Layer("back0", "Assets/back.jpg", this.scene, true, new BABYLON.Color4(1, 1, 1, 1));

        //create skid mat
        // this.createSkidMat(); 

        
        this.load();
        
    };

    MainScene.prototype.load = function () {

        var _this = this;

        _this.loader = new BABYLON.AssetsManager(this.scene);


        
        _this.addMap(_this.scene);
        _this.car = new Car(_this.scene);
        _this.car.load(this.loader)

    // while(!_this.car.isLoaded)
    // {
    // }

    _this.loader.load();

    // console.log(_this.car);
    // while(!_this.car.isLoaded){
    //     console.log("addLight&Camera");



    
    _this.loader.onFinish = function(task)
    {

        // _this.car_m = new BABYLON.Mesh("CarMesh", _this.scene);
        
        // console.log(_this.car);
        _this.isLoaded = true; 
        _this.addLightAndCamera();
        // console.log("dayum");
    }

};

MainScene.prototype.getScene = function () {
    var _this = this
    return _this.scene;
};

MainScene.prototype.addLightAndCamera = function () {
    var _this = this;

    _this.camera = new BABYLON.FollowCamera("FollowCam", new BABYLON.Vector3(0, 15, -45), this.scene);
    _this.camera.radius = 15; // how far from the object to follow
    _this.camera.heightOffset = 5; // how high above the object to place the camera
    _this.camera.rotationOffset = 270; // the viewing angle
    _this.camera.cameraAcceleration = 0.05 // how fast to move
    _this.camera.maxCameraSpeed = 20 // speed limit
    _this.camera.target = _this.car.model;
    _this.scene.activeCamera = this.camera;

    _this.light = new BABYLON.DirectionalLight("DirLight", new BABYLON.Vector3(0.2, -1, 0), this.scene);
    _this.light.position = new BABYLON.Vector3(0, 600, 0);
    


    // this.camera.keysDown = [67];
    // this.camera.keysLeft = [67];
    // this.camera.keysUp = [67];
    // this.camera.keysRight = [67];

    // camera.minZ = 10.0;
    _this.scene.ambientColor = new BABYLON.Color3(0.3, 0.3, 0.3);
    _this.shadowGenerator = new BABYLON.ShadowGenerator(2048, this.light);
};

MainScene.prototype.addMap = function(scene){

    this.map = new Map(scene, this.loader);   
    // this.loader.load();
}
    // MainScene.isLoaded = false;
    return MainScene;
})();
