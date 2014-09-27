function poly1() {

	//create holder
	var tH = new THREE.Object3D();

	var v1 = new THREE.Vector3( 0, 0, 0 );
	var v2 = new THREE.Vector3( 0, 40, 0 );
	var v3 = new THREE.Vector3( 40, 0, -0.5 );

	var geo = new THREE.Geometry();
	geo.vertices.push( v1 );
	geo.vertices.push( v2 );
	geo.vertices.push( v3 );
	geo.faces.push( new THREE.Face3( 0, 1, 2 ) );
	
	var material = new THREE.MeshBasicMaterial( { color: 0xf8bc4a, wireframe: false, transparent: true } );
	material.side = THREE.DoubleSide;

	var mesh = new THREE.Mesh( geo, material );
	
	tH.add( mesh );
	tH.rotation.set( 0.5, 0.5, 0.5 );
	tH.position.set( 0, 0, -1000 )
	tH.scale.set( 8, 8, 8 )
	cleanTransition();		
	setupTransition( tH );


}