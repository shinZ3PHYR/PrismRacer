function Car(scene){
    
    // console.log("new car");
     //asset management
    // mesh
    _this = this;
    this.scene = scene;
    this.isLoaded = false;
    this.body = null;
    this.model = null;
   
    this.wfl = null;
    this.wfr = null;
    this.wbl = null;
    this.wbr = null;
        // dummy newMeshes
        this.car = null;
        
        // car physic
        this.wheelDiameter = 8;
        this.modelScale = 1;
        
        this.carOrientation = 2*Math.PI;


        this.wheelOrientation = 0;
        
       
        this.MAX_WHEEL_ROTATION = 0.6;
        
        this.STEERING_RADIUS_RATIO = 0.05;
       
        
}
Car.prototype.load = function(loader)
{
    // console.log('try to load');
    var _this = this;
    
    
    var meshTask = loader.addMeshTask("car", "", "assets/", "RaceCar.babylon");
    var wheel = new BABYLON.Mesh("Wheel", _this.scene);
    meshTask.onSuccess =function(task)
    { 
        for(var i = task.loadedMeshes.length - 1; i > 0 ; i--)
        {
            if(task.loadedMeshes[i].id == "chrome0" || task.loadedMeshes[i].id == "tire")
            {
                _this.wbl = new BABYLON.Mesh("wbl", _this.scene);
                task.loadedMeshes[i].parent = _this.wbl;
                _this.wbl.position.z = 0;

                        
            }
            if(task.loadedMeshes[i].id == "chrome1" || task.loadedMeshes[i].id == "tire0")
            {
                _this.wbr = new BABYLON.Mesh("wbr", _this.scene);
                task.loadedMeshes[i].parent = _this.wbr;
                task.loadedMeshes[i].position.z += 0.1; //                          
            }
            if(task.loadedMeshes[i].id == "chrome2" || task.loadedMeshes[i].id == "tire1")
            {
                _this.wfl = new BABYLON.Mesh("wfl", _this.scene);
                task.loadedMeshes[i].parent = _this.wfl;
                
            }
            if(task.loadedMeshes[i].id == "chrome3" || task.loadedMeshes[i].id == "tire2")
            {
                _this.wfr = new BABYLON.Mesh("wfr", _this.scene);
                task.loadedMeshes[i].parent = _this.wfr;
                
            }

        }
        _this.model = BABYLON.Mesh.CreateBox("car", 4, _this.scene);

        for(var i = 0; i < task.loadedMeshes.length; i++)
        {
            task.loadedMeshes[i].parent = _this.model;

            task.loadedMeshes[i].position.x += 0.1;
            task.loadedMeshes[i].position.z +=3;
            task.loadedMeshes[i].position.y -=1;
            task.loadedMeshes[i].rotation.y = Math.PI*90/180;
            _this.model.rotation.z = Math.PI*0/180;
            _this.model.position.z = -15;
            _this.model.position.y = 5;
            _this.model.position.x = 0;

            _this.model.isVisible = false;
        }


        _this.carBody = _this.model.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, mass: 1500, friction: 0, restitution:0 });
        _this.model.checkCollisions = true;
        // console.log(_this.model);     
        _this.isLoaded = true;
    }
    meshTask.onFail =function(task)
    { 
        console.log("dayum, Failed to load mesh !");
    }

};

Car.prototype.updateCar = function (newMeshes) {


    this.carBody.body.setOrientation(0,this.carOrientation,0);
    // this.body.body.sleeping = false;

    this.carBody.body.linearVelocity.scaleEqual(1);
    if(Controller.moveLeft)
    {
        this.carOrientation -= Math.PI*2/180;
        this.carBody.body.linearVelocity.scaleEqual(0.9777777);
    }
    else if(Controller.moveRight)
    {
        this.carOrientation += Math.PI*2/180;
    }
    else if(Controller.moveForward)
    {
        // this.wheeling(deltaTime);
        // console.log(this.carOrientation);
        var x = Math.cos(this.carOrientation);
        var z = Math.sin(this.carOrientation);
        this.model.applyImpulse(new BABYLON.Vector3(x, 0, -z), this.model.position);
        // this.carBody.body.linearVelocity+=0.01;
    }
    else if(Controller.moveBackward)
    {
        var x = Math.cos(this.carOrientation);
        var z = Math.sin(this.carOrientation);
        this.model.applyImpulse(new BABYLON.Vector3(-x*0.5, 0, z), this.model.position);
        // this.carBody.body.linearVelocity-=0.01;
    }

};
Car.prototype.improveDrive = function(){
    _this = this;
    if (_this.carBody != null)
    {
        // _this.carBody.body.linearVelocity.scaleEqual(1);
        _this.carBody.body.angularVelocity.scaleEqual(1000);
    }
}
Car.prototype.wheeling = function(deltaTime){
    
    

    if(Controller.moveForward){
        // this.wbl.rotation = new BABYLON.Vector3(Math.sin(deltaTime), 0, 0);
        // i ++;
        // console.log(this.wbl.rotation);
    }
}

