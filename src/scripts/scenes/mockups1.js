function mockups1() {

	//create a mockup holder
	//return it to setupTransition();
	//mockup holder listens for left/right arrows and cycles plane texture
	//create plane
	//create 

	var radius = 50;

	var mockups = [
		'testpattern2',
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
		'quickmenu1'
	]

	var counter = 0;

	var holder = new THREE.Object3D();

	var activeMesh = new THREE.Mesh(
		new THREE.PlaneGeometry( 220, 80, 1, 1 ),
		new THREE.MeshBasicMaterial( { transparent: true, map: THREE.ImageUtils.loadTexture( 'images/mockups1/' + mockups[counter] + '.png' ) } )
	)

	activeMesh.material.side = THREE.DoubleSide;
	activeMesh.material.opacity = 0;

	holder.position.set( 0, 0, 0 - radius);
	holder.add( activeMesh );


	function loadTex() {
		
		new TWEEN.Tween( activeMesh.material )
			.to({ opacity: 0}, 500 )
			.onComplete(function() {

				activeMesh.material.map = THREE.ImageUtils.loadTexture( 'images/mockups1/' + mockups[counter] + '.png', THREE.UVMapping, function() {

					new TWEEN.Tween( activeMesh.material )
						.to({ opacity: 1}, 500)
						.start();
				})
			})
			.start()

	}

	loadTex();

	function prevnext( event ) {

		if ( event.keyCode == '37' ) {

			counter --;

			if( counter <= 0 ) { 
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

			holder.remove( activeMesh );

			activeMesh = new THREE.Mesh(
				new THREE.CylinderGeometry( radius, radius, 80, 60, 1, true ),
				new THREE.MeshBasicMaterial( { transparent: true, map: THREE.ImageUtils.loadTexture( 'images/mockups1/' + mockups[counter] + '.png' ), side: THREE.DoubleSide } )
			);

			activeMesh.geometry.dynamic = true
			activeMesh.geometry.__dirtyVertices = true;
			activeMesh.geometry.__dirtyNormals = true;

			activeMesh.flipSided = true;

			for(var i = 0; i<activeMesh.geometry.faces.length; i++) {
			    activeMesh.geometry.faces[i].normal.x = -1*activeMesh.geometry.faces[i].normal.x;
			    activeMesh.geometry.faces[i].normal.y = -1*activeMesh.geometry.faces[i].normal.y;
			    activeMesh.geometry.faces[i].normal.z = -1*activeMesh.geometry.faces[i].normal.z;
			}
			activeMesh.geometry.computeVertexNormals();
			activeMesh.geometry.computeFaceNormals();

			activeMesh.position.set( 0, 0, radius );

			holder.add( activeMesh )

		}

	}

	window.addEventListener( 'keypress', prevnext, true );

	cleanTransition();		
	setupTransition( holder );


}	