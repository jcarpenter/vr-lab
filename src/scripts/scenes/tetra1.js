function tetra1() {

	var m = new THREE.Mesh(
		new THREE.TetrahedronGeometry( 10, 5 ),
		new THREE.MeshBasicMaterial( { color: 0xFFFFFF, wireframe: true } ) 
	);

	cleanTransition();		
	setupTransition(m);

	m.position.set( 0, 0, -10 );
	m.rotation.set( 1, 1, 1 );
	
}