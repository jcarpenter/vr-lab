function hud1() {

	//create cylinders for different layers
	//create caps for top and bottom
	
	////////////////// 	Cap
		//	//	//	//	Rings
		//	// 	//	//
		//	//			Screens (1 and 2 are at different depths, and at differet X positions)
		//	//
		//	//
		//	// 	//	//	Rings
		//	//	//	//
	//////////////////	Cap


	/* Make caps */

	/* Make rings */

	/* Make screens */

	var circumference = 6.25;
	var radius = circumference / 3.14 / 2;
	var height = circumference / 4;
	var holder = new THREE.Object3D();
	var loader = new THREE.ObjectLoader();

	console.log( radius );

	// 1.00 	Glass
	// 0.90 	Screen elements
	// 0.80 	Screen elements 2
	// 0.75 	Inside of he
	// 0.70		Inside of helmet elements
	// 0.50		Foreground indicators & glowing lights

	/* Remembder to declare screens in order from closest to user, to most distant. This ensures webgl transparencies composite properly */

	function drawSquare( size ) {

		var x1 = 0 - size / 2;
		var x2 = 0 + size / 2;
		var y1 = 0 - size / 2;
		var y2 = 0 + size / 2;

		console.log( x1, y1, x2, y2 );

	    var geometry = new THREE.Geometry();

	    //set 4 points
	    geometry.vertices.push( new THREE.Vector3( x1, y2, 0 ) );
	    geometry.vertices.push( new THREE.Vector3( x1, y1, 0 ) );
	    geometry.vertices.push( new THREE.Vector3( x2, y1, 0 ) );
	    geometry.vertices.push( new THREE.Vector3( x2, y2, 0 ) );
	    geometry.vertices.push( new THREE.Vector3( x1, y2, 0 ) );

		var square = new THREE.Line( 
			geometry, 
			new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 1, transparent: true, opacity: 1 } ) 
		);

	    return square;
	}

	function makeCube( size ){

		var frame = new THREE.Object3D();

		var front = drawSquare( size );
		front.rotation.set( 0, 0, 0 );
		front.position.set( 0, 0, size / 2 );
		frame.add( front );

		var back = drawSquare( size );
		back.rotation.set( 0, 0, 0 );
		back.position.set( 0, 0, 0 - size / 2 );
		frame.add( back );

		var top = drawSquare( size );
		top.rotation.set( Math.PI / 2, 0, 0 );
		top.position.set( 0, size / 2, 0 );
		frame.add( top );

		var bottom = drawSquare( size );
		bottom.rotation.set( Math.PI / 2, 0, 0 );
		bottom.position.set( 0, 0 - size / 2, 0 );
		frame.add( bottom );

		var left = drawSquare( size );
		left.rotation.set( 0, Math.PI / 2, 0 );
		left.position.set( 0 - size / 2, 0, 0 );
		frame.add( left );

		var right = drawSquare( size );
		right.rotation.set( 0, Math.PI / 2, 0 );
		right.position.set( size / 2, 0, 0 );
		frame.add( right );

		var cube = new THREE.Mesh(
			new THREE.BoxGeometry( size, size, size ),
			new THREE.MeshBasicMaterial( { color: 0x22CAF0, transparent: true, opacity: 0.5 } )
		)
		cube.add( frame );

		return cube;

	}


	/* UI layers */

	var ui = new THREE.Mesh(
		new THREE.CylinderGeometry( radius * 0.85, radius * 0.85, height * 0.85, 60, 1, true ),
		new THREE.MeshBasicMaterial( { 
			transparent: true,
			side: THREE.DoubleSide,
			map: THREE.ImageUtils.loadTexture( 'images/hud1/screen-4-2.png' )
		} )
	);
	ui.geometry.applyMatrix( new THREE.Matrix4().makeScale( -1, 1, 1 ) );
	holder.add( ui );

	var ui = new THREE.Mesh(
		new THREE.CylinderGeometry( radius, radius, height, 60, 1, true ),
		new THREE.MeshBasicMaterial( { 
			//color: 0x1796da, 
			side: THREE.DoubleSide, 
			transparent: true, 
			//opacity: 0.25
			map: THREE.ImageUtils.loadTexture( 'images/hud1/screen-4-1.png' )
		} )
	);
	ui.geometry.applyMatrix( new THREE.Matrix4().makeScale( -1, 1, 1 ) );
	holder.add( ui );


	/* Back button */

	var back = new THREE.Object3D();
	back.position.set( -0.5, 0.15, -0.9);
	back.rotation.set( 0, 0.5, 0);

	var cube = makeCube( 0.08 );
	back.add( cube );

	var arrow;
	loader.load( 'models/back.json', function ( object ) {
		arrow = object;
		arrow.scale.set( 0.007, 0.007, 0.007 );
		back.add( arrow );
	});

	holder.add( back );

	cube.scale.set( 2, 0.01, 1 );
	new TWEEN.Tween( cube.scale )
		.to( { x:2, y:1, z:1 }, 1000 )
		.easing( TWEEN.Easing.Cubic.Out )
		.delay( 1000 )
		.start();

	new TWEEN.Tween( cube.rotation )
		.to( { x:0, y:4, z:0 }, 12000 )
		//.start();

	new TWEEN.Tween( cube.position )
		.to( { x:0, y:0, z:-1 }, 8000 )
		//.start();
  	

  	/* More UI layers */

	var ui = new THREE.Mesh(
		new THREE.CylinderGeometry( radius * 1.5, radius * 1.5, height * 1.5, 60, 1, true ),
		new THREE.MeshBasicMaterial( { 
			// color: 0x1796da, 
			side: THREE.DoubleSide, 
			transparent: true, 
			opacity: 0.25,
			map: THREE.ImageUtils.loadTexture( 'images/hud1/screen-4-3.png' )
		} )
	);
	ui.geometry.applyMatrix( new THREE.Matrix4().makeScale( -1, 1, 1 ) );
	ui.position.set( 0, -0.1, 0 )
	holder.add( ui );

	var ui = new THREE.Mesh(
		new THREE.CylinderGeometry( radius * 1.6, radius * 1.6, height / 1.25, 60, 1, true ),
		new THREE.MeshBasicMaterial( { 
			color: 0x1796da, 
			//side: THREE.DoubleSide, 
			transparent: true, 
			opacity: 0.25
			//map: THREE.ImageUtils.loadTexture( 'images/hud1/screen-4-1.png' )
		} )
	);
	ui.geometry.applyMatrix( new THREE.Matrix4().makeScale( -1, 1, 1 ) );
	ui.position.set( 0, -0.1, 0 )
	holder.add( ui );


	cleanTransition();		
	setupTransition( holder );


}	