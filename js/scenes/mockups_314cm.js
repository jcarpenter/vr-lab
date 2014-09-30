function mockups_314cm() {

	//create a mockup holder
	//return it to setupTransition();
	//mockup holder listens for left/right arrows and cycles plane texture
	//create plane
	//create 

	var radius = 50;	
	var circumference = radius * 2 * 3.14;
	var height = circumference / 4;

	var mockups = [
		'firatech2',
		'firatech1',
		'opensans4',
		'opensans3',
		'opensans2',
		'opensans1',
		'sizetest1',
		'monsterat1',
		'green1',
		'green2',
		'green3',
		'doorhanger',
		'history',
		'home',
		'loading',
		'locationbars',
		'menu1',
		'menu2',
		'notification',
		'quickmenu3',
		'quickmenu2',
		'quickmenu1',
		'testpattern2',
	]

	var counter = 0;

	var holder = new THREE.Object3D();

	/*
	var mockup = new THREE.Mesh(
		new THREE.PlaneGeometry( 220, 80, 1, 1 ),
		new THREE.MeshBasicMaterial( { transparent: true, map: THREE.ImageUtils.loadTexture( 'images/mockups1/' + mockups[counter] + '.png' ) } )
	)

	mockup.material.side = THREE.DoubleSide;
	mockup.material.opacity = 0;
	
	holder.position.set( 0, 0, 0 - radius);
	*/

	mockup = new THREE.Mesh(
		new THREE.CylinderGeometry( radius, radius, height, 60, 1, true ),
		new THREE.MeshBasicMaterial( { 
			transparent: true, 
			side: THREE.DoubleSide,
			map: THREE.ImageUtils.loadTexture( 'images/mockups_314cm/' + mockups[counter] + '.png' )
		} )
	);

	mockup.scale.set( -1, 1, 1 );

	holder.position.set( 0, 0, 0 )
	holder.add( mockup );

	function loadTex() {
		
		new TWEEN.Tween( mockup.material )
			.to({ opacity: 0}, 300 )
			.onComplete(function() {

				mockup.material.map = THREE.ImageUtils.loadTexture( 'images/mockups_314cm/' + mockups[counter] + '.png', THREE.UVMapping, function() {

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