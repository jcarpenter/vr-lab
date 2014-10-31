function lines() {

	var holder = new THREE.Object3D();

  var strandMat = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 5 } );

  var strandGeometry = new THREE.Geometry()
  strandGeometry.vertices.push(new THREE.Vector2( 0, 0 ));
  strandGeometry.vertices.push(new THREE.Vector2( 50, 50 ));

  var strand = new THREE.Line( strandGeometry, strandMat );

  holder.add( strand );
  holder.position.set( 0, 0, -50 )

	cleanTransition();		
	setupTransition( holder );

}