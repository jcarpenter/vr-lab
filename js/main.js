var camera, scene, renderer;
var vrEffect;
var vrControls;
var box, boxTween;


var Link = function( label, url, categories, func ) {

	var link;

	self.label = label;
	self.url = url;
	self.categories = categories;

	var li = document.createElement( "li" );
	var txt = document.createTextNode( self.label );
	// var a = document.createElement( "a" );
	// a.appendChild( txt );
	// a.href = self.url;
	// a.target = "_blank"
	li.appendChild( txt );
	
	var button = document.getElementById( "transitions" ).appendChild( li );
	button.addEventListener('click', function() { 

		window[func]();
	
	} );

	return link;

}


for ( var i = 0; i < transList.length; i++ ) {

	//go through transList
	//for each active
	//import it's js, and create a link

	var t = transList[i];

	if ( t.active ) {
	
		var script = document.createElement( 'script' );
		script.src = t.url;
		script.onload = function() {
			
		};

		document.head.appendChild( script );

		var link = new Link( 
			transList[i].label,
			transList[i].url, 
			transList[i].category,
			transList[i].func
		);

	}

}


function init() {

	container = document.getElementById( 'container' );

	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );

	scene = new THREE.Scene();

	var light = new THREE.PointLight( 0xFFFFFF, 1.25 );

	light.position.set( 0, 0, 0 );
	scene.add( light );

	//background sphere
	var bgGeo = new THREE.SphereGeometry( 500, 60, 40 );
	bgGeo.applyMatrix( new THREE.Matrix4().makeScale( -1, 1, 1 ) );

	var bgMat = new THREE.MeshBasicMaterial( {
		map: THREE.ImageUtils.loadTexture( 'images/sechelt-360-1.png' )
	} );

	var background = new THREE.Mesh( bgGeo, bgMat );
	scene.add(background);

	//renderer
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

	window.addEventListener( 'keypress', onkey, true);
	window.addEventListener( 'resize', onWindowResize, false );
}


function onkey( event ) {

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


var activeTransition; 

function cleanTransition() {

	if ( activeTransition ) {
		scene.remove(activeTransition);
		TWEEN.removeAll;
	}

}


function setupTransition(m) {

	var transitionHolder = new THREE.Object3D();
	transitionHolder.add( m );
	activeTransition = transitionHolder;
	scene.add( activeTransition );

}


//explode objects function, from MrDoob
function explode( geometry, material ) {

	var group = new THREE.Group();

	for ( var i = 0; i < geometry.faces.length; i ++ ) {

		var face = geometry.faces[ i ];

		var vertexA = geometry.vertices[ face.a ].clone();
		var vertexB = geometry.vertices[ face.b ].clone();
		var vertexC = geometry.vertices[ face.c ].clone();

		var geometry2 = new THREE.Geometry();
		geometry2.vertices.push( vertexA, vertexB, vertexC );
		geometry2.faces.push( new THREE.Face3( 0, 1, 2 ) );

		var mesh = new THREE.Mesh( geometry2, material );
		mesh.position.sub( geometry2.center() );
		group.add( mesh );

	}

	return group;

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