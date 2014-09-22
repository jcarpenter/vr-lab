function cylinder2() {

	//create holder
	var tH = new THREE.Object3D();

	//create cylinder
	var m = new THREE.Mesh(
		new THREE.CylinderGeometry( 2, 2, 4, 40, 20, true ),
		new THREE.MeshBasicMaterial( { color: 0xFFFFFF, wireframe: true } ) 
	);

	m.position.set( 0, 0, 0);
	m.rotation.set( 1.571, 0, 1.571 );
	m.scale.set( 1, 0, 1 );

	m1 = new TWEEN.Tween( m.scale )
		.to( { x:1, y:1, z:1 }, 2000 )
		.easing(TWEEN.Easing.Sinusoidal.InOut)
		.start();

	m2 = new TWEEN.Tween( m.rotation )
		.to( { x:1.571*2  }, 2000 )
		.easing(TWEEN.Easing.Sinusoidal.InOut)
		.onUpdate(function() {
			//console.log( angle.a )
		})
		.start();

	//create cap 1
	var p = new THREE.Mesh(
		new THREE.CircleGeometry( 2, 40, 0, Math.PI * 2 ),
		new THREE.MeshBasicMaterial( { color: 0xFFFFFF, wireframe: true } ) 
	);

	p.position.set( -2, 0, 0 );
	p.rotation.set( 0, 1.571, 0 );
	p.scale.set( 0, 0, 0 );

	p1 = new TWEEN.Tween( p.rotation )
		.to( { z:1.571*1  }, 2000 )
		.easing(TWEEN.Easing.Sinusoidal.InOut)
		.onUpdate(function() {
			//console.log( angle.a )
		})
		.start();

	p2 = new TWEEN.Tween( p.scale )
		.to( { x:1, y:1  }, 2000 )
		.easing(TWEEN.Easing.Sinusoidal.InOut)
		.onUpdate(function() {
			//console.log( angle.a )
		})
		.start();

	//create cap 2
	var l = new THREE.Mesh(
		new THREE.CircleGeometry( 2, 40, 0, Math.PI * 2 ),
		new THREE.MeshBasicMaterial( { color: 0xFFFFFF, wireframe: true } ) 
	);

	l.position.set( 2, 0, 0 );
	l.rotation.set( 0, 1.571, 0 );
	l.scale.set( 0, 0, 0 );

	l1 = new TWEEN.Tween( l.rotation )
		.to( { z:1.571*1  }, 2000 )
		.easing(TWEEN.Easing.Sinusoidal.InOut)
		.onUpdate(function() {
			//console.log( angle.a )
		})
		.start();

	l2 = new TWEEN.Tween( l.scale )
		.to( { x:1, y:1  }, 2000 )
		.easing(TWEEN.Easing.Sinusoidal.InOut)
		.onUpdate(function() {
			//console.log( angle.a )
		})
		.start();

	//create scene
	tH.add(m);
	tH.add(p);
	tH.add(l);
	
	cleanTransition();		
	setupTransition(tH);

	tH.rotation.set( 0, 0, 1.571 );

}