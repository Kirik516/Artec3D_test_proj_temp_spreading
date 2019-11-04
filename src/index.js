const THREE = require("three");
const OrbitControls = require("three-orbitcontrols");
const PLYLoader = require("three-ply-loader");

PLYLoader(THREE);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.set(0, 3, -4);

const renderer = setupRenderer();
const scene = setupScene();
const controls = setupControls();

const loader = new THREE.PLYLoader();

window.addEventListener( "resize", onWindowResize, false );

loader.load(
  "models/roman.ply",
  geometry => {

    geometry.computeVertexNormals();

    const material = new THREE.MeshStandardMaterial({color: 0x0055ff, flatShading: true});
    const mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);

  },
  xhr => {
    console.log((xhr.loaded / xhr.total * 100) + "% loaded");
  },
  error => {
    console.error("Couldn't load the file. An error happened!");
  }
);

function setupRenderer() {

  const renderer = new THREE.WebGLRenderer();

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.gammaInput = true;
  renderer.gammaOutput = true;
  document.body.appendChild(renderer.domElement);

  return renderer;

}

function setupScene() {

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x72645b);
  scene.fog = new THREE.Fog( 0x72645b, 4, 20 );

  // lights
  const light = new THREE.HemisphereLight(0x443333, 0x111122);
  scene.add(light);
  addDirectionalLight( 1, 1, 1, 0xffffff, 1.35, scene );
  addDirectionalLight( 0.5, 1, - 1, 0xffaa00, 1, scene );

  // ground
  const plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry( 50, 50 ),
    new THREE.MeshPhongMaterial( { color: 0x999999, specular: 0x101010 } )
  );
  plane.rotation.x = - Math.PI / 2;
  plane.position.y = - 0.5;
  scene.add( plane );
  
  // x, y, z
  const axesHelp = new THREE.AxesHelper(1);
  scene.add(axesHelp);

  return scene;

}

function addDirectionalLight( x, y, z, color, intensity, scene ) {
  const directionalLight = new THREE.DirectionalLight( color, intensity );
  directionalLight.position.set( x, y, z );
  scene.add( directionalLight );
}

function setupControls() {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.y = camera.position.y;
  controls.screenSpacePanning = true;
  return controls;
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

(function animate() {

  controls.update();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

})();
