var camera, scene, renderer;
var vrEffect;
var vrControls;
var box, boxTween;
var material1 = new THREE.MeshBasicMaterial( { color: 0xFFFFFF, wireframe: true, transparent: true } )

function init() {

	container = document.getElementById( 'container' );

	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );

	scene = new THREE.Scene();

	var light = new THREE.PointLight( 0xFFFFFF, 0.5, 2 );

	light.position.set( 0, 0, 0 );
	scene.add( light );

	renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.sortObjects = false;
	container.appendChild( renderer.domElement );

	vrEffect = new THREE.VREffect(renderer, VREffectLoaded);
	vrControls = new THREE.VRControls(camera);
	function VREffectLoaded(error) {
		if (error) {
			//fullScreenButton.innerHTML = error;
			//fullScreenButton.classList.add('error');
		}
	}

	window.addEventListener( 'keypress', onkey, true);
	window.addEventListener( 'resize', onWindowResize, false );
}

function onkey(event) {

  if (event.charCode == 'f'.charCodeAt(0)) {
    vrEffect.setFullScreen( true );
    console.log("F");
  } else if (event.charCode == 'o'.charCodeAt(0)) {
    fadeOut()
    console.log("o");
  } else if (event.charCode == 'i'.charCodeAt(0)) {
    fadeIn()
    console.log("i");
  } else {
  	return;
  }

  event.preventDefault();
  event.stopPropagation();

}

//A bit of logic for creating and destroying transitions.
//TODO: judging by the performance slowdown seen after cycling through the animations several times without refreshing page, scene.remove() is not actually clearing the transitions from memory (or some such)

var activeTransition;

function cleanTransition() {

	if ( activeTransition ) {
		scene.remove(activeTransition);
		TWEEN.removeAll;
	}

	console.log("Cleaned Up!")

}

function setupTransition(m) {

	var transitionHolder = new THREE.Object3D();
	transitionHolder.add( m );
	activeTransition = transitionHolder;
	scene.add( activeTransition );

}

function fadeOut() {

	//create holder
	var tH = new THREE.Object3D();

	//create cylinder
	var m = new THREE.Mesh(
		new THREE.CylinderGeometry( 2, 2, 4, 40, 20, true ),
		material1
	);

	m.position.set( 0, 0, 0);
	m.rotation.set( 1.571, 0, 1.571 );
	m.scale.set( 1, 0, 1 );

	m1 = new TWEEN.Tween( m.scale )
		.to( { x:1, y:1, z:1 }, 2000 )
		.easing(TWEEN.Easing.Sinusoidal.InOut)
		.start();

	m2 = new TWEEN.Tween( m.rotation )
		.to( { x:1.571*2  }, 2000 )
		.easing(TWEEN.Easing.Sinusoidal.InOut)
		.onUpdate(function() {
			//console.log( angle.a )
		})
		.start();
	
	//create cap 1
	var p = new THREE.Mesh(
		new THREE.CircleGeometry( 2, 40, 0, Math.PI * 2 ),
		material1
	);

	p.position.set( -2, 0, 0 );
	p.rotation.set( 0, 1.571, 0 );
	p.scale.set( 0, 0, 0 );

	p1 = new TWEEN.Tween( p.rotation )
		.to( { z:1.571*1  }, 2000 )
		.easing(TWEEN.Easing.Sinusoidal.InOut)
		.onUpdate(function() {
			//console.log( angle.a )
		})
		.start();

	p2 = new TWEEN.Tween( p.scale )
		.to( { x:1, y:1  }, 2000 )
		.easing(TWEEN.Easing.Sinusoidal.InOut)
		.onUpdate(function() {
			//console.log( angle.a )
		})
		.start();

	//create cap 2
	var l = new THREE.Mesh(
		new THREE.CircleGeometry( 2, 40, 0, Math.PI * 2 ),
		material1
	);

	l.position.set( 2, 0, 0 );
	l.rotation.set( 0, 1.571, 0 );
	l.scale.set( 0, 0, 0 );

	l1 = new TWEEN.Tween( l.rotation )
		.to( { z:1.571*1  }, 2000 )
		.easing(TWEEN.Easing.Sinusoidal.InOut)
		.onUpdate(function() {
			//console.log( angle.a )
		})
		.start();

	l2 = new TWEEN.Tween( l.scale )
		.to( { x:1, y:1  }, 2000 )
		.easing(TWEEN.Easing.Sinusoidal.InOut)
		.onUpdate(function() {
			//console.log( angle.a )
		})
		.start();

	//create scene
	tH.add(m);
	tH.add(p);
	tH.add(l);
	cleanTransition();		
	setupTransition(tH);

	tH.rotation.set( 0, 0, 1.571 );

}

function fadeIn() {

	//create holder
	var tH = new THREE.Object3D();

	//create cylinder
	var m = new THREE.Mesh(
		new THREE.CylinderGeometry( 2, 2, 4, 40, 20, true ),
		material1
	);

	m.position.set( 0, 0, 0);
	m.rotation.set( 1.571, 0, 1.571 );
	m.scale.set( 1, 1, 1 );
	
	m1 = new TWEEN.Tween( m.scale )
		.to( { x:1, y:0, z:1 }, 1000 )
		.easing(TWEEN.Easing.Sinusoidal.InOut)
		.start();

	m2 = new TWEEN.Tween( m.material )
		.to( { opacity:0 }, 900 )
		.easing(TWEEN.Easing.Sinusoidal.InOut)
		.start();

	//create cap 1
	var p = new THREE.Mesh(
		new THREE.CircleGeometry( 2, 40, 0, Math.PI * 2 ),
		material1
	);

	p.position.set( -2, 0, 0 );
	p.rotation.set( 0, 1.571, 0 );

	p1 = new TWEEN.Tween( p.scale )
		.to( { x:0, y:0, z:1 }, 1000 )
		.easing(TWEEN.Easing.Sinusoidal.InOut)
		.start();

	p2 = new TWEEN.Tween( p.material )
		.to( { opacity:0 }, 900 )
		.easing(TWEEN.Easing.Sinusoidal.InOut)
		.start();

	//create cap 2
	var l = new THREE.Mesh(
		new THREE.CircleGeometry( 2, 40, 0, Math.PI * 2 ),
		material1
	);

	l.position.set( 2, 0, 0 );
	l.rotation.set( 0, 1.571, 0 );

	l1 = new TWEEN.Tween( l.scale )
		.to( { x:0, y:0, z:1 }, 1000 )
		.easing(TWEEN.Easing.Sinusoidal.InOut)
		.start();

	l2 = new TWEEN.Tween( l.material )
		.to( { opacity:0 }, 900 )
		.easing(TWEEN.Easing.Sinusoidal.InOut)
		.start();

	//create scene
	tH.add(m);
	tH.add(p);
	tH.add(l);
	cleanTransition();		
	setupTransition(tH);

	tH.rotation.set( 0, 0, 1.571 );

}


function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

	requestAnimationFrame( animate );
	render();
	TWEEN.update();
}
	
function render() {

	vrControls.update();
	vrEffect.render( scene, camera );
	
}

function start() {

	init();
	animate();
}

window.addEventListener("load", start, false)