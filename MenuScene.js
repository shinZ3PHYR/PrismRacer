var MenuScene = (function (){
		function MenuScene(engine){

	        this.engine = engine;
            this.scene = new BABYLON.Scene(engine);

                 
        // create layer fake backGround
        var background0 = new BABYLON.Layer("b!ack0", "Assets/back.jpg", this.scene, true, new BABYLON.Color4(1, 1, 1, 1));

        //create skid mat
        // this.createSkidMat(); 

        
            this.load();
        
    };