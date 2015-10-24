'use strict';
function Map(scene, loader){
	scene.enablePhysics();
    var mapParent = new BABYLON.Mesh("mapParent", scene);
    var mapTask = loader.addMeshTask("map", "", "assets/", "RaceMap.babylon");
    var texture = new BABYLON.Texture("assets/outUVRaceMap2.png", scene);
    var map = new BABYLON.StandardMaterial("nomMat50", scene);
    var modelMap = BABYLON.Mesh.CreateGround("Map", 9.5, 5.5, 0, scene);
        modelMap.isVisible = false;

    //creation des colliders de Hors Map
    this.horsMap = BABYLON.Mesh.CreateBox("HorsMap1", 2.1, scene);
    this.horsMap.parent = modelMap;
    this.horsMap.scaling.y = 0.01;
    this.horsMap.scaling.x = 2;
    this.horsMap.isVisible = false;

    this.horsMap2 = BABYLON.Mesh.CreateBox("HorsMap2", 2.1, scene);
    this.horsMap2.parent = modelMap;
    this.horsMap2.scaling.y = 0.01;
    this.horsMap2.scaling.x = 2.2;
    this.horsMap2.scaling.z = 0.9;
    this.horsMap2.isVisible = false;

    this.horsMap3 = BABYLON.Mesh.CreateBox("HorsMap3", 2.1, scene);
    this.horsMap3.parent = modelMap;
    this.horsMap3.scaling.y = 0.01;
   	this.horsMap3.scaling.x = 2.4;
    this.horsMap3.scaling.z = 0.8;
    this.horsMap3.isVisible = false;

    this.horsMap4 = BABYLON.Mesh.CreateBox("HorsMap4", 2.1, scene);
    this.horsMap4.parent = modelMap;
    this.horsMap4.scaling.y = 0.01;
    this.horsMap4.scaling.x = 2.6;
    this.horsMap4.scaling.z = 0.7;
    this.horsMap4.isVisible = false;
    map.diffuseTexture = texture;


    mapTask.onSuccess = function (task) {
        var track = task.loadedMeshes[0];
        // console.log(track);

        track.position.y = modelMap.position.y;
        track.parent = modelMap;
        track.material = map;
        track.position.y -= 0.36;
        track.position.x -= 0.735;
        track.rotation.x = Math.PI/2;

        modelMap.scaling.x = 15;
        modelMap.scaling.y = 10;
        modelMap.scaling.z = 10;
        modelMap.rotation.z = Math.PI*0/180;

    this.mapBody = modelMap.setPhysicsState({ impostor: BABYLON.PhysicsEngine.PlaneImpostor, mass: 0, friction: 0, restitution:0 });
        
        // track.scaling = new BABYLON.Vector3(2, 2, 2);
    }
    	//matBB

    var matBB = new BABYLON.StandardMaterial("matBB", scene);
    	matBB.emissiveColor = new BABYLON.Color3(1, 1, 1);
    	matBB.wireframe = true;


            //finish line
    this.finishLine = new BABYLON.Mesh.CreateBox("finishLine", 2, scene);
    var textureFinish = new BABYLON.Texture("assets/damier.png", scene);
    var materialFinish = new BABYLON.StandardMaterial("fl", scene);
    var finishPos = new BABYLON.Vector3(modelMap.position.x + 8, modelMap.position.y, modelMap.position.z - 20);
    var finishScale = new BABYLON.Vector3(0.2, 0.01, 0.8);

    materialFinish.diffuseTexture = textureFinish;
    this.finishLine.material = materialFinish;
    this.finishLine.position = new BABYLON.Vector3(modelMap.position.x + 8, modelMap.position.y, modelMap.position.z - 20);
    this.finishLine.scaling = new BABYLON.Vector3(3, 0.05, 8);
    this.finishLine.computeWorldMatrix(true);

    //finish collider
    this.finishCollider = BABYLON.Mesh.CreateBox("finishCollider", 20, scene);
    this.finishCollider.material = matBB;
    this.finishCollider.position = finishPos; 

    this.finishCollider.scaling = finishScale;

            //checkpoint
    this.checkPoint = new BABYLON.Mesh.CreateBox("finishLine", 2, scene);
    this.checkPoint.id = "checkPoint";
    this.checkPoint.position = new BABYLON.Vector3(modelMap.position.x +8, modelMap.position.y, modelMap.position.z +20);
    this.checkPoint.scaling = new BABYLON.Vector3(3, 0.05, 8);
    var textureCP = new BABYLON.Texture("assets/cp.jpg", scene);
    var materialCP = new BABYLON.StandardMaterial("cp", scene);
    materialCP.diffuseTexture = textureCP;
    this.checkPoint.material = materialCP;
    this.checkPoint.computeWorldMatrix(true);

            //checkPoint Collider
    this.checkPointCollider = BABYLON.Mesh.CreateBox("finishCollider", 20, scene);
            this.checkPointCollider.material = matBB;
            this.checkPointCollider.position = new BABYLON.Vector3(modelMap.position.x +8, modelMap.position.y, modelMap.position.z +20);
            this.checkPointCollider.scaling = new BABYLON.Vector3(0.2, 0.01, 0.8);
}
Map.prototype.checkHole = function(car){
	_this = this;
	if (car.model.intersectsMesh(_this.horsMap, false) || car.model.intersectsMesh(_this.horsMap2, false) || car.model.intersectsMesh(_this.horsMap3, false) || car.model.intersectsMesh(_this.horsMap4, false))
	{
		// console.log(car.carBody);
		car.carBody.body.position.y-=0.5;
	}
}