function fragment4() {

	//create holder
	var tH = new THREE.Object3D();
	var geometry = new THREE.IcosahedronGeometry( 400, 1 );
	var material = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: false, transparent: true } );
	material.side = THREE.DoubleSide;
	
	// explode geometry into objects
	var group = explode( geometry, material );

	// animate objects
	for ( var i = 0; i < group.children.length; i ++ ) {

		var object = group.children[ i ];
		var destY = object.position.y;
		
		object.position.setY( destY - 100 );
		object.material.opacity = 0;
		object.scale.set( 0.2, 0.2, 0.2 )

		var delay = - ( object.position.x / 400 ) + ( object.position.y + 200 ) / 400;

		new TWEEN.Tween( object.position )
			.to( { y: destY }, 1500 )
			.delay( ( 1 - delay ) * 200 )
			.easing( TWEEN.Easing.Sinusoidal.InOut )
			.start();

		new TWEEN.Tween( object.scale )
			.to( { x:1, y:1, z:1 }, 1500 )
			.delay( ( 1 - delay ) * 200 )
			.easing( TWEEN.Easing.Sinusoidal.InOut )
			.start();

		new TWEEN.Tween( object.material )
			.to( { opacity: 1 }, 1000 )
			.easing( TWEEN.Easing.Sinusoidal.InOut )
			.start();

	}

	new TWEEN.Tween( tH.rotation )
		.to( { x: 2 }, 6000 )
		.start();

	tH.add( group );
	cleanTransition();		
	setupTransition( tH );

}