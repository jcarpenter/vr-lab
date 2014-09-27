function cylinder3() {

	//create holder
	var tH = new THREE.Object3D();

	//create cylinder
	var m = new THREE.Mesh(
		new THREE.CylinderGeometry( 2, 2, 4, 40, 20, true ),
		new THREE.MeshBasicMaterial( { color: 0xFFFFFF, wireframe: true, transparent: true } ) 
	);

	m.position.set( 0, 0, 0);
	m.rotation.set( 1.571, 0, 1.571 );
	m.scale.set( 1, 1, 1 );
	
	m1 = new TWEEN.Tween( m.scale )
		.to( { x:1, y:0, z:1 }, 1000 )
		.easing(TWEEN.Easing.Sinusoidal.InOut)
		.start();

	m2 = new TWEEN.Tween( m.material )
		.to( { opacity:0 }, 900 )
		.easing(TWEEN.Easing.Sinusoidal.InOut)
		.start();

	//create cap 1
	var p = new THREE.Mesh(
		new THREE.CircleGeometry( 2, 40, 0, Math.PI * 2 ),
		new THREE.MeshBasicMaterial( { color: 0xFFFFFF, wireframe: true, transparent: true } ) 
	);

	p.position.set( -2, 0, 0 );
	p.rotation.set( 0, 1.571, 0 );

	p1 = new TWEEN.Tween( p.scale )
		.to( { x:0, y:0, z:1 }, 1000 )
		.easing(TWEEN.Easing.Sinusoidal.InOut)
		.start();

	p2 = new TWEEN.Tween( p.material )
		.to( { opacity:0 }, 900 )
		.easing(TWEEN.Easing.Sinusoidal.InOut)
		.start();

	//create cap 2
	var l = new THREE.Mesh(
		new THREE.CircleGeometry( 2, 40, 0, Math.PI * 2 ),
		new THREE.MeshBasicMaterial( { color: 0xFFFFFF, wireframe: true, transparent: true } ) 
	);

	l.position.set( 2, 0, 0 );
	l.rotation.set( 0, 1.571, 0 );

	l1 = new TWEEN.Tween( l.scale )
		.to( { x:0, y:0, z:1 }, 1000 )
		.easing(TWEEN.Easing.Sinusoidal.InOut)
		.start();

	l2 = new TWEEN.Tween( l.material )
		.to( { opacity:0 }, 900 )
		.easing(TWEEN.Easing.Sinusoidal.InOut)
		.start();

	//create scene
	tH.add(m);
	tH.add(p);
	tH.add(l);
	cleanTransition();		
	setupTransition(tH);

	tH.rotation.set( 0, 0, 1.571 );

}