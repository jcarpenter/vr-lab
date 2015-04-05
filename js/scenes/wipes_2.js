function wipes_2() {
	
	// Alpha wipes used to create "close your eyes" transition effect
	
	var holder = new THREE.Object3D();

	// Gray background

	var geometry = new THREE.SphereGeometry( 200, 20, 20 );
	var material = new THREE.MeshBasicMaterial( { color: 0x131313, transparent: true, opacity: 0, depthTest: false,	depthWrite: false, side: THREE.DoubleSide } );
	var mesh = new THREE.Mesh( geometry, material );
	holder.add( mesh );

	new TWEEN.Tween( mesh.material )
		.to( { opacity: 0.95 }, 1500 )
		.easing( TWEEN.Easing.Sinusoidal.Out )
		.start();

	//Note: When you change any property of a material or texture after it has been used by renderer, you need to set `tex.needsUpdate = true` (where 'tex' is variable name for the material or texture).

	//Dome reveal

	var geometry = new THREE.SphereGeometry( 30, 20, 20, 0, 360 * Math.PI/180, 0, 90 * Math.PI/180 );
	var material = new THREE.MeshBasicMaterial({
		// color: 0x1C1C1C,
		// map: colorMap,
		side: THREE.DoubleSide,
		transparent: true,
		opacity: 1,
		depthTest: false,
		depthWrite: false,
	});

	// material.alphaTest = 0.5;
	
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


	cleanTransition();		
	setupTransition( holder );

}