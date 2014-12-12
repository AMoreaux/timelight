// Created by Bjorn Sandvik - thematicmapping.org
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

(function () {



    var webglEl = document.getElementById('webgl');


    if (!Detector.webgl) {
        Detector.addGetWebGLMessage(webglEl);
        return;
    }
   /* var locateLV = document.getElementById("locate");
    locateLV.addEventListener( 'mousedown', select, false );
    var clic;*/


    var width  = window.innerWidth,
        height = window.innerHeight;

    // Earth params
    var radius   = 0.5,
        segments = 32,
        rotation = 200;

    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 1000);
    camera.position.z = 1.5;

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);

    scene.add(new THREE.AmbientLight(0xffffff));

    //var light = new THREE.DirectionalLight(0xffffff, 0.5);
    //light.position.set(5,3,5);
    //scene.add(light);

    var sphere = createSphere(radius, segments);
    sphere.rotation.y = rotation;
    scene.add(sphere)

    var clouds = createClouds(radius, segments);
    clouds.rotation.y = rotation;
    scene.add(clouds)

    var stars = createStars(90, 64);
    scene.add(stars);

    var controls = new THREE.TrackballControls(camera);


    var btn = document.createElement("BUTTON");        // Create a <button> element
    btn.appendChild(renderer.domElement);
    webglEl.appendChild(renderer.domElement);


    render();

///debut des modifications

    function select(){
        clic = 1;
    }

   /* function render() {
        var mouseX =  -0.474730843697242, mouseY = 0.32181914573811776;
        controls.update();
        //sphere.rotation.y += 0.0002;
        clouds.rotation.y += 0.002;
        requestAnimationFrame(render);
        camera.position.x += ( mouseX - camera.position.x ) * 0.1;
        camera.position.y += ( - mouseY - camera.position.y ) * 0.1;
        camera.position.z = 1;
        console.log('posX:',camera.position.x,'posY:', camera.position.y,'posZ:', camera.position.z);



        camera.lookAt( scene.position );

        renderer.render( scene, camera );
    }*/


    /*function draw() {
        requestAnimationFrame(draw);
        camera.position.x = camera.position.x * 0.1;
        render();
    }*/


    /*function onDocumentMouseDown(event) {

        event.preventDefault();

        var position = new THREE.Vector3(camera.position.x,0 ,600);
        var target = new THREE.Vector3(0,0 ,0);
        function tweenCamera(position, target){
            new TWEEN.Tween( camera.position ).to( {
                x: position.x,
                y: position.y,
                z: position.z}, 600 )
                .easing( TWEEN.Easing.Sinusoidal.EaseInOut).start();
            new TWEEN.Tween( controls.target ).to( {
                x: target.x,
                y: target.y,
                z: target.z}, 600 )
                .easing( TWEEN.Easing.Sinusoidal.EaseInOut).start();
                console.log('test');
        }
        tweenCamera(position, target);


        var positionLV = {
            x:  -0.46807309919719614,
            y:  0.317680320127933,
            z:  0.21729242498508317
        };

        //camera.position.set(1,0 ,0);
        Galaxy.cameraPathToPoint(camera.position, positionLV);  //camera.lookAt(new THREE.Vector3(0,0,0));


        render();

    }*/

//// Fin des modifs
   function render() {
        controls.update();
        //sphere.rotation.y += 0.0002;
       /*if(clic !== undefined){
               camera.position.x += 0.03;
               camera.position.y += 0.02;
               camera.position.z -= 0.08;
           console.log(camera.position.x, camera.position.y, camera.position.z);
       }*/
        clouds.rotation.y += 0.0002;
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }

    function createSphere(radius, segments) {
        return new THREE.Mesh(
            new THREE.SphereGeometry(radius, segments, segments),
            new THREE.MeshPhongMaterial({
                map:         THREE.ImageUtils.loadTexture('assets/images/2_no_clouds_4k.jpg'),
                bumpMap:     THREE.ImageUtils.loadTexture('assets/images/elev_bump_4k.jpg'),
                bumpScale:   0.005,
                specularMap: THREE.ImageUtils.loadTexture('assets/images/water_4k.png'),
                specular:    new THREE.Color('grey')
            })
        );
    }

    function createClouds(radius, segments) {
        return new THREE.Mesh(
            new THREE.SphereGeometry(radius + 0.003, segments, segments),
            new THREE.MeshPhongMaterial({
                map:         THREE.ImageUtils.loadTexture('assets/images/fair_clouds_4k.png'),
                transparent: true
            })
        );
    }

    function createStars(radius, segments) {
        return new THREE.Mesh(
            new THREE.SphereGeometry(radius, segments, segments),
            new THREE.MeshBasicMaterial({
                map:  THREE.ImageUtils.loadTexture('assets/images/galaxy_starfield.png'),
                side: THREE.BackSide
            })
        );
    }

}());