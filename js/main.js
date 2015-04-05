var camera, scene, renderer;
var renderer, effect;
var controls, vrcontrols;
var manager;


/*=========== GENERIC VR SCENE SETUP ===========*/

function init() {

	//setup three.js VR scene

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.sortObjects = false;
  renderer.setClearColor( 0x000000, 0 );
  document.body.appendChild(renderer.domElement);

  effect = new THREE.VREffect(renderer);
  effect.setSize(window.innerWidth, window.innerHeight);

	manager = new WebVRManager(effect, { hideButton: true });

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10000 );
  
  controls = new THREE.MouseControls(camera);

  vrcontrols = new THREE.VRControls(camera);

	var fullScreenButton = document.getElementById( 'fullscreenButton' );
	fullScreenButton.onclick = function() {
		fullscreen();
	};

  window.addEventListener('resize', onWindowResize);
  document.addEventListener('dblclick', fullscreen);
  window.addEventListener('keypress', onKey);


  //setup visual elements

	var light = new THREE.PointLight( 0xFFFFFF, 1.25 );
	light.position.set( 0, 0, 0 );
	scene.add( light );

	//background sphere
	var geometry = new THREE.SphereGeometry( 500, 60, 40 );
	geometry.applyMatrix( new THREE.Matrix4().makeScale( -1, 1, 1 ) );
	var material = new THREE.MeshBasicMaterial( {
		//map: THREE.ImageUtils.loadTexture( 'images/backgrounds/sechelt-1.png' )
		color: 0xCCCCCC
	} );
	var mesh = new THREE.Mesh( geometry, material );
	scene.add(mesh);

	//load first demo
	window[ demos[0].func ]();


  animate();

}

function fullscreen(event) {
  if (manager.isVRMode()) {
    effect.setFullScreen(true);
  } else {
    console.log('not vr enabled');
  }
  
};

function onKey( event ) {


	if (!(event.metaKey || event.altKey || event.ctrlKey)) {
		event.preventDefault();
	}

	if ( event.charCode == 'f'.charCodeAt(0) ) {

		//turn on fullscreen
		//effect.setFullScreen( true );
		fullscreen();

	} else if ( event.charCode == 'z'.charCodeAt(0) ) {

		//zero sensor
		vrcontrols.zeroSensor();

	} else if ( event.charCode == 'v'.charCodeAt(0) ) {

		//load first function
		window[ demos[0].func ]();

	} else if ( event.keyCode == '38' ) {

		//up arrow: load previous function
		demoCounter --;

		if( demoCounter < 0 ) { 
			demoCounter = demos.length - 1;
		}

		window[ demos[demoCounter].func ]();

	} else if ( event.keyCode == '40' ) {

		//down arrow: load next function
		demoCounter ++;

		if( demoCounter == demos.length ) { 
			demoCounter = 0;
		}

		window[ demos[demoCounter].func ]();

	}

	event.stopPropagation();

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	effect.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

  if (manager.isVRMode()) {
    effect.render(scene, camera);
    vrcontrols.update();
  } else {
    renderer.render(scene, camera);
    controls.update();
  }

	requestAnimationFrame( animate );
	TWEEN.update();
}

window.addEventListener("load", init, false)







/*=========== SETUP PROJECT-SPECIFIC ELEMENTS ===========*/

var demoCounter = 0;


//create link
var Link = function( label, url, categories, func ) {

	var link;

	self.label = label;
	self.url = url;
	self.categories = categories;

	var li = document.createElement( "li" );
	var txt = document.createTextNode( self.label );
	li.appendChild( txt );
	
	var button = document.getElementById( "links" ).appendChild( li );
	button.addEventListener('click', function() { 
		window[func]();
	});

	return link;

}

//go through demoList.js and for each that is active, import JS and create link
for ( var i = 0; i < demos.length; i++ ) {

	var t = demos[i];

	if ( t.active ) {
	
		var script = document.createElement( 'script' );
		script.src = t.url;
		script.onload = function() {
			
		};

		document.head.appendChild( script );

		var link = new Link( 
			demos[i].label,
			demos[i].url, 
			demos[i].category,
			demos[i].func
		);

	}

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

