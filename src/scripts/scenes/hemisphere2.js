function hemisphere2() { 


	var holder = new THREE.Object3D(); //parent object

	// fragment function

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

      /*
      var wireframe = new THREE.Mesh(
        geometry2,
        new THREE.MeshBasicMaterial( { color: 0xCCCCCC, wireframe: true, wireframeLinewidth: 3 } )
      )
      wireframe.position.sub( geometry2.center() );

      mesh.add( wireframe );
      */

      group.add( mesh );

    }
    return group;
  }


	// rings -------------------------------------------------------------------

	// create rings

	var material = new THREE.MeshBasicMaterial( { color: 0xffAA33, transparent: true, opacity: 1, side: THREE.DoubleSide } );

	var rings = new THREE.Object3D();
	var steps = 40;
	var start = 0;
	var increment = Math.PI / steps;

	for ( var i = 0; i < steps; i++ ){

		var geometry = new THREE.SphereGeometry( 100, 40, 2, 0, Math.PI * 2, start, increment );
		var bufferGeometry = new THREE.BufferGeometry().fromGeometry( geometry );
		var mesh = new THREE.Mesh( bufferGeometry, material );
		
		// add wireframe
		/*
		var wireframe = new THREE.Mesh( 
			geometry, 
			new THREE.MeshBasicMaterial( { color: 0x000000, transparent: true, opacity: 0.5, wireframe: true, wireframeLinewidth: 3, side: THREE.DoubleSide } )
		)
		//mesh.position.set( 0, i*-5, 0 );

		mesh.add( wireframe );
		*/

		rings.add( mesh );

		start = start + increment;

	}

	//rings.position.set( 0, 0, -250)
	rings.rotation.set( Math.PI / 2, 0, 0)

	holder.add( rings );


	// circles -------------------------------------------------------------------

	// create circles

	var count = 4;
	var circles = new THREE.Object3D();
  var material = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 1 } );
  var geometry = new THREE.CircleGeometry( 2, 64 );
  geometry.vertices.shift(); // remove center vertex

	for ( var i = 0; i < count; i++ ) {
		
		var line = new THREE.Line( geometry, material );
		circles.add( line );

	}

	//circles.rotation.set( Math.PI / 2, 0, 0 );
	circles.position.set( 0, 0, -10 );

	holder.add( circles );


	// globe -------------------------------------------------------------------

	var geometry = new THREE.SphereGeometry( 2, 10, 10, 0.6, Math.PI - 1.2, 0.5, Math.PI - 1);
	var material = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: true } );
	//var globe = new THREE.Mesh( geometry, material );

	var globe = fragment( geometry, material ) // fragment geometry

  globe.children.sort( function ( a, b ) { //sort the pieces

    return b.position.z - a.position.z;
    //return a.position.x - b.position.x;    // sort x
    //return b.position.y - a.position.y;   // sort y

  } );

	globe.position.set( 0, 0, -10 );
	globe.rotation.set( Math.PI / 4, 0, 0 );
	
	holder.add( globe );


	// animate -------------------------------------------------------------------

	// animate rings

	rings.children.reverse(); // reverse order of rings
	var startPos = 0 - steps / 2;

	for ( var i = 0; i < rings.children.length; i++ ) {

		var ring = rings.children[i];

		/*
		ring.position.set( 0, startPos * 10, 0 )
		new TWEEN.Tween( ring.position )
			.to( { x:0, y:0, z:0 }, 3000 )
			.delay( i * 100 )
			.start();

		startPos ++;
		*/
		
		ring.scale.set( 0.01, 0.01, 0.01 )
		new TWEEN.Tween( ring.scale )
			.to( { x:1, y:1, z:1 }, 3000 )
			.delay( i * 100 )
			.easing( TWEEN.Easing.Cubic.Out )
			.start();

	}


	// animate circles

	for ( var i = 0; i < circles.children.length; i++ ) {

		var circle = circles.children[i];

		endScale = 1 + ( i * 0.215 );
		circle.scale.set( 1, 1, 1 );

		new TWEEN.Tween( circle.scale )
			.to( { x: endScale, y: endScale, z: endScale }, 1000 )
			.delay( i * 200 )
			.easing( TWEEN.Easing.Cubic.InOut )
			.start();

	}

	// animate globe

	/*
	globe.rotation.set( Math.PI, 0, 0 )
	new TWEEN.Tween( globe.rotation )
		.to( { x:0 }, 2000 )
		.delay( 500 )
		.easing( TWEEN.Easing.Cubic.Out )
		.start();
	*/

	for ( var i = 0; i < globe.children.length; i ++ ) {

      var object = globe.children[i];
      var delay = i * 7;

      var destZ = object.position.z;
      object.position.setZ( destZ + 4 );
      new TWEEN.Tween( object.position )
        .to( { z: destZ  }, 700 )
        .delay( delay )
       	.easing( TWEEN.Easing.Cubic.Out )
        .start();

      object.scale.set( 0.01, 0.01, 0.01 )
      new TWEEN.Tween( object.scale )
        .to( { x:1, y:1, z:1  }, 600 )
        .delay( delay )
        .easing( TWEEN.Easing.Cubic.Out )
        .start();
  }

  globe.rotation.set( Math.PI / 10, 0, 0 );
  new TWEEN.Tween( globe.rotation )
  	.to( { x:0 }, 2000 )
  	.easing( TWEEN.Easing.Cubic.Out )
  	.start();

	//animate pare
		/*
	object.scale.set( 5, 5, 5 )
		new TWEEN.Tween( object.scale )
			.to( { x:1, y:1, z:1 }, 5000 )
			.start();
	*/


	// set up the scene -------------------------------------------------------------------

	cleanTransition();		
	setupTransition( holder );

}	