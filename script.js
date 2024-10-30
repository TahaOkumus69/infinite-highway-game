// Temel Three.js sahnesini kurma
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("gameCanvas") });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Zemin ve ışık ekleme
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// Zemin oluşturma
const roadGeometry = new THREE.PlaneGeometry(1000, 20);
const roadMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });
const road = new THREE.Mesh(roadGeometry, roadMaterial);
road.rotation.x = -Math.PI / 2;
scene.add(road);

// Araba yükleyici
let car;
const loader = new THREE.GLTFLoader();
loader.load('https://model-url.com/bugatti_chiron_model.gltf', (gltf) => {
  car = gltf.scene;
  car.scale.set(0.5, 0.5, 0.5);
  scene.add(car);
  car.position.set(0, 1, 0);
});

// Kamera ve hız
let speed = 0;
let maxSpeed = 300;
camera.position.z = 5;

// Gece/gündüz geçiş fonksiyonu
let isDay = true;
document

