function wipes_1() {

	var holder = new THREE.Object3D();

	// Alpha wipe reveals meshes

	var radiusTop = radiusBottom = 0.5;
	var height = 0.505; // Height of the cylinder. Default is 100.
	var radiusSegments = 60; // Number of segmented faces around the circumference of the cylinder. Default is 8
	var heightSegments = 1; // Number of rows of faces along the height of the cylinder. Default is 1.
	var openEnded = true; // A Boolean indicating whether the ends of the cylinder are open or capped. Default is false, meaning capped.
	var thetaStart = 135 * Math.PI/180;
	var thetaLength = 90 * Math.PI/180;

	var geometry = new THREE.CylinderGeometry( radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded, thetaStart, thetaLength );
	var material = new THREE.MeshBasicMaterial( { color: 0xDB70A9, side: THREE.DoubleSide, transparent:true, opacity: 1 } );
	var mesh = new THREE.Mesh( geometry, material );

	new THREE.TextureLoader().load(
    "images/alpha-2pxblack-leftright.png",
    function( tex )
    {
      tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.repeat.set( 1, 1 );
      tex.offset.set( -1, 0 );
      tex.magFilter = tex.minFilter = THREE.NearestFilter;
      mesh.material.alphaMap = tex;
      mesh.material.needsUpdate = true;

    	new TWEEN.Tween( tex.offset )
				.to( { x: 0 }, 1000 )
				.easing( TWEEN.Easing.Sinusoidal.Out )
				.start();

    } );

	mesh.scale.set( 1, 0.01, 1 );
	mesh.position.set( 0, 0.2, 0 );
	holder.add( mesh );

	var mesh2 = new THREE.Mesh( geometry, material );
	mesh2.scale.set( 1, 0.04, 1 );
	mesh2.position.set( 0, 0, 0 );
	holder.add( mesh2 );

	var mesh3 = new THREE.Mesh( geometry, material );
	mesh3.scale.set( 1, 0.54, 1 );
	mesh3.position.set( 0, -0.2, 0 );
	holder.add( mesh3 );



	cleanTransition();		
	setupTransition( holder );

}