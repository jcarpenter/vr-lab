function siteload_1() {
	
	// Alpha wipes used to create "close your eyes" transition effect
	
	var holder = new THREE.Object3D();






	// Gray background

	var geometry = new THREE.SphereGeometry( 200, 20, 20 );
	var material = new THREE.MeshBasicMaterial( { wireframe: false, color: 0x000000, transparent: true, opacity: 0, side: THREE.DoubleSide } );
	var mesh = new THREE.Mesh( geometry, material );
	holder.add( mesh );

	new TWEEN.Tween( mesh.material )
		.to( { opacity: 0.95 }, 1500 )
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
	var loader = new THREE.ObjectLoader();
	loader.load( 'models/frame_01.json', function ( object ) { 

		object.scale.set( 0.005, 0.005, 0.005 );
		object.position.set( 0, -0.5, -2 );
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

		new TWEEN.Tween( object.rotation )
			.to( { x:0.5 }, 3000 )
			.easing( TWEEN.Easing.Cubic.Out )
			.start();

	});






	// Alpha wipe reveals meshes

	var radiusTop = radiusBottom = 0.5;
	var height = 0.505; // Height of the cylinder. Default is 100.
	var radiusSegments = 60; // Number of segmented faces around the circumference of the cylinder. Default is 8
	var heightSegments = 1; // Number of rows of faces along the height of the cylinder. Default is 1.
	var openEnded = true; // A Boolean indicating whether the ends of the cylinder are open or capped. Default is false, meaning capped.
	var thetaStart = 135 * Math.PI/180;
	var thetaLength = 90 * Math.PI/180;

	var cyl = new THREE.CylinderGeometry( radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded, thetaStart, thetaLength );
	var mat = new THREE.MeshBasicMaterial( { 
		color: 0xDB70A9, 
		side: THREE.BackSide, 
		transparent: true, 
		opacity: 0.5
	} );
	var mesh = new THREE.Mesh( cyl, mat );



	new THREE.TextureLoader().load(
    "images/alpha-2pxblack-leftright.png",
    // "images/149.png",
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

  var mesh2 = new THREE.Mesh( cyl, mat );
	mesh2.scale.set( 1, 0.04, 1 );
	mesh2.position.set( 0, 0.1, 0 );
	
  holder.add( mesh2 );

	var mesh3 = new THREE.Mesh( cyl, mat );
	mesh3.scale.set( 1, 0.54, 1 );
	mesh3.position.set( 0, -0.2, 0 );
	holder.add( mesh3 );



	cleanTransition();		
	setupTransition( holder );

}