
// create scene
var scene = new THREE.Scene();
// create camera
var camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
// create renderer
var renderer = new THREE.WebGLRenderer({
    // allow transparency to show the gradient background
    // we defined in the CSS
    alpha: true,
    antialias: false
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
// create cube
var geometry = new THREE.BoxGeometry(2.25, 2.25, 2.25);


// load material from image
// var texture = new THREE.TextureLoader().load('images/cubetex/side1.png');
// var material = new THREE.MeshBasicMaterial({ map: texture });
// creaste a material with side1 - side6 for faces
// var materialArray = [];

// var texture_ft = new THREE.TextureLoader().load('images/cubetex/side1.png');
// var texture_bk = new THREE.TextureLoader().load('images/cubetex/side2.png');
// var texture_up = new THREE.TextureLoader().load('images/cubetex/side3.png');
// var texture_dn = new THREE.TextureLoader().load('images/cubetex/side4.png');
// var texture_rt = new THREE.TextureLoader().load('images/cubetex/side5.png');
// var texture_lf = new THREE.TextureLoader().load('https://media.discordapp.net/attachments/903124578241499156/1066865618135040100/ctex2.gif');

// materialArray.push(new THREE.MeshBasicMaterial({ map: texture_ft }));
// materialArray.push(new THREE.MeshBasicMaterial({ map: texture_bk }));
// materialArray.push(new THREE.MeshBasicMaterial({ map: texture_up }));
// materialArray.push(new THREE.MeshBasicMaterial({ map: texture_dn }));
// materialArray.push(new THREE.MeshBasicMaterial({ map: texture_rt }));
// materialArray.push(new THREE.MeshBasicMaterial({ map: texture_lf }));

// for (var i = 0; i < 6; i++)
//     materialArray[i].side = THREE.FRONT_SIDE;

var texture = new THREE.TextureLoader().load("https://media.discordapp.net/attachments/903124578241499156/1066865618135040100/ctex2.gif")


var material = new THREE.MeshLambertMaterial({map: texture});





material.needsUpdate = true;
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// ambientlight
var ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// set camera position
camera.position.z = 5;
// render
var render = function () {
    requestAnimationFrame(render);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
};
// resize
window.addEventListener('resize', function () {
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});
render();



// // animate the body background position to infinite scroll
// var scroll = 0;
// var scrollSpeed = 2;


// function animate() {
//     // use Math.sin() to create a smooth infinite scroll
//     scroll += scrollSpeed * Math.sin(Date.now() * 0.00020);


//     $('body').css('background-position', `${scroll}px ${scroll}px`); // 
    
//     // rotate hue
//     $('body').css('filter', `hue-rotate(${scroll}deg)`); //
//     requestAnimationFrame(animate);
// }
// animate();

function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end
}

// get mouse screen relative position to world
function getMouseWorldPosition(event) {
    var vector = new THREE.Vector3();
    vector.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1,
        0.5
    );
    vector.unproject(camera);
    var dir = vector.sub(camera.position).normalize();
    var distance = -camera.position.z / dir.z;
    var pos = camera.position.clone().add(dir.multiplyScalar(distance));
    return pos;
}

var mouse = new THREE.Vector2();

function recordMouseMove(){

    cube.position.x = lerp(cube.position.x, mouse.x, 0.05);
    cube.position.y = lerp(cube.position.y, mouse.y, 0.05);
    
}

// on mouse move
window.addEventListener('mousemove', function (event) {
    // set mouse position
    mouse = getMouseWorldPosition(event);

})

// update every frame
var scroll = 0
var scrollSpeed = 2;
// while mouse held down, lerp scale of cube to 0
// on mouse up, lerp scale of cube to 1
var mouseDown = false;
window.addEventListener('mousedown', function (event) {
    mouseDown = true;
})

window.addEventListener('mouseup', function (event) {
    mouseDown = false;
})


function update() {
    recordMouseMove();

    requestAnimationFrame(update);

    // update body hue
    $('body').css('filter', `hue-rotate(${cube.position.x  * 100}deg)`);
    // update body background image scroll posti    
    $('body').css('background-position', `${cube.position.x * 100}px ${scroll}px`); //

    // update scroll
    scroll += scrollSpeed 
    
    if (mouseDown) {
        cube.scale.x = lerp(cube.scale.x, .5, 0.05);
        cube.scale.y = lerp(cube.scale.y, .5, 0.05);
        cube.scale.z = lerp(cube.scale.z, .5, 0.05);

        // scale down body background
        $('body').css('background-size', `${cube.scale.x * 145}%`);
    } else {
        cube.scale.x = lerp(cube.scale.x, 1, 0.05);
        cube.scale.y = lerp(cube.scale.y, 1, 0.05);
        cube.scale.z = lerp(cube.scale.z, 1, 0.05);

        // scale up body background
        $('body').css('background-size', `${cube.scale.x * 150}%`);
    }
}




update();


