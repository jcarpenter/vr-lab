function backwards_compatibility() {

	//create a mockup holder
	//return it to setupTransition();
	//mockup holder listens for left/right arrows and cycles plane texture
	//create plane
	//create 

	var circumference = 3.6;
	var radius = circumference / 3.14 / 2;
	var height = circumference / 4;
	var imageDirectory = 'images/mockups/backwards_compatibility/';

	var mockups = [
		'backwards-compatibility-9',
		'backwards-compatibility-8',
		'backwards-compatibility-7',
		'backwards-compatibility-6',
		'backwards-compatibility-5',
		'backwards-compatibility-4',
		'backwards-compatibility-3',
		'backwards-compatibility-2',
		'backwards-compatibility-1',
		'thunderbolt-display',
		'grid',
	]

	var counter = 0;

	var holder = new THREE.Object3D();

	mockup = new THREE.Mesh(
		new THREE.CylinderGeometry( radius, radius, height, 60, 1, true ),
		new THREE.MeshBasicMaterial( { 
			transparent: true, 
			side: THREE.DoubleSide,
			map: THREE.ImageUtils.loadTexture( imageDirectory + mockups[counter] + '.png' )
		} )
	);

	mockup.scale.set( -1, 1, 1 );
	holder.add( mockup );

	function loadTex() {
		
		new TWEEN.Tween( mockup.material )
			.to({ opacity: 0}, 300 )
			.onComplete(function() {

				mockup.material.map = THREE.ImageUtils.loadTexture( imageDirectory + mockups[counter] + '.png', THREE.UVMapping, function() {

					new TWEEN.Tween( mockup.material )
						.to({ opacity: 1}, 300)
						.start();
				})
			})
			.start()
	}

	loadTex();

	function prevnext( event ) {

		if ( event.keyCode == '37' ) {

			counter --;

			if( counter < 0 ) { 
				counter = mockups.length - 1;
			}
			
			loadTex();			

		} else if ( event.keyCode == '39' ) {

			counter ++;

			if( counter == mockups.length ) { 
				counter = 0;
			}
			
			loadTex();

		} else if ( event.charCode == 'c'.charCodeAt(0) ) {

			console.log( 'c' );

		}

	}

	window.addEventListener( 'keypress', prevnext, true );

	cleanTransition();		
	setupTransition( holder );


}	