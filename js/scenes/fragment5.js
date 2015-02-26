function fragment5() {

	//create holder
	var geometry = new THREE.IcosahedronGeometry( 10, 3 );
	var material = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: false, transparent: true } );
	material.side = THREE.DoubleSide;
	
	// explode geometry into objects
	var group = explode( geometry, material );

	group.children.sort( function ( a, b ) {

		// return a.position.x - b.position.x; // sort x
		return b.position.y - a.position.y; // sort y

	} );

	// animate objects
	for ( var i = 0; i < group.children.length; i ++ ) {

		var object = group.children[ i ];
		var targetY = object.position.y;
		
		object.position.setY( targetY - 5 );
		object.material.opacity = 1;
		object.scale.set( 0.01, 0.01, 0.01 );

		new TWEEN.Tween( object.position )
			.to( { y: targetY }, 1500 )
			.delay( i * 8 )
			.easing( TWEEN.Easing.Sinusoidal.Out )
			.onStart( function() {
				//object.material.opacity = 1;
			})
			.start();
			
		new TWEEN.Tween( object.scale )
			.to( { x:1.05, y:1.05, z:1.05 }, 1500 )
			.delay( i * 8 )
			.easing( TWEEN.Easing.Sinusoidal.Out )
			.start();

	}
	
	group.position.setZ( 0 );
	cleanTransition();		
	setupTransition( group );

}