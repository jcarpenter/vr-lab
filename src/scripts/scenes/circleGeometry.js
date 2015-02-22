function circleGeometry() {

	//Code to create a circle

	var holder = new THREE.Object3D();
	holder.position.set( 0, 0, -20 )
	holder.rotation.set( 0.75, 0.35, 0 )

	var	radius = 5; 									//Radius of the circle, default = 50.
	var	segments = 32; 								//Number of segments (triangles), minimum = 3, default = 8.
	var	thetaStart = 0; 							//Start angle for first segment, default = 0 (three o'clock position).
	var	thetaLength = 1 * Math.PI;  	//The central angle, often called theta, of the circular sector. The default is 2*Pi, which makes for a complete circle.

	var geometry = new THREE.CircleGeometry( radius, segments, thetaStart, thetaLength );
	geometry.vertices.shift(); //removes center vertex
	var material = new THREE.LineBasicMaterial( { color : 0xffffff, linewidth: 3 } );
	var line = new THREE.Line( geometry, material );
	holder.add( line );

	cleanTransition();		
	setupTransition( holder );

}