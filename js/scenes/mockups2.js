function mockups2() {

	var radius = 50;	

	var mesh = new THREE.Mesh(
		new THREE.PlaneGeometry( 180, 60, 1, 1 ),
		new THREE.MeshBasicMaterial( { transparent: true, map: THREE.ImageUtils.loadTexture( 'images/mockups2/green1.png' ) } )
	)

	mesh.material.side = THREE.DoubleSide;
	mesh.material.opacity = 0;
	
	holder.position.set( 0, 0, 0 - radius);

	holder.add( mesh );

	cleanTransition();		
	setupTransition( holder );

}	