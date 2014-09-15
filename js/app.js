var camera, scene, renderer;
var vrEffect;
var vrControls;
var box, boxTween;

function init() {

	container = document.getElementById( 'container' );

	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );

	scene = new THREE.Scene();

	var light = new THREE.PointLight( 0xFFFFFF, 0.5, 2 );

	light.position.set( 0, 0, 0 );
	scene.add( light );

	/*
	var light = new THREE.DirectionalLight( 0xffffff );
	light.position.set( -1, -1, -1 ).normalize();
	scene.add( light );
	*/

	renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.sortObjects = false;
	container.appendChild( renderer.domElement );

	var fullScreenButton = document.getElementById( 'fullscreenButton' );
	fullScreenButton.onclick = function() {
		vrEffect.setFullScreen( true );
	};

	vrEffect = new THREE.VREffect(renderer, VREffectLoaded);
	vrControls = new THREE.VRControls(camera);
	function VREffectLoaded(error) {
		if (error) {
			//fullScreenButton.innerHTML = error;
			//fullScreenButton.classList.add('error');
		}
	}

	transitionsInit();

	window.addEventListener( 'keypress', onkey, true);
	window.addEventListener( 'resize', onWindowResize, false );
}

function onkey(event) {

  if (event.charCode == 'f'.charCodeAt(0)) {
    vrEffect.setFullScreen( true );
    console.log("F");
  } else if (event.charCode == 'v'.charCodeAt(0)) {
    console.log("V");
  } else if (event.charCode == 'x'.charCodeAt(0)) {
    console.log("X");
  } else {
  	return;
  }

  event.preventDefault();
  event.stopPropagation();

}


function transitionsInit() {

	//var quantity = 4;

	var count = Object.keys(transitions).length;

	for ( var i = 1; i <= count; i++ ) {
		
		var name = 'tran'+i;
		var button = document.getElementById( name );
		button.addEventListener('click', transitions[name]);
		
	}
}

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

//Easing functions: http://sole.github.io/tween.js/examples/03_graphs.html

var transitions = { 
	
	'tran1': function() { 
		
		var m = new THREE.Mesh(
			new THREE.TubeGeometry(),
			new THREE.MeshBasicMaterial( { color: 0xFFFFFF, wireframe: true } ) 
		);
	
		cleanTransition();		
		setupTransition(m);

		m.position.set( 0, 0, 0);
		m.rotation.set( 1.571, 0, 0 );

	},

	'tran2': function() {
		
		var m = new THREE.Mesh(
			new THREE.BoxGeometry( 1, 1, 1, 60, 1, 60 ),
			new THREE.MeshBasicMaterial( { color: 0xFFFFFF, wireframe: true } ) 
		);

		cleanTransition();		
		setupTransition(m);

		m.scale.set( 0, 0, 1 );

		t1 = new TWEEN.Tween( m.scale ).
			to( { x:1, y:0.1, z:1 }, 1500 ).
			easing(TWEEN.Easing.Quadratic.InOut);
		
		t1.start();

	},

	'tran3': function() {

		var m = new THREE.Mesh(
			new THREE.CylinderGeometry( 2, 2, 10, 32, 20, true ),
			new THREE.MeshBasicMaterial( { color: 0xf8bc4a, wireframe: true } ) 
		);
		
		cleanTransition();		
		setupTransition(m);

		m.position.set( 0, 0, 0);
		m.rotation.set( 1.571, 0, 0 );
		m.scale.set( 1, 0.1, 1 );

		t1 = new TWEEN.Tween( m.scale )
			.to( { x:1, y:1, z:1 }, 3000 )
			.easing(TWEEN.Easing.Quadratic.InOut)
			.start();

		
		t2 = new TWEEN.Tween( m.rotation )
			.to( { x:1.571, y:1.571, z:0 }, 3000 )
			.easing(TWEEN.Easing.Quadratic.InOut)
			.start();
		
	},

	'tran4': function() {

		var m = new THREE.Mesh(
			new THREE.CylinderGeometry( 2, 2, 2, 32, 20, true ),
			new THREE.MeshBasicMaterial( { color: 0xf8bc4a, wireframe: true } ) 
		);
		
		cleanTransition();		
		setupTransition(m);

		m.position.set( 0, 0, -1);
		m.rotation.set( 1.571, 0, 0 );
		m.scale.set( 0, 0, 0 );

		t1 = new TWEEN.Tween( m.scale )
			.to( { x:1, y:2, z:1 }, 3000 )
			.easing(TWEEN.Easing.Quadratic.InOut)
			.start();

		var axis = new THREE.Vector3(.5,.1,.1)
		var angle = { a: 1 };

		t2 = new TWEEN.Tween( m.rotation )
			.to( { y:1.571  }, 3000 )
			.easing(TWEEN.Easing.Quadratic.InOut)
			.onUpdate(function() {
				console.log( angle.a )
			})
			.start();

	},

	'tran5': function() {
		
		var m = new THREE.Mesh(
			new THREE.CylinderGeometry( 2, 2, 2, 32, 20, true ),
			new THREE.MeshBasicMaterial( { color: 0xf8bc4a, wireframe: true } ) 
		);
		
		cleanTransition();		
		setupTransition(m);

		m.position.set( 0, 0, -1);
		m.rotation.set( 1.571, 0, 0 );
		m.scale.set( 0, 0, 0 );

		t1 = new TWEEN.Tween( m.scale )
			.to( { x:1, y:2, z:1 }, 3000 )
			.easing(TWEEN.Easing.Quadratic.InOut)
			.start();

		var axis = new THREE.Vector3(.5,.1,.1)
		var angle = { a: 1 };

		t2 = new TWEEN.Tween( m.rotation )
			.to( { y:1.571  }, 3000 )
			.easing(TWEEN.Easing.Quadratic.InOut)
			.onUpdate(function() {
				console.log( angle.a )
			})
			.start();

	},

	'tran6': function() {
		
		var m = new THREE.Mesh(
			new THREE.TetrahedronGeometry( 10, 5 ),
			new THREE.MeshBasicMaterial( { color: 0xFFFFFF, wireframe: true } ) 
		);

		cleanTransition();		
		setupTransition(m);

		m.position.set( 0, 0, -10 );
		m.rotation.set( 1, 1, 1 );

	},

};



/*
function tran1() {
	console.log("test");
}
*/



function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

	requestAnimationFrame( animate );
	render();
	TWEEN.update();
	//box.rotateY(0.005);
	//box.translateY(0.01);
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