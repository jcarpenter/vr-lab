function siteload_1() {
	
	// Sequence:

	// "Eyes close" transition (two elements animating)
	// HUD elements animate in
	// Once loading is complet, animate out HUD and open eyes

	



	/*=============== SETUP SCENE ===============*/

	var holder = new THREE.Object3D();

	// Stand-in for current site
	var geometry = new THREE.SphereGeometry( 200, 20, 20 );
	var material = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'images/backgrounds/sechelt-1.png' ), side: THREE.BackSide } );
	var mesh = new THREE.Mesh( geometry, material );
	holder.add( mesh );








	/*=============== SETUP CREATOR & UTILITY FUNCTIONS ===============*/

	//random interger utility function
	//returns a random integer between min (included) and max (excluded)
	function getRandomInt(min, max) {
	  return Math.floor(Math.random() * (max - min)) + min;
	}

	//returns a random number between min (inclusive) and max (exclusive)
	function getRandomArbitrary(min, max) {
	  return Math.random() * (max - min) + min;
	}

	//shuffle utility function: shuffles array values
	function shuffle(o){ //v1.0
	    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	    return o;
	};

	//make frame
	//makes "frame" 3D boxes with a wireframe aesthetic
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

		return group;
	}


	//make border
	//makes flat cylindrical "outline" planes that face the user
	function makeBorder( radius, height, thickness, thetaStart, thetaLength, y, color, opacity ) {

		var sideGeometry = new THREE.PlaneGeometry( thickness, height+thickness, 1, 1 );
		var material = new THREE.MeshBasicMaterial( { 
			color: color, 
			side: THREE.DoubleSide, 
			transparent: true, 
			opacity: opacity
		} );

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

		var border = new THREE.Object3D();
		border.add( top );
		border.add( bottom );
		border.add( leftPivot );
		border.add( rightPivot );

		/*

			//Old intro animation...

			var lPR = leftPivot.rotation.y;
			leftPivot.rotation.set( 0, lPR - 30*Math.PI/180 , 0 );
			left.scale.setY( 0 );
			new TWEEN.Tween( left.scale )
				.to( { y:1 }, 250 )
				.easing( TWEEN.Easing.Sinusoidal.Out )
				.onComplete( function(){
					
					new TWEEN.Tween( leftPivot.rotation )
						.to( { y:lPR }, 500 )
						.easing( TWEEN.Easing.Sinusoidal.Out )
						.start();

				} )
				.start();


			var rPR = rightPivot.rotation.y;
			rightPivot.rotation.set( 0, rPR + 30*Math.PI/180 , 0 );
			right.scale.setY( 0 );
			new TWEEN.Tween( right.scale )
				.to( { y:1 }, 250 )
				.easing( TWEEN.Easing.Sinusoidal.Out )
				.onComplete( function(){
					
					new TWEEN.Tween( rightPivot.rotation )
						.to( { y:rPR }, 500 )
						.easing( TWEEN.Easing.Sinusoidal.Out )
						.start();

				} )

				.start();

			var tP = top.position.y;
			top.position.setY( 0 );
			new TWEEN.Tween( top.position )
				.to( { y:tP }, 500 )
				.easing( TWEEN.Easing.Sinusoidal.Out )
				.start();

			var bP = bottom.position.y;
			bottom.position.setY( 0 );
			new TWEEN.Tween( bottom.position )
				.to( { y:bP }, 500 )
				.easing( TWEEN.Easing.Sinusoidal.Out )
				.start(); 

		*/

		return border;

	}


	// make bands
	// makes flat cylindrical planes that face the user
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

		return mesh;
	}


	//make mask
	//makes masks for objects (should probably deprecate this and implement in a better way)
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






	/*=============== SETUP LAYOUT ===============*/

	// Create sphere that darkens the background

	var darken_geometry = new THREE.SphereGeometry( 200, 20, 20 );
	var darken_material = new THREE.MeshBasicMaterial( { wireframe: false, color: 0x0E131E, transparent: true, opacity: 0, side: THREE.DoubleSide } );
	var darken = new THREE.Mesh( darken_geometry, darken_material );
	holder.add( darken );


	// Create "eyelids" that darken the background

	var eyelid_geometry = new THREE.SphereGeometry( 199, 20, 20, 0, 360 * Math.PI/180, 0, 90 * Math.PI/180 );
	var eyelid_material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, transparent: true,	opacity: 1 });
	var eyelid_top = new THREE.Mesh( eyelid_geometry, eyelid_material );
	var eyelid_bottom = new THREE.Mesh( eyelid_geometry, eyelid_material );
	eyelid_bottom.rotation.set( 0, 0, 1*Math.PI)
	
	holder.add( eyelid_top );
	holder.add( eyelid_bottom );

	var eyelid_map;
	new THREE.TextureLoader().load(
    "images/siteload/eyelid-gradient.png",
    function( tex )
    {

    	eyelid_map = tex;

  	  eyelid_map.wrapS = eyelid_map.wrapT = THREE.ClampToEdgeWrapping;
      eyelid_map.repeat.set( 1, 1 );
      eyelid_map.offset.set( 0, -1 );
      eyelid_material.map = eyelid_map;
      eyelid_material.needsUpdate = true;

      animateIn(); //once loading is complete, call the animateIn() function.

    });

	var eyelid_alphaMap;
	new THREE.TextureLoader().load(
    "images/siteload/alpha-2pxblack-topbottom.png",
    function( tex )
    {
    	eyelid_alphaMap = tex;
      eyelid_material.alphaMap = eyelid_alphaMap;
      eyelid_material.needsUpdate = true;
    });

	var b = makeBorder( 3, 1.5, 0.01, 270, 180, 0, 0xFFFFFF, 0.2 );
	b.position.set( 0, 0, 0 );
	holder.add( b );


	// setup size variables that will be used for most HUD elements

	var radius = 0.6;
	var leftEdge = 215;


	// make loading animation frames

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


	// make one band for each creator

	var creator1 = makeBand( radius, 0.025, leftEdge, 20, 0.2, 0xFFFFFF, 0.25 );
	holder.add( creator1 );


	// make progress bar

	var progress = makeBand( radius, 0.0075, leftEdge, 30, 0, null, 0.5 );
	progress.material.map = THREE.ImageUtils.loadTexture( 'images/siteload/progressbar-1.png', THREE.UVMapping, function( tex )
		{ 
	      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
	      tex.repeat.set( 5, 0.1 );
	      tex.offset.set( 0, 0 );
		});
	holder.add( progress );

	
	// make site name holder

	var name = makeBand( radius, 0.15, leftEdge, 50, -0.1, 0xFFFFFF, 1 );
	holder.add( name );


	// make loading indicator frame

	var loading_pivot = new THREE.Object3D();
	var loading = makeFrame( 0.15, 0.15, 0.15, true, true, true, 0.0015 );
	// shuffle( loading.children ); // shuffles order in which the frame pieces draw in
	loading.position.set( 0, -0.15, 0-radius );
	loading_pivot.add( loading );
	loading_pivot.rotation.set( 0, -30*Math.PI/180, 0 );
	holder.add( loading_pivot );


	// make loading indicator sphere

	var geometry = new THREE.SphereGeometry( 0.065, 20, 10 );
	var material = new THREE.MeshBasicMaterial( { color: 0xFFFFFF, wireframe: true } );
	var loading_indicator = new THREE.Mesh( geometry, material );
	loading.add( loading_indicator );






	/*=============== ANIMATE IN ===============*/

	function animateIn(){

		// TODO:
		// Add: function that animates elements endlessly until stopped.
		// darken background and close eyelids
		// animate in elements
		// start loop offset of progress bar map
		// start loop rotation of loading_indicator
		// start video

	  new TWEEN.Tween( eyelid_map.offset )
			.to( { y: 0 }, 800 )
			.easing( TWEEN.Easing.Sinusoidal.Out )
			.start();

		//Reveal sphere that darkens the background
		new TWEEN.Tween( darken.material )
			.to( { opacity: 1 }, 1500 )
			.easing( TWEEN.Easing.Sinusoidal.Out )
			.start();


	}

	function animateOut(){

		// TODO:
		// stop looping animations (progress bar and loading indicator)
		// play outro animations for all elements
		// open eyelids

	}


	cleanTransition();		
	setupTransition( holder );

}