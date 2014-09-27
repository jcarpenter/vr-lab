function bond2() {

	var m = new THREE.Mesh(
		new THREE.CylinderGeometry( 2, 2, 2, 32, 20, true ),
		new THREE.MeshBasicMaterial( { color: 0xf8bc4a, wireframe: true } ) 
	);
	
	cleanTransition();		
	setupTransition(m);

	m.position.set( 0, 0, -1);
	m.rotation.set( 1.571, 0, 0 );
	m.scale.set( 0, 0, 0 );

	t1 = new TWEEN.Tween( m.scale )
		.to( { x:1, y:2, z:1 }, 3000 )
		.easing(TWEEN.Easing.Quadratic.InOut)
		.start();

	var axis = new THREE.Vector3(.5,.1,.1)
	var angle = { a: 1 };

	t2 = new TWEEN.Tween( m.rotation )
		.to( { y:1.571  }, 3000 )
		.easing(TWEEN.Easing.Quadratic.InOut)
		.onUpdate(function() {
			console.log( angle.a )
		})
		.start();

}