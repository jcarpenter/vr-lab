function logo_fragment() { 

	//create holder

	var holder = new THREE.Object3D();
	holder.position.set( -10, 0, -20 );
	holder.scale.set( 0.02, 0.02, 0.02 );
	// holder.rotation.set( 0.75, 0.35, 0 )

	// var geometry = new THREE.Mesh(
	// 	new THREE.SphereGeometry( 20, 20, 20 ),
	// 	new THREE.MeshBasicMaterial( { color: 0xe8304c } )
	// );

	var loader = new THREE.ObjectLoader();
	loader.load( 'models/hiro-logo/hiro-logo-2.json', function ( object ) {

		var geometry = object.children[0].geometry;
		// var geometry = new THREE.SphereGeometry( 20, 20, 20 )
		var material = new THREE.MeshBasicMaterial( { color: 0xffffff } );

		// explode geometry into objects
		var group = explode( geometry, material );

		group.children.sort( function ( a, b ) {

			return a.position.x - b.position.x; // sort x
			// return b.position.y - a.position.y; // sort y

		} );

		holder.add( group );

		// animate objects
		for ( var i = 0; i < group.children.length; i ++ ) {

			var fragment = group.children[ i ];

			var targetY = fragment.position.y;			
			fragment.position.setY( targetY - 50 );
			new TWEEN.Tween( fragment.position )
				.to( { y: targetY }, 1500 )
				.delay( i * 8 )
				.easing( TWEEN.Easing.Sinusoidal.Out )
				.onStart( function() {
					//fragment.material.opacity = 1;
				})
				.start();
			
			var targetZ = fragment.position.z;			
			fragment.position.setZ( targetZ + 1000 );
			new TWEEN.Tween( fragment.position )
				.to( { z: targetZ }, 1500 )
				.delay( i * 8 )
				.easing( TWEEN.Easing.Sinusoidal.Out )
				.onStart( function() {
					//fragment.material.opacity = 1;
				})
				.start();

			fragment.scale.set( 0.01, 0.01, 0.01 );
			new TWEEN.Tween( fragment.scale )
				.to( { x:1, y:1, z:1 }, 1500 )
				.delay( i * 8 )
				.easing( TWEEN.Easing.Sinusoidal.Out )
				.start();

		}

		holder.rotation.set( -1.57, 0, 0 );

		new TWEEN.Tween( holder.rotation )
			.to( { x:0 }, 10000 )
			.easing( TWEEN.Easing.Sinusoidal.Out )
			.start();

		/*
			var speed = 2000;
			var rings = object.children[0].children
			var cap = object.children[0].children[rings.length - 1].children[0]
			var material = new THREE.MeshBasicMaterial( { color: 0xffffff, transparent: true, opacity: 1, wireframe:false, side: THREE.DoubleSide } );
			// rings.reverse();

			console.log( rings.length );

			cap.material = material;

			new TWEEN.Tween( cap.material )
				.to ( { opacity: 0 }, 1000 )
				.delay( 2500 )
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
		*/
		
		// object.children[0].position.set( 0, 0, -250 );
		//object.children[0].rotation.set( Math.PI / 2, 0, 0 );

		cleanTransition();		
		setupTransition( holder );

	});

}	