function cylinderPaths() {

	//Code to create cylinder slices...

	//create holder

	var holder = new THREE.Object3D();
	holder.position.set( 0, 0, 0 )
	holder.rotation.set( 0, 0, 0 )

	var radiusTop = radiusBottom = 0.5;
	var height = 0.15; // Height of the cylinder. Default is 100.
	var radiusSegments = 60; // Number of segmented faces around the circumference of the cylinder. Default is 8
	var heightSegments = 1; // Number of rows of faces along the height of the cylinder. Default is 1.
	var openEnded = true; // A Boolean indicating whether the ends of the cylinder are open or capped. Default is false, meaning capped.
	var thetaStart = 90 * Math.PI/180;
	var thetaLength = 180 * Math.PI/180;


	//create cylinder
	var mesh = new THREE.Mesh(
		new THREE.CylinderGeometry( radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded, thetaStart, thetaLength ),
		new THREE.MeshPhongMaterial( { color: 0xffffff, side: THREE.DoubleSide, transparent:true, opacity: 0.5 } )
	);	


	//create mesh and add to scene

	holder.add( mesh );	


	//animate

	mesh.scale.setY( 0 );
	new TWEEN.Tween( mesh.scale )
		.to ( { y:2 }, 800 )
		.delay( 200 )
		.easing( TWEEN.Easing.Cubic.Out )
		.start();


	cleanTransition();		
	setupTransition( holder );

}