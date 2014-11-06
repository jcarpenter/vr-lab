function hemisphere4() { 

	var loader = new THREE.ObjectLoader();
	loader.load( 'models/test-4.json', function ( object ) {

		var speed = 2000;
		var rings = object.children[0].children
		var cap = object.children[0].children[rings.length - 1].children[0]
		var material = new THREE.MeshBasicMaterial( { color: 0xffffff, transparent: true, opacity: 1, wireframe:false, side: THREE.DoubleSide } );
		// rings.reverse();

		console.log( rings.length );

		cap.material = material;

		new TWEEN.Tween( cap.material )
			.to ( { opacity: 0 }, 1000 )
			.delay( 2500v )
			.easing( TWEEN.Easing.Cubic.InOut )
			.onComplete( function(){
				cap.visible = false;
			} )
			.start();

		for ( i = 0; i < rings.length - 1; i++ ){
			
			var r = rings[i].children[0];
			r.material = material;

			//console.log( i )

			var delay = i * 180;
			
			var pos = r.position.z
			//r.position.set( 0, 0, finalPos + 100 );
			new TWEEN.Tween( r.position )
				.to( { z: pos + 40 }, speed )
				.delay( delay )
				.easing( TWEEN.Easing.Cubic.InOut )
				.start();
			
			new TWEEN.Tween( r.material )
				.to( { opacity: 0 }, speed - 400 )
				.delay( delay )
				.easing( TWEEN.Easing.Cubic.InOut )
				.start();

			// r.scale.set( 3, 3, 0 );
			new TWEEN.Tween( r.scale )
				.to ( { x:1, y:1, z:1 }, 2000 )
				.delay( delay + 100 )
				//.start();

			//r.rotation.set( 0, 0, 1.57 );
			new TWEEN.Tween( r.rotation )
				.to ( { x:0, y:0, z:0 }, 2000 )
				.delay( delay )
				//.start();

		}
		
		
		// object.children[0].position.set( 0, 0, -250 );
		//object.children[0].rotation.set( Math.PI / 2, 0, 0 );
		console.log( object );
		console.log( "tets" )

		cleanTransition();		
		setupTransition( object );

	});

}	