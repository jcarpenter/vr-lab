function extrudeShape() {

	//Code to extrude a shape...

	//ExtrudeGeometry works as follows...
	//* Put Shape + extrusion settings into ExtrudeGeometry
	//* Put ExtrudeGeometry + Material into Mesh


	//create holder

	var holder = new THREE.Object3D();
	holder.position.set( 0, -10, -20 )
	holder.rotation.set( -45 * Math.PI/180, 0.5, 0 )


	//create shape to extrude

	var radius = 10;
	var start = 0;
	var end = 180;
	var numberOfPoints = (end - start) / 1.5

	var curve = new THREE.EllipseCurve(
		0,  0,            		// ax, aY
		10, 10,           		// xRadius, yRadius
		start * Math.PI/180,  // aStartAngle
		end * Math.PI/180,  	// aEndAngle
		false             		// aClockwise
	);

	var shape = new THREE.Shape( curve.getPoints( numberOfPoints ) );


	//create extrusion geometry

	var extrusionSettings = {
		amount: 4,
		bevelEnabled: false,
		material: 0,
		extrudeMaterial: 1
	};
	
	var geometry = new THREE.ExtrudeGeometry( shape, extrusionSettings );
	
	var materialCaps = new THREE.MeshBasicMaterial( { color: 0xffffff, transparent: true, opacity: 0 } );
	var materialSide = new THREE.MeshPhongMaterial( { color: 0xcccccc  } );
	materialSide.side = THREE.DoubleSide;
	var materialArray = [ materialCaps, materialSide ];
	var material = new THREE.MeshFaceMaterial( materialArray );
	

	//create mesh and add to scene

	var mesh = new THREE.Mesh( geometry, material );
	mesh.position.set( 0, 0, 0 );
	holder.add( mesh );	

	// mesh.scale.setZ( 0 );
	// new TWEEN.Tween( mesh.scale )
	// 	.to ( { x:1, y:1, z:2 }, 800 )
	// 	.delay( 200 )
	// 	.easing( TWEEN.Easing.Cubic.Out )
	// 	.start();

	cleanTransition();		
	setupTransition( holder );

}