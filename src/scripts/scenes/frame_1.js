function frame_1() {
	
	//load frame
	//apply white material to each child object
	//loop through child objects, and animate each's Z scale. Hopefully it works!

	//frame creator
	//takes width, height, depth, thickness
	//spits out group containing frame
	//each length is offset from parent object3D by it's length (to align pivot)


	//create holder
	var holder = new THREE.Object3D();
	scene.fog = new THREE.Fog( 0x26324F, 1, 50 );



	//create background sphere
	var geometry = new THREE.SphereGeometry( 100, 20, 20 );
	var material = new THREE.MeshBasicMaterial( { color: 0x26324F, side: THREE.BackSide } );
	var mesh = new THREE.Mesh( geometry, material );
	holder.add( mesh );

	//shuffle utility function: shuffles array values
	function shuffle(o){ //v1.0
	    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	    return o;
	};

	//random interger utility function
	//returns a random integer between min (included) and max (excluded)
	function getRandomInt(min, max) {
	  return Math.floor(Math.random() * (max - min)) + min;
	}

	//make frame
	function makeFrame( width, height, depth, thickness, color, opacity ){

		var 	w = width,
					h = height,
					d = depth,
					t = thickness;
					c = color;
					o = opacity;

		var group = new THREE.Group;
		var material = new THREE.MeshBasicMaterial( { color: c, transparent: true, opacity: o } );

		var geometry = new THREE.CubeGeometry( t, t, d, 1, 1, 1 );
		geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0, d/2 ) );
		
		var mesh = new THREE.Mesh( geometry, material );
		mesh.position.set( 0+w/2, 0+h/2, 0-d/2 );
		group.add( mesh );

		var mesh = new THREE.Mesh( geometry, material );
		mesh.position.set( 0+w/2, 0-h/2, 0-d/2 );
		group.add( mesh );

		var mesh = new THREE.Mesh( geometry, material );
		mesh.position.set( 0-w/2, 0-h/2, 0-d/2 );
		group.add( mesh );

		var mesh = new THREE.Mesh( geometry, material );
		mesh.position.set( 0-w/2, 0+h/2, 0-d/2 );
		group.add( mesh );


		var geometry = new THREE.CubeGeometry( t, t, w, 1, 1, 1 );
		geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0, w/2 ) );
		
		var mesh = new THREE.Mesh( geometry, material );
		mesh.position.set( 0-w/2, 0+h/2, 0+d/2 );
		mesh.rotation.set( 0, 0.5*Math.PI, 0);
		group.add( mesh );

		var mesh = new THREE.Mesh( geometry, material );
		mesh.position.set( 0-w/2, 0-h/2, 0+d/2 );
		mesh.rotation.set( 0, 0.5*Math.PI, 0);
		group.add( mesh );

		var mesh = new THREE.Mesh( geometry, material );
		mesh.position.set( 0-w/2, 0-h/2, 0-d/2 );
		mesh.rotation.set( 0, 0.5*Math.PI, 0);
		group.add( mesh );

		var mesh = new THREE.Mesh( geometry, material );
		mesh.position.set( 0-w/2, 0+h/2, 0-d/2 );
		mesh.rotation.set( 0, 0.5*Math.PI, 0);
		group.add( mesh );


		var geometry = new THREE.CubeGeometry( t, t, h, 1, 1, 1 );
		geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0, h/2 ) );
		
		var mesh = new THREE.Mesh( geometry, material );
		mesh.position.set( 0-w/2, 0+h/2, 0+d/2 );
		mesh.rotation.set( 0.5*Math.PI, 0, 0);
		group.add( mesh );

		var mesh = new THREE.Mesh( geometry, material );
		mesh.position.set( 0-w/2, 0+h/2, 0-d/2 );
		mesh.rotation.set( 0.5*Math.PI, 0, 0);
		group.add( mesh );

		var mesh = new THREE.Mesh( geometry, material );
		mesh.position.set( 0+w/2, 0+h/2, 0+d/2 );
		mesh.rotation.set( 0.5*Math.PI, 0, 0);
		group.add( mesh );

		var mesh = new THREE.Mesh( geometry, material );
		mesh.position.set( 0+w/2, 0+h/2, 0-d/2 );
		mesh.rotation.set( 0.5*Math.PI, 0, 0);
		group.add( mesh );


		// group.position.set( 0d/2 )
		// frame.add( group );
		return group;

	}



	//make one frame
	var frame = makeFrame( 30, 5, 10, 0.01 );
	shuffle( frame.children );
	holder.add( frame );

	for( var i = 0; i < frame.children.length; i++ ) {

		var edge = frame.children[i];
		edge.scale = 0;

		new TWEEN.Tween( edge.scale )
			.to( { z: 0  }, 1000 )
			.delay( i * 50 )
			.start();
	}

	// new TWEEN.Tween( frame.rotation )
	// 	.to( { y: 1.57  }, 3000 )
	// 	.start();

	//make bunch of frames
	for( var f = 0; f < 50; f++ ){

		var posX = getRandomInt(-50,50);
		var posY = getRandomInt(-50,50);
		var posZ = getRandomInt(-50,50);

		var w = getRandomInt(5,20);
		var h = getRandomInt(5,20);
		var d = getRandomInt(5,20);

		var frame = makeFrame( w, h, d, 0.05, 0x12B9D7, 1 );
		shuffle( frame.children );
		frame.position.set( posX, posY, posZ );
		holder.add(frame);

		for( var i = 0; i < frame.children.length; i++ ) {

			var edge = frame.children[i];
			edge.scale.z = 0;

			new TWEEN.Tween( edge.scale )
				.to( { z: 1  }, 4000 )
				.delay( i * 50 )
				.easing( TWEEN.Easing.Sinusoidal.Out )
				.start();
		}

		new TWEEN.Tween( frame.position )
			.to( { z: "5"  }, 6000 )
			.easing( TWEEN.Easing.Sinusoidal.Out )
			.start();
	}

	new TWEEN.Tween( edge.scale )
		.to( { z: 0  }, 1000 )
		.delay( i * 50 )
		.start();




	//load alternative frame model (was made in C4D)
	var loader = new THREE.ObjectLoader();
	loader.load( 'models/frame_01.json', function ( object ) { 

		object.scale.set( 0.1, 0.1, 0.1 );
		object.position.set( 0, -10, -50 );
		holder.add( object );

		for( i = 0; i < object.children.length; i++ ){
			
			var edge = object.children[i].children[0];
			
			edge.material = new THREE.MeshBasicMaterial( { color: 0xFFFFFF, transparent: true, opacity: 1, fog: false } );

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