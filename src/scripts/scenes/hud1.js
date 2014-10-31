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



	var circumference = 6.25;
	var radius = circumference / 3.14 / 2;
	var height = circumference / 4;
	var holder = new THREE.Object3D();
	var loader = new THREE.ObjectLoader();

	// 1.00 	Glass
	// 0.90 	Screen elements
	// 0.80 	Screen elements 2
	// 0.75 	Inside of he
	// 0.70		Inside of helmet elements
	// 0.50		Foreground indicators & glowing lights














	/* Fragment function */

	function fragment( geometry, material ) {

    var group = new THREE.Group();

    for ( var i = 0; i < geometry.faces.length; i ++ ) {

      var face = geometry.faces[ i ];

      var vertexA = geometry.vertices[ face.a ].clone();
      var vertexB = geometry.vertices[ face.b ].clone();
      var vertexC = geometry.vertices[ face.c ].clone();

      var geometry2 = new THREE.Geometry();
      geometry2.vertices.push( vertexA, vertexB, vertexC );
      geometry2.faces.push( new THREE.Face3( 0, 1, 2 ) );

      var mesh = new THREE.Mesh( geometry2, material );
      mesh.position.sub( geometry2.center() );
      group.add( mesh );

    }
    return group;
  }


  function makeFigure() {

		var figure = new THREE.Object3D();

		loader.load( 'models/figure.json', function( object ){
			
			//scale down the model
			var geometry = object.geometry;
			geometry.verticesNeedUpdate = true;
			geometry.applyMatrix( new THREE.Matrix4().makeScale( 0.02, 0.02, 0.02 ) );
			
			//could just import this as the mesh, instead of feeding the geometry and material into new mesh. Six of one, half dozen of the other.
			var mesh = new THREE.Mesh( 
				geometry, 
				new THREE.MeshPhongMaterial( { color: 0xffffff, transparent: true, opacity: 1 } )
			);

			figure.add( mesh );

		});

		return figure;

	};


  function makeHUD() {

  	var hud = new THREE.Object3D();
  	var hudRadius = 0.08;
	  var hudHeight = 0.04;
	 
	 	// make display
	  var geometry = new THREE.CylinderGeometry( hudRadius, hudRadius, hudHeight, 46, 1, true );
	  var material = new THREE.MeshBasicMaterial( { color: 0x22caf0, transparent: true, opacity: 0.5, side: THREE.DoubleSide } );
	  var ui = new THREE.Mesh( geometry, material );
	  hud.add( ui );

	  // make top and bottom circles
	  var material = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 1 } );
	  var geometry = new THREE.CircleGeometry( hudRadius, 46 );
	  geometry.vertices.shift(); // remove center vertex
	  
	  var line = new THREE.Line( geometry, material );
	  line.position.set( 0, 0 - hudHeight / 2, 0 );
	  line.rotation.set( Math.PI / 2, 0, 0 )
	  hud.add( line );
	  
	  var line = new THREE.Line( geometry, material );
	  line.position.set( 0, hudHeight / 2, 0 );
	  line.rotation.set( Math.PI / 2, 0, 0 )
	  hud.add( line );

	  return hud;

  }


  function makeGlobe() {

		//THREE.SphereGeometry( radius, segmentsWidth, segmentsHeight, 		phiStart, phiLength, thetaStart, thetaLength );
		var geometry = new THREE.SphereGeometry( 0.25, 12, 12, Math.PI, Math.PI, 0, Math.PI );
		var material = new THREE.MeshBasicMaterial( { color: 0xffffff, transparent: true, opacity: 0.5, side: THREE.BackSide } );

		var globe = fragment( geometry, material ) // fragment geometry

		globe.children.sort( function ( a, b ) { //sort the pieces

			//return b.position.z - a.position.z;
			//return a.position.x - b.position.x;    // sort x
			return a.position.y - b.position.y;   // sort y

		} );
		
		return globe;

  }


	function makeDarkBG() {

		var geometry = new THREE.SphereGeometry( 0.8, 16, 16 );
		var material = new THREE.MeshBasicMaterial( { color: 0x000000, transparent: true, opacity: 0, side: THREE.BackSide } );
		var mesh = new THREE.Mesh( geometry, material );
		
		return mesh ;

	}


  function makeTutorial() {

  	var tutorial = new THREE.Object3D();
  	var diagram = new THREE.Object3D();
  	
  	var hud = makeHUD();
  	var figure = makeFigure();
  	var globe = makeGlobe();
  	var bg = makeDarkBG();
  	
  	diagram.add( globe );
  	diagram.add( figure );
  	figure.add( hud );
  	tutorial.add( diagram );
  	tutorial.add( bg );

		diagram.position.set( 0, -0.09, -0.5 );
		figure.position.set( 0, -0.18, 0 );
		hud.position.set( 0, 0.33, 0 );

  	holder.add( tutorial );

  	//animate

  	function openTutorial() {

	  	hud.scale.set( 1, 0.01, 1 );
			new TWEEN.Tween( hud.scale )
				.to( { y: 1 }, 2000 )
				.delay( 500 )
	   		.easing( TWEEN.Easing.Cubic.Out )
				.start();

			new TWEEN.Tween( figure.rotation )
				.to( { y: Math.PI * 2 }, 10000 )
	   		.easing( TWEEN.Easing.Cubic.Out )
				.start();

			bg.material.opacity = 0;
			new TWEEN.Tween( bg.material )
				.to( { opacity: 0.5 }, 1000 )
	   		.easing( TWEEN.Easing.Cubic.Out )
				.start();

			for ( var i = 0; i < globe.children.length; i ++ ) {

			  var object = globe.children[i];
			  var delay = 200 + i * 7;

			  /*
			  var destZ = object.position.z;
			  object.position.setZ( destZ + 0.2 );
			  new TWEEN.Tween( object.position )
			    .to( { z: destZ  }, 1000 )
			    .delay( delay )
			   	.easing( TWEEN.Easing.Cubic.Out )
			    .start();
			  */

			  object.scale.set( 0.01, 0.01, 0.01 )
			  new TWEEN.Tween( object.scale )
			    .to( { x:0.97, y:0.97, z:0.97 }, 1000 )
			    .delay( delay )
			    .easing( TWEEN.Easing.Cubic.Out )
			    .start();
		  }
  	}

  	var timeoutID = window.setTimeout( openTutorial, 2000 );

  }	

  makeTutorial();













	/* Remembder to declare screens in order from closest to user, to most distant. This ensures webgl transparencies composite properly */

	function drawSquare( size ) {

		var x1 = 0 - size / 2;
		var x2 = 0 + size / 2;
		var y1 = 0 - size / 2;
		var y2 = 0 + size / 2;

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
	ui.position.set( 0, 0.1, 0 )
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
	ui.position.set( 0, 0.1, 0 )
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
	ui.position.set( 0, 0.1, 0 )
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
	ui.position.set( 0, 0.1, 0 )
	holder.add( ui );


	cleanTransition();		
	setupTransition( holder );

}	