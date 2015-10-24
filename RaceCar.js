function RaceCar(scene){

	this.body;
	this.rotationQuaternion = 2*Math.PI;
		
		// this.camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 15,-50), scene);
		// this.camera.minZ = 0.1;
		// this.camera.setTarget(BABYLON.Vector3.Zero());
		// this.camera.attachControl(canvas, false);

		
		

		
		// var ground = new BABYLON.Mesh.CreateGround('ground1', 15, 10, 2, scene);
		// ground.position.y = -1;
		// ground.material = bilard;

		var loader = new BABYLON.AssetsManager(scene);

		var meshTask = loader.addMeshTask("map", "", "", "RaceMap.babylon");
		var meshTask2 = loader.addMeshTask("car", "", "", "RaceCar.babylon");
		// Fonction appelée quand le chargement de l’objet est terminé
		var animationBox = new BABYLON.Animation("anim", "rotation.x", 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);
		// var animationBox2 = new BABYLON.Animation("anim2", "material.diffuseColor", 60, BABYLON.Animation.ANIMATIONTYPE_COLOR3, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);
		var keys = [];
		var keys2 = []; 

		keys.push({ frame: 0, value: 1},{ frame: 100, value: 10});
		keys2.push({ frame: 0, value: 1},{ frame: 100, value: 10});
		var model = BABYLON.Mesh.CreateBox("car", 2, scene);
		// model.isVisible = false;
		var modelMap = BABYLON.Mesh.CreateGround("map", 10, 10, 10, scene);
		// modelMap.isVisible = false;
		animationBox.setKeys(keys);
}