function bond1() {

	var m = new THREE.Mesh(
		new THREE.CylinderGeometry( 2, 2, 10, 32, 20, true ),
		new THREE.MeshBasicMaterial( { color: 0xf8bc4a, wireframe: true } ) 
	);
	
	cleanTransition();		
	setupTransition(m);

	m.position.set( 0, 0, 0);
	m.rotation.set( 1.571, 0, 0 );
	m.scale.set( 1, 0.1, 1 );

	t1 = new TWEEN.Tween( m.scale )
		.to( { x:1, y:1, z:1 }, 3000 )
		.easing(TWEEN.Easing.Quadratic.InOut)
		.start();

	
	t2 = new TWEEN.Tween( m.rotation )
		.to( { x:1.571, y:1.571, z:0 }, 3000 )
		.easing(TWEEN.Easing.Quadratic.InOut)
		.start();

}