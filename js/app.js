var camera, scene, renderer;
var vrEffect;
var vrControls;
var box, boxTween;

function init() {

	container = document.getElementById( 'container' );

	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );

	scene = new THREE.Scene();

	var light = new THREE.DirectionalLight( 0xffffff, 2 );
	light.position.set( 1, 1, 1 ).normalize();
	scene.add( light );

	var light = new THREE.DirectionalLight( 0xffffff );
	light.position.set( -1, -1, -1 ).normalize();
	scene.add( light );

	renderer = new THREE.WebGLRenderer( { antialias: true } );

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

	renderer.setClearColor( 0xf0f0f0 );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.sortObjects = false;
	container.appendChild( renderer.domElement );

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


	var quantity = 4;

	for ( var i = 1; i <= quantity; i++ ) {
		
		var button = document.getElementById( 'tran' + i );

		var name = 'tran'+i;

		button.addEventListener('click', transitions[name]);
		
	}
}

var activeTransition;

function cleanSlate() {

	if ( activeTransition ) {
		scene.remove(activeTransition);
	}

	console.log("Cleaned Up!")

}

var transitions = { 
	
	'tran1' : function() { 
		
		cleanSlate();

		var transitionHolder = new THREE.Object3D();

		var tube = new THREE.Mesh(
			new THREE.CylinderGeometry( 2, 2, 50, 32, 80, false ),
			new THREE.MeshBasicMaterial( { color: 0xF8BC4A, wireframe: true } ) 
		);
		transitionHolder.add( tube );
		tube.position.set( 0, 0, 0);
		tube.rotation.set( 1.571, 0, 0 );
		
		activeTransition = transitionHolder;
		scene.add( activeTransition );

		//THREE.CylinderGeometry( radiusTop, radiusBottom, height, segmentsRadius, segmentsHeight, openEnded );

	},

	'tran2': function() {
		
		cleanSlate();

		var transitionHolder = new THREE.Object3D();

		var box = new THREE.Mesh(
			new THREE.BoxGeometry( 4, 4, 4, 30, 30, 30 ),
			new THREE.MeshBasicMaterial( { color: 0xF8BC4A, wireframe: true } ) 
		);
		transitionHolder.add( box );
		box.position.set( 0, 0, -2 );
		box.rotation.set( 1, 1, 1 );
		activeTransition = transitionHolder;
		scene.add( activeTransition );

	},

	'tran3': function() {
		
		cleanSlate();

		var transitionHolder = new THREE.Object3D();

		var torus = new THREE.Mesh(
			new THREE.TorusKnotGeometry( 10, 3, 300, 30 ),
			new THREE.MeshBasicMaterial( { color: 0xF8BC4A, wireframe: true } ) 
		);
		transitionHolder.add( torus );
		torus.position.set( 0, 0, -20 );
		torus.rotation.set( 1, 1, 1 );
		activeTransition = transitionHolder;
		scene.add( activeTransition );

	},

	'tran4': function() {

		cleanSlate();

		var transitionHolder = new THREE.Object3D();

		var tetra = new THREE.Mesh(
			new THREE.TetrahedronGeometry( 10, 5 ),
			new THREE.MeshBasicMaterial( { color: 0xF8BC4A, wireframe: true } ) 
		);
		transitionHolder.add( tetra );
		tetra.position.set( 0, 0, -10 );
		tetra.rotation.set( 1, 1, 1 );
		activeTransition = transitionHolder;
		scene.add( activeTransition );

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

function createTweens() {

	//boxTween = new TWEEN.Tween( box.scale ).to( { x:6, y:1, z: 6 }, 4000 ).start();

	//new THREE.CylinderGeometry( radiusTop, radiusBottom, height, segmentsRadius, segmentsHeight, openEnded );
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