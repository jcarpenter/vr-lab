function roomy1() {

	var m = new THREE.Mesh(
		new THREE.BoxGeometry( 1, 1, 1, 60, 1, 60 ),
		new THREE.MeshBasicMaterial( { color: 0xFFFFFF, wireframe: true } ) 
	);

	cleanTransition();		
	setupTransition(m);

	m.scale.set( 0, 0, 1 );

	t1 = new TWEEN.Tween( m.scale ).
		to( { x:1, y:0.1, z:1 }, 1500 ).
		easing(TWEEN.Easing.Quadratic.InOut);
	
	t1.start();

}