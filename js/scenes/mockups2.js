function mockups2() {

	var radius = 50;	

	var holder = new THREE.Object3D();

	var mesh = new THREE.Mesh(
		new THREE.PlaneGeometry( 180, 60, 1, 1 ),
		new THREE.MeshBasicMaterial( { transparent: true, map: THREE.ImageUtils.loadTexture( 'images/mockups2/green1.png' ) } )
	)

	mesh.material.side = THREE.DoubleSide;
	
	holder.position.set( 0, 0, 0 - radius);

	holder.add( mesh );

	cleanTransition();		
	setupTransition( holder );

}	