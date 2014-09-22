function extrude1() {

	//create holder
	var tH = new THREE.Object3D();

	var rectPoints = [];
	
	rectPoints.push( new THREE.Vector2 (   10,  -5 ) );
	rectPoints.push( new THREE.Vector2 (  10,  5 ) );
	rectPoints.push( new THREE.Vector2 (  -10,  5 ) );
	rectPoints.push( new THREE.Vector2 (  -10, -5 ) );
	
	var rectShape = new THREE.Shape( rectPoints );

	var extrusionSettings = {
		//size: 1,
		amount: 4,
		//curveSegments: 3,
		//bevelThickness: 1,
		//bevelSize: 2,
		bevelEnabled: false,
		material: 0,
		extrudeMaterial: 1
	};
	
	var rectGeo = new THREE.ExtrudeGeometry( rectShape, extrusionSettings );
	
	var materialFront = new THREE.MeshBasicMaterial( { color: 0xffffff, transparent: true, opacity: 0 } );
	var materialSide = new THREE.MeshPhongMaterial( { color: 0xcccccc  } );
	materialSide.side = THREE.DoubleSide;
	var materialArray = [ materialFront, materialSide ];
	var rectMat = new THREE.MeshFaceMaterial( materialArray );

	//var rectMat = new THREE.MeshPhongMaterial( { color: 0xffff00, wireframe: false} );
	
	//create model and add to scene
	var rect = new THREE.Mesh( rectGeo, rectMat );
	tH.add( rect );
	
	// add a wireframe to model
	// var wireframeTexture = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true, transparent: true, opacity: 0.1 } ); 
	// var rect = new THREE.Mesh( rectGeo, wireframeTexture );
	// tH.add( rect );

	tH.add( rect );
	tH.position.set( 0, 0, -50 )
	tH.rotation.set( .75, .75, 0 )
	cleanTransition();		
	setupTransition( tH );


}