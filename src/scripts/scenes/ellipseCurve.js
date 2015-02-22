function ellipseCurve() {

	//Code to create EllipseCurve


	//create holder

	var holder = new THREE.Object3D();
	holder.position.set( 0, 0, -20 )
	holder.rotation.set( 0.75, 0.35, 0 )


	//create ellipse curve

	var curve = new THREE.EllipseCurve(
		0,  0,            // ax, aY
		10, 10,           // xRadius, yRadius
		0,  1 * Math.PI,  // aStartAngle, aEndAngle
		false             // aClockwise
	);

	var path = new THREE.Path( curve.getPoints( 50 ) );
	var geometry = path.createSpacedPointsGeometry( 50 ); 
	var material = new THREE.LineBasicMaterial( { color : 0xffcc00, linewidth: 5 } );

	/*

	Notes on paths:

	- `createPointsGeometry` generates geometry from path points (for Line or ParticleSystem objects)
	- `createSpacedPointsGeometry` generates geometry from equidistance sampling along the path
	- The former closes the path.
	- The later seems to leave it path open.

	*/


	// Create line and add to scene

	var line = new THREE.Line( geometry, material );
	line.type = THREE.LinePieces;
	holder.add( line );


	cleanTransition();		
	setupTransition( holder );

}