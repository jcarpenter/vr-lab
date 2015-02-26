function siteload_1() {
	
	// Alpha wipes used to create "close your eyes" transition effect
	
	var holder = new THREE.Object3D();



	//random interger utility function
	//returns a random integer between min (included) and max (excluded)
	function getRandomInt(min, max) {
	  return Math.floor(Math.random() * (max - min)) + min;
	}

	//returns a random number between min (inclusive) and max (exclusive)
	function getRandomArbitrary(min, max) {
	  return Math.random() * (max - min) + min;
	}

	// Stand-in for current site

	var geometry = new THREE.SphereGeometry( 200, 20, 20 );
	var material = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'images/backgrounds/sechelt-1.png' ), side: THREE.BackSide } );
	var mesh = new THREE.Mesh( geometry, material );
	holder.add( mesh );


	// Gray background

	var geometry = new THREE.SphereGeometry( 200, 20, 20 );
	var material = new THREE.MeshBasicMaterial( { wireframe: false, color: 0x0E131E, transparent: true, opacity: 0, side: THREE.DoubleSide } );
	var mesh = new THREE.Mesh( geometry, material );
	holder.add( mesh );

	new TWEEN.Tween( mesh.material )
		.to( { opacity: 1 }, 1500 )
		.easing( TWEEN.Easing.Sinusoidal.Out )
		.start();

	//Note: When you change any property of a material or texture after it has been used by renderer, you need to set `tex.needsUpdate = true` (where 'tex' is variable name for the material or texture).



	//Dome reveal

	var geometry = new THREE.SphereGeometry( 199, 20, 20, 0, 360 * Math.PI/180, 0, 90 * Math.PI/180 );
	var material = new THREE.MeshBasicMaterial({
		// color: 0x1C1C1C,
		// map: colorMap,
		side: THREE.DoubleSide,
		transparent: true,
		opacity: 1
	});

	// //material.alphaTest = 0.5;
	
	new THREE.TextureLoader().load(
    "images/gradient-2.png",
    function( texture1 )
    {
  	  texture1.wrapS = texture1.wrapT = THREE.ClampToEdgeWrapping;
      texture1.repeat.set( 1, 1 );
      texture1.offset.set( 0, -1 );
      material.map = texture1;
      material.needsUpdate = true;

			var mesh1 = new THREE.Mesh( geometry, material );
			mesh1.position.set( 0, 0, 0 )
			holder.add( mesh1 );

			var mesh2 = new THREE.Mesh( geometry, material );
			mesh2.position.set( 0, 0, 0 )
			mesh2.rotation.set( 0, 0, 1*Math.PI)
			holder.add( mesh2 );

      new TWEEN.Tween( texture1.offset )
				.to( { y: 0 }, 800 )
				.easing( TWEEN.Easing.Sinusoidal.Out )
				.start();

    });

	new THREE.TextureLoader().load(
    "images/alpha-2pxblack-topbottom.png",
    function( texture2 )
    {
      // texture2.wrapS = texture2.wrapT = THREE.MirroredRepeatWrapping;
      // texture2.repeat.set( 1, 1 );
      // texture2.offset.set( 0, 0 );
      material.alphaMap = texture2;
      material.needsUpdate = true;

    	// new TWEEN.Tween( alpha.offset )
			// 	.to( { y: 0.5 }, 2000 )
			// 	.easing( TWEEN.Easing.Sinusoidal.Out )
			// 	.start();

    } );




	//load alternative frame model (was made in C4D)
	// var loader = new THREE.ObjectLoader();
	// loader.load( 'models/frame_01.json', function ( object ) { 

	// 	object.scale.set( 0.005, 0.005, 0.005 );
	// 	object.position.set( 0, -0.5, -2 );
	// 	holder.add( object );

	// 	for( i = 0; i < object.children.length; i++ ){
			
	// 		var edge = object.children[i].children[0];
			
	// 		edge.material = new THREE.MeshBasicMaterial( { color: 0xFFFFFF, transparent: true, opacity: 1, fog: false } );

	// 		edge.scale.set( 1, 1, 0 );
	// 		new TWEEN.Tween( edge.scale )
	// 			.to( { z: 1 }, 1000 + i * 100 )
	// 			// .delay( i * 50 )
	// 			.easing( TWEEN.Easing.Cubic.Out )
	// 			.start();

	// 	}

	// });



	//shuffle utility function: shuffles array values
	function shuffle(o){ //v1.0
	    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	    return o;
	};



	//make frame
	function makeFrame( width, height, depth, renderWidth, renderHeight, renderDepth, thickness, color, opacity ){

		var 	w = width,
					h = height,
					d = depth,
					t = thickness;
					c = color;
					o = opacity;

		var group = new THREE.Group;
		var material = new THREE.MeshBasicMaterial( { color: c, transparent: true, opacity: o } );

		if( renderDepth ){

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

		}

		if( renderWidth ){

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

		}

		if( renderHeight ){

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

		}

		// group.position.set( 0d/2 )
		// frame.add( group );
		return group;

	}



	//make border
	function makeBorder( radius, height, thickness, thetaStart, thetaLength, y, color, opacity ) {

		var sideGeometry = new THREE.PlaneGeometry( thickness, height+thickness, 1, 1 );
		var material = new THREE.MeshBasicMaterial( { 
			color: color, 
			side: THREE.DoubleSide, 
			transparent: true, 
			opacity: opacity
		} );

		var border = new THREE.Object3D();
		var top = makeBand( radius, thickness, thetaStart, thetaLength, 0+height/2, color, opacity );
		var bottom = makeBand( radius, thickness, thetaStart, thetaLength, 0-height/2, color, opacity );
		
		var left = new THREE.Mesh( sideGeometry, material );
		left.position.set( 0, 0-thickness/2, radius );
		var leftPivot = new THREE.Object3D();
		leftPivot.rotation.set( 0, thetaStart*Math.PI/180, 0 );
		leftPivot.add( left );

		var right = new THREE.Mesh( sideGeometry, material );
		right.position.set( 0, 0-thickness/2, radius );
		var rightPivot = new THREE.Object3D();
		rightPivot.rotation.set( 0, (thetaStart-thetaLength)*Math.PI/180, 0 );
		rightPivot.add( right );

		border.add( top );
		border.add( bottom );
		border.add( leftPivot );
		border.add( rightPivot );

		new TWEEN.Tween( border.rotation )
			.to( { y:2 }, 2000 )
			.start();

		/*
		var radiusSegments = thetaLength / 2;
		var heightSegments = 1;
		var start = (thetaStart-thetaLength) * Math.PI/180; //subtracting length from start has effect of enabling designer to specify left edge position of the band (start), and extending band rightwards.
		var length = thetaLength * Math.PI/180;

		var geometry = new THREE.CylinderGeometry( radius, radius, height, radiusSegments, heightSegments, true, start, length );
		geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0-height/2, 0 ) ); //sets pivot to top of band
		var material = new THREE.MeshBasicMaterial( { 
			color: color, 
			side: THREE.BackSide, 
			transparent: true, 
			opacity: opacity
		} );
		var mesh = new THREE.Mesh( geometry, material );
		mesh.position.setY( y );
		*/

		return border;

	}

	var b = makeBorder( 3, 1, 0.01, 225, 90, 0, 0xFFFFFF, 0.1 );
	b.position.set( 0, 0, 0 );
	holder.add( b );



	// make bands
	function makeBand( radius, height, thetaStart, thetaLength, y, color, opacity ) {

		var radiusSegments = thetaLength / 2;
		var heightSegments = 1;
		var start = (thetaStart-thetaLength) * Math.PI/180; //subtracting length from start has effect of enabling designer to specify left edge position of the band (start), and extending band rightwards.
		var length = thetaLength * Math.PI/180;

		var geometry = new THREE.CylinderGeometry( radius, radius, height, radiusSegments, heightSegments, true, start, length );
		geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0-height/2, 0 ) ); //sets pivot to top of band
		var material = new THREE.MeshBasicMaterial( { 
			color: color, 
			side: THREE.BackSide, 
			transparent: true, 
			opacity: opacity
		} );
		var mesh = new THREE.Mesh( geometry, material );
		mesh.position.setY( y );
		
		// mesh.scale.y = 0;
		// new TWEEN.Tween( mesh.scale )
		// 	.to( { y: 1 }, 1000 )
		// 	.easing( TWEEN.Easing.Sinusoidal.Out )
		// 	.start();

		return mesh;
	}

	function makeMask( object ) {

		new THREE.TextureLoader().load(
	    "images/alpha-2pxblack-leftright.png",
	    function( tex )
	    {
	      tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
	      tex.repeat.set( 1, 1 );
	      tex.offset.set( -0.5, 0 );
	      tex.magFilter = tex.minFilter = THREE.NearestFilter;
	      
	      object.material.map = tex;
	      object.material.needsUpdate = true;

	    	new TWEEN.Tween( tex.offset )
					.to( { x: 0 }, 1000 )
					.easing( TWEEN.Easing.Sinusoidal.Out )
					.start();

	    } );

	}










	/* ==================== MAKE LAYOUT ==================== */


	var radius = 0.6;
	var leftEdge = 215;


	//make loading brackets

	var b1Pivot = new THREE.Object3D();
	var b1 = makeFrame( 0.1, 0.1, 0.1, false, false, true, 0.0015 );
	shuffle( b1.children );
	b1.position.set( 0, 0, 0-radius );
	b1Pivot.add( b1 );
	// bracketPivot.rotation.set( 0, -20*Math.PI/180, 0 );
	holder.add( b1Pivot );

	var b2Pivot = new THREE.Object3D();
	var b2 = makeFrame( 2, 1, 0.1, false, false, true, 0.0015 );
	shuffle( b2.children );
	b2.position.set( 0, 0, 0-radius );
	b2Pivot.add( b2 );
	// bracketPivot.rotation.set( 0, -20*Math.PI/180, 0 );
	holder.add( b2Pivot );


	//make bands

	var creator1 = makeBand( radius, 0.025, leftEdge, 20, 0.2, 0xFFFFFF, 0.25 );
	// makeMask( band1 );
	holder.add( creator1 );

	var loading = makeBand( radius, 0.0075, leftEdge, 30, 0, null, 0.5 );
	loading.material.map = THREE.ImageUtils.loadTexture( 'images/diagonals-4-white.png', THREE.UVMapping, function( tex )
		{ 
	      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
	      tex.repeat.set( 5, 0.1 );
	      tex.offset.set( 0, 0 );
		});
	holder.add( loading );

	var name = makeBand( radius, 0.15, leftEdge, 50, -0.1, 0xFFFFFF, 1 );
	// makeMask( band1 );
	holder.add( name );

	//make site icon
	var framePivot = new THREE.Object3D();
	var frame = makeFrame( 0.15, 0.15, 0.15, true, true, true, 0.0015 );
	// shuffle( frame.children );
	frame.position.set( 0, -0.15, 0-radius );
	framePivot.add( frame );
	framePivot.rotation.set( 0, -30*Math.PI/180, 0 );
	holder.add( framePivot );






	//make lots of bands
	// for( var i = 0; i < 10; i++ ){

	// 	var start = getRandomInt( 160, 260 );
	// 	var length = getRandomArbitrary( 20, 50 );
	// 	var y = getRandomArbitrary( -0.5, 0.5 );

	// 	var band = makeBand( 0.5, 0.05, start, 100, y, 0xFFFFFF, 1 );
	// 	makeMask( band );
	// 	holder.add( band );

	// }


	// function reveal( mesh, direction ){

	// 	mesh.material

	// }

	// reveal( band1, leftright )


	// Alpha wipe reveals meshes

	/*
	var radiusTop = radiusBottom = 0.5;
	var height = 0.505; // Height of the cylinder. Default is 100.
	var radiusSegments = 60; // Number of segmented faces around the circumference of the cylinder. Default is 8
	var heightSegments = 1; // Number of rows of faces along the height of the cylinder. Default is 1.
	var openEnded = true; // A Boolean indicating whether the ends of the cylinder are open or capped. Default is false, meaning capped.
	var thetaStart = 135 * Math.PI/180;
	var thetaLength = 90 * Math.PI/180;

	var geo1 = new THREE.CylinderGeometry( radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded, thetaStart, thetaLength );
	var mat1 = new THREE.MeshBasicMaterial( { 
		color: 0xFFFFFF, 
		side: THREE.BackSide, 
		transparent: true, 
	} );
	var mesh = new THREE.Mesh( cyl, mat1 );
	*/

	/*


	new THREE.TextureLoader().load(
    "images/alpha-2pxblack-leftright.png",
    function( tex )
    {
      tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.repeat.set( 1, 1 );
      tex.offset.set( -1, 0 );
      tex.magFilter = tex.minFilter = THREE.NearestFilter;
      
      mesh.material.map = tex;
      mesh.material.needsUpdate = true;

    	new TWEEN.Tween( tex.offset )
				.to( { x: 0 }, 1000 )
				.easing( TWEEN.Easing.Sinusoidal.Out )
				.start();

    } );

  
	mesh.scale.set( 1, 0.01, 1 );
	mesh.position.set( 0, 0.2, 0 );
	holder.add( mesh );

  var mesh2 = new THREE.Mesh( cyl, mat1 );
	mesh2.scale.set( 1, 0.04, 1 );
	mesh2.position.set( 0, 0.1, 0 );
	
  holder.add( mesh2 );

	var mesh3 = new THREE.Mesh( cyl, mat1 );
	mesh3.scale.set( 1, 0.54, 1 );
	mesh3.position.set( 0, -0.2, 0 );
	holder.add( mesh3 );

	*/



	cleanTransition();		
	setupTransition( holder );

}