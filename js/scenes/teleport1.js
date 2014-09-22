function teleport1() {

	//create holder
	var tH = new THREE.Object3D();

	var rectPoints = [];
	
	rectPoints.push( new THREE.Vector2 (   10,  -5 ) );
	rectPoints.push( new THREE.Vector2 (  10,  5 ) );
	rectPoints.push( new THREE.Vector2 (  -10,  5 ) );
	rectPoints.push( new THREE.Vector2 (  -10, -5 ) );
	
	var rectShape = new THREE.Shape( rectPoints );

	var extrusionSettings = {
		amount: 4,
		bevelEnabled: false,
		material: 0,
		extrudeMaterial: 1
	};
	
	var rectGeo = new THREE.ExtrudeGeometry( rectShape, extrusionSettings );
	
	var materialCaps = new THREE.MeshBasicMaterial( { color: 0xffffff, transparent: true, opacity: 0 } );
	var materialSide = new THREE.MeshPhongMaterial( { color: 0xcccccc  } );
	materialSide.side = THREE.DoubleSide;
	var materialArray = [ materialCaps, materialSide ];
	var rectMat = new THREE.MeshFaceMaterial( materialArray );
	
	//create model and add to scene

	var quantity = 30;

	for ( var i = 0; i < quantity; i++ ) {

		var xPos

		if( i < 10 ) {
			xPos = i * 2;
		} else if ( i < 20 ) {
			xPos = i * 4;
		} else if ( i < 30 ) {
			xPos = i * 6;
		}

		var rect = new THREE.Mesh( rectGeo, rectMat );
		rect.position.set( 0, 0, xPos );
		tH.add( rect );		

	}

	tH.position.set( 0, 0, -300 )
	tH.rotation.set( 0.75, 0.35, 0 )

	/*
	new TWEEN.Tween( tH.position )
		.to( { z:-150 }, 1500 )
		//.delay( ( 1 - delay ) * 200 )
		//.easing( TWEEN.Easing.Sinusoidal.InOut )
		.start();
	*/

	cleanTransition();		
	setupTransition( tH );

}