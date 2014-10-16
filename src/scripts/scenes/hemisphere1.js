function hemisphere1() { 

	var loader = new THREE.ObjectLoader();
	loader.load( 'models/test-4.json', function ( object ) {

		var material = new THREE.MeshBasicMaterial( { color: 0xffffff, transparent: true, opacity: 1, wireframe:true, side: THREE.DoubleSide } );

		var rings = object.children[0].children
		rings.reverse();

		for ( i = 0; i < rings.length; i++ ){
			
			var r = rings[i].children[0];
			r.material = material;

			var delay = i * 180;
			
			/*
			r.position.set( 0, 0, i * -20 );
			new TWEEN.Tween( r.position )
				.to( { x:0, y:0, z:0 }, 2000 )
				.delay( delay )
				.start();
			*/

			r.scale.set( 1, 1, 0.01 );
			new TWEEN.Tween( r.scale )
				.to ( { x:1, y:1, z:1 }, 2000 )
				.delay( delay )
				.start();

			r.rotation.set( 0, 0, 1.57 );
			new TWEEN.Tween( r.rotation )
				.to ( { x:0, y:0, z:0 }, 2000 )
				.delay( delay )
				.start();

		}
		
		cleanTransition();		
		setupTransition( object );

	});

}	