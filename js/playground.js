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

		//console.log( self.label ); 
		window[func]();
	
	} );

	return link;

}


var category = []
category.push( "transitions" );
category.push( "models" );
category.push( "misc" );


var transList = [
	{
		"label"			: "Cylinder Spin",
		"url"			: "js/scenes/cylinder1.js",
		"category"		: 0,
		"func"			: "cylinder1",
		"active"		: true
	},
	{
		"label"			: "Teleport Hallway",
		"url"			: "js/scenes/teleport1.js",
		"category"		: 0,
		"func"			: "teleport1",
		"active"		: true
	},
	{
		"label"			: "Fragment Reassemble",
		"url"			: "js/scenes/fragment1.js",
		"category"		: 0,
		"func"			: "fragment1",
		"active"		: true
	},
	{
		"label"			: "Testing",
		"url"			: "js/scenes/test.js",
		"category"		: 0,
		"func"			: "test",
		"active"		: true
	}
];


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
		console.log( name );
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

	'tran7': function() {
		
		//create holder
		var tH = new THREE.Object3D();

		//create cylinder
		var m = new THREE.Mesh(
			new THREE.CylinderGeometry( 2, 2, 4, 40, 20, true ),
			new THREE.MeshBasicMaterial( { color: 0xFFFFFF, wireframe: true } ) 
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
			new THREE.MeshBasicMaterial( { color: 0xFFFFFF, wireframe: true } ) 
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
			new THREE.MeshBasicMaterial( { color: 0xFFFFFF, wireframe: true } ) 
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

	},

	'tran8': function() {
		
		//create holder
		var tH = new THREE.Object3D();

		//create cylinder
		var m = new THREE.Mesh(
			new THREE.CylinderGeometry( 2, 2, 4, 40, 20, true ),
			new THREE.MeshBasicMaterial( { color: 0xFFFFFF, wireframe: true, transparent: true } ) 
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
			new THREE.MeshBasicMaterial( { color: 0xFFFFFF, wireframe: true, transparent: true } ) 
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
			new THREE.MeshBasicMaterial( { color: 0xFFFFFF, wireframe: true, transparent: true } ) 
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

	},

	'tran9': function() { 

		//create holder
		var tH = new THREE.Object3D();
		var geometry = new THREE.IcosahedronGeometry( 400, 1 );
		var material = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: false, transparent: true } );
		material.side = THREE.DoubleSide;
		
		// explode geometry into objects
		var group = explode( geometry, material );

		// animate objects
		for ( var i = 0; i < group.children.length; i ++ ) {

			var object = group.children[ i ];
			var target = object.position.y + 20;
			var delay = - ( object.position.x / 400 ) + ( object.position.y + 200 ) / 400;

			new TWEEN.Tween( object.position )
				.to( { y: target }, 1500 )
				.delay( ( 1 - delay ) * 800 )
				.easing( TWEEN.Easing.Exponential.Out )
				.start();


		}

		tH.add( group );
		cleanTransition();		
		setupTransition( tH );

	},

	'tran10': function() { 

		//create holder
		var tH = new THREE.Object3D();
		var geometry = new THREE.IcosahedronGeometry( 400, 1 );
		var material = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: false, transparent: true } );
		material.side = THREE.DoubleSide;
		
		// explode geometry into objects
		var group = explode( geometry, material );

		// animate objects
		for ( var i = 0; i < group.children.length; i ++ ) {

			var object = group.children[ i ];
			object.material.opacity = 0;
			object.scale.set( 0, 0, 0 )
			var target = object.position.y + 20;
			var delay = - ( object.position.x / 400 ) + ( object.position.y + 200 ) / 400;

			new TWEEN.Tween( object.scale )
				.to( { x: 1, y: 1, z: 1 }, 1500 )
				.delay( (i * 100) / 5 )
				.easing( TWEEN.Easing.Exponential.Out )
				.start();

			new TWEEN.Tween( object.material )
				.to( { opacity: 1 }, 1500 )
				.easing( TWEEN.Easing.Exponential.Out )
				.start();

		}

		tH.add( group );
		cleanTransition();		
		setupTransition( tH );

	},

	'tran11': function() { 

		//create holder
		var tH = new THREE.Object3D();
		var geometry = new THREE.IcosahedronGeometry( 400, 1 );
		var material = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: false, transparent: true } );
		material.side = THREE.DoubleSide;
		
		// explode geometry into objects
		var group = explode( geometry, material );

		// animate objects
		for ( var i = 0; i < group.children.length; i ++ ) {

			var object = group.children[ i ];
			var destY = object.position.y;
			
			object.position.setY( destY - 100 );
			object.material.opacity = 0;
			object.scale.set( 0.2, 0.2, 0.2 )

			var delay = - ( object.position.x / 400 ) + ( object.position.y + 200 ) / 400;

			new TWEEN.Tween( object.position )
				.to( { y: destY }, 1500 )
				.delay( ( 1 - delay ) * 200 )
				.easing( TWEEN.Easing.Sinusoidal.InOut )
				.start();

			new TWEEN.Tween( object.scale )
				.to( { x:1, y:1, z:1 }, 1500 )
				.delay( ( 1 - delay ) * 200 )
				.easing( TWEEN.Easing.Sinusoidal.InOut )
				.start();

			new TWEEN.Tween( object.material )
				.to( { opacity: 1 }, 1000 )
				.easing( TWEEN.Easing.Sinusoidal.InOut )
				.start();

		}

		new TWEEN.Tween( tH.rotation )
			.to( { x: 2 }, 6000 )
			.start();

		tH.add( group );
		cleanTransition();		
		setupTransition( tH );

	},

	'tran12': function() { 

		//create holder
		var geometry = new THREE.IcosahedronGeometry( 10, 3 );
		var material = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: false, transparent: true } );
		material.side = THREE.DoubleSide;
		
		// explode geometry into objects
		var group = explode( geometry, material );

		group.children.sort( function ( a, b ) {

			// return a.position.x - b.position.x; // sort x
			return b.position.y - a.position.y; // sort y

		} );

		// animate objects
		for ( var i = 0; i < group.children.length; i ++ ) {

			var object = group.children[ i ];
			var targetY = object.position.y;
			
			object.position.setY( targetY - 5 );
			object.material.opacity = 1;
			object.scale.set( 0.01, 0.01, 0.01 );

			new TWEEN.Tween( object.position )
				.to( { y: targetY }, 1500 )
				.delay( i * 8 )
				.easing( TWEEN.Easing.Sinusoidal.Out )
				.onStart( function() {
					//object.material.opacity = 1;
				})
				.start();
				
			new TWEEN.Tween( object.scale )
				.to( { x:1.05, y:1.05, z:1.05 }, 1500 )
				.delay( i * 8 )
				.easing( TWEEN.Easing.Sinusoidal.Out )
				.start();

		}
		
		group.position.setZ( 0 );
		cleanTransition();		
		setupTransition( group );

	},

	'tran13': function() { 

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

	},

	'tran14': function() { 

		//create holder
		var tH = new THREE.Object3D();

		var rectPoints = [];
		
		rectPoints.push( new THREE.Vector2 (   10,  -5 ) );
		rectPoints.push( new THREE.Vector2 (  10,  5 ) );
		rectPoints.push( new THREE.Vector2 (  -10,  5 ) );
		rectPoints.push( new THREE.Vector2 (  -10, -5 ) );
		
		var rectShape = new THREE.Shape( rectPoints );

		var extrusionSettings = {
			//size: 1,
			amount: 4,
			//curveSegments: 3,
			//bevelThickness: 1,
			//bevelSize: 2,
			bevelEnabled: false,
			material: 0,
			extrudeMaterial: 1
		};
		
		var rectGeo = new THREE.ExtrudeGeometry( rectShape, extrusionSettings );
		
		var materialFront = new THREE.MeshBasicMaterial( { color: 0xffffff, transparent: true, opacity: 0 } );
		var materialSide = new THREE.MeshPhongMaterial( { color: 0xcccccc  } );
		materialSide.side = THREE.DoubleSide;
		var materialArray = [ materialFront, materialSide ];
		var rectMat = new THREE.MeshFaceMaterial( materialArray );

		//var rectMat = new THREE.MeshPhongMaterial( { color: 0xffff00, wireframe: false} );
		
		//create model and add to scene
		var rect = new THREE.Mesh( rectGeo, rectMat );
		tH.add( rect );
		
		// add a wireframe to model
		// var wireframeTexture = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true, transparent: true, opacity: 0.1 } ); 
		// var rect = new THREE.Mesh( rectGeo, wireframeTexture );
		// tH.add( rect );

		tH.add( rect );
		tH.position.set( 0, 0, -50 )
		tH.rotation.set( .75, .75, 0 )
		cleanTransition();		
		setupTransition( tH );

	},

	'tran15': function() { 

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

	},

	'tran16': function() { 

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

};

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