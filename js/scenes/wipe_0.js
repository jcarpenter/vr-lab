function reveal_1() {

	// Code to reveal an item by animating it's texture map.

	/*
	Animating the reveal of items in Three.js is surprisingly difficult. 
	Animating texture map seems like most flexible approach, as opposed to simply animating opacity or scale of entire mesh.
	But animating texture maps is limited because: 
	* Edge wrap options do not include a no-wrap option (ala C4D material tag's tile on/off setting)
	* Material texture maps' offset/scale/repeat cannot be defined independently (so cannot animate moving alpha over fixed diffuse, for example)
	Solution here is a hack. It uses the behaviour of the default ClampToEdgeWrapping setting to our advantage by using a bitmap with a 2px alpha around it's borders.
	ClampToEdgeWrapping stretches those transparent pixels, so the rest appears to be the image sliding in.
	Massive downside of this solution is it requires baking an otherwise-useless alpha border into every bitmap.
	*/

	var holder = new THREE.Object3D();

	// Kitty plane

	var geometry = new THREE.PlaneGeometry( 20, 20, 10, 10 );
	var material = new THREE.MeshBasicMaterial( {
		transparent: true,
		opacity: 1,
	  side: THREE.DoubleSide
	} );

	var mesh = new THREE.Mesh( geometry, material );
	mesh.position.set( 0, 1, -30 );
	holder.add( mesh );

	new THREE.TextureLoader().load(
    "images/kitty.png",
    function( tex )
    {
  	  tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.repeat.set( 1, 1 );
      tex.offset.set( 0, 1 );
      material.map = tex;
      material.needsUpdate = true; //must set this to true because we're updating the material after it has already been used by the renderer (when we created the mesh).

	    new TWEEN.Tween( tex.offset )
				.to( { y: 0 }, 1000 )
				.easing( TWEEN.Easing.Sinusoidal.Out )
				.start();
    });

	cleanTransition();		
	setupTransition( holder );

}