function cylinder1() {

	console.log("Cylinder Spin!")

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
			object.material.opacity = 0;
			object.scale.set( 0.01, 0.01, 0.01 )
			var target = object.position.y + 20;
			var delay = - ( object.position.x / 400 ) + ( object.position.y + 200 ) / 400;

			new TWEEN.Tween( object.scale )
				.to( { x: 1, y: 1, z: 1 }, 1500 )
				.delay( (i * 100) / 5 )
				.easing( TWEEN.Easing.Exponential.Out )
				.start();

			new TWEEN.Tween( object.material )
				.to( { opacity: 1 }, 1500 )
				.easing( TWEEN.Easing.Exponential.Out )
				.start();

		}

		tH.add( group );
		cleanTransition();		
		setupTransition( tH );


}