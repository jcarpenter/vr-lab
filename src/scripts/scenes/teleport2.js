function teleport2() {

	//create holder
	var tH = new THREE.Object3D();

	var quantity = 25;
	var gateSize = 10;
	var spread = 10;
	var xVal;
	var coreSize = gateSize * 10;
	var transitionTime = 15000;

	var gatePoints = [];
	gatePoints.push( new THREE.Vector2 (   10,  -5 ) );
	gatePoints.push( new THREE.Vector2 (  10,  5 ) );
	gatePoints.push( new THREE.Vector2 (  -10,  5 ) );
	gatePoints.push( new THREE.Vector2 (  -10, -5 ) );

	var gateShape = new THREE.Shape( gatePoints );
	var gateGeo = new THREE.ExtrudeGeometry( gateShape, { amount: gateSize, bevelEnabled: false, material: 0, extrudeMaterial: 1 } );
	
	//material
	var gateMatCaps = new THREE.MeshBasicMaterial( { color: 0xffffff, transparent: true, opacity: 0 } );
	var gateMatSide = new THREE.MeshBasicMaterial( { color: 0xffffff  } );
	gateMatSide.side = THREE.DoubleSide;
	var gateMatArray = [ gateMatCaps, gateMatSide ];
	var gateMat = new THREE.MeshFaceMaterial( gateMatArray );
	
	var coreGeo = new THREE.ExtrudeGeometry( gateShape, { amount: coreSize, bevelEnabled: false, material: 0, extrudeMaterial: 1 } );
	var core1 = new THREE.Mesh( coreGeo, gateMat );
	var core2 = new THREE.Mesh( coreGeo, gateMat );
	core2.rotation.set( 0, 180 * Math.PI / 180, 0 )
	tH.add( core1, core2 )

	for ( var i = 0; i < quantity; i++ ) {

		xVal = i * spread + ( Math.pow( 1.3,i ) ) + coreSize;

		var gate1 = new THREE.Mesh( gateGeo, gateMat );
		var gate2 = new THREE.Mesh( gateGeo, gateMat );
		
		gate1.position.set( 0, 0, xVal );
		gate2.position.set( 0, 0, 0 - xVal - gateSize );

		tH.add( gate1, gate2 );

	}

	//tH.position.set( 0, 200, -800 )
	//tH.rotation.set( 1.57, 0, 0 )

	tH.position.set( 0, 0, -1200 )

	new TWEEN.Tween( tH.position )
		.to( { z:1200 }, transitionTime )
		//.delay( ( 1 - delay ) * 200 )
		//.easing( TWEEN.Easing.Sinusoidal.InOut )
		.start();

	// new TWEEN.Tween( tH.rotation )
	// 	.to( { z: 1480 * Math.PI / 180 }, transitionTime )
	// 	.start();

	cleanTransition();		
	setupTransition( tH );

	
}