function hemisphere3() { 


	var holder = new THREE.Object3D(); //parent object

	// sky

	var geometry = new THREE.SphereGeometry( 100 , 60, 40 );
	geometry.applyMatrix( new THREE.Matrix4().makeScale( -1, 1, 1 ) );
	var material = new THREE.MeshBasicMaterial( { opacity: 1, map: THREE.ImageUtils.loadTexture( 'images/bg.jpg' ), depthTest: true } );
	var sky = new THREE.Mesh( geometry, material );
	//scene.add( sky );


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

		var geometry = new THREE.SphereGeometry( 90, 40, 2, 0, Math.PI * 2, start, increment );
		var bufferGeometry = new THREE.BufferGeometry().fromGeometry( geometry );
		var mesh = new THREE.Mesh( bufferGeometry, material );
		
		// add wireframe
		
		var wireframe = new THREE.Mesh( 
			geometry, 
			new THREE.MeshBasicMaterial( { color: 0x000000, transparent: true, opacity: 0.5, wireframe: true, wireframeLinewidth: 3, side: THREE.DoubleSide } )
		)
		//mesh.position.set( 0, i*-5, 0 );

		mesh.add( wireframe );
		

		rings.add( mesh );

		start = start + increment;

	}

	rings.position.set( 0, 0, -250)
	rings.rotation.set( Math.PI / 2, Math.PI / 2, Math.PI / 2)

	holder.add( rings );


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
		
		ring.scale.set( 1, 1, 1 )
		new TWEEN.Tween( ring.scale )
			.to( { x:2, y:2, z:1 }, 1000 )
			.delay( i * 100 )
			.easing( TWEEN.Easing.Cubic.Out )
			.start();

	}


	// set up the scene -------------------------------------------------------------------

	cleanTransition();		
	setupTransition( holder );

}	