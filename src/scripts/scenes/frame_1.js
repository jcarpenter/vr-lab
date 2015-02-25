function frame_1() {
	
	//load frame
	//apply white material to each child object
	//loop through child objects, and animate each's Z scale. Hopefully it works!


	//create holder
	var holder = new THREE.Object3D();


	//load frame
	var loader = new THREE.ObjectLoader();
	loader.load( 'models/frame_01.json', function ( object ) { 

		holder.add( object );
		holder.scale.set( 0.1, 0.1, 0.1 );
		holder.position.set( 0, -10, -50 );

		for( i = 0; i < object.children.length; i++ ){
			
			var edge = object.children[i].children[0];
			console.log( edge );
			
			edge.material = new THREE.MeshBasicMaterial( { color: 0xFFFFFF, transparent: true, opacity: 0.5 } );

			edge.scale.set( 1, 1, 0 );
			new TWEEN.Tween( edge.scale )
				.to( { z: 1 }, 1000 + i * 100 )
				// .delay( i * 50 )
				.easing( TWEEN.Easing.Cubic.Out )
				.start();

		}

	});


	cleanTransition();		
	setupTransition( holder );

}