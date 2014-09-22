function fragment2() {

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
		var target = object.position.y + 20;
		var delay = - ( object.position.x / 400 ) + ( object.position.y + 200 ) / 400;

		new TWEEN.Tween( object.position )
			.to( { y: target }, 1500 )
			.delay( ( 1 - delay ) * 800 )
			.easing( TWEEN.Easing.Exponential.Out )
			.start();


	}

	tH.add( group );
	cleanTransition();		
	setupTransition( tH );

}