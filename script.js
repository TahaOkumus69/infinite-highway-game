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
loader.load('.bugatti_chiron.glb', (gltf) => {
  car = gltf.scene;
  car.scale.set(0.5, 0.5, 0.5);
  scene.add(car);
  car.position.set(0, 1, 0);
});

// Kamera ve hız ayarları
let speed = 0;
let maxSpeed = 300;
camera.position.z = 5;

// Gece/gündüz geçiş fonksiyonu
let isDay = true;
document.getElementById("dayNightToggle").addEventListener("click", () => {
  isDay = !isDay;
  ambientLight.intensity = isDay ? 0.5 : 0.1;
  directionalLight.intensity = isDay ? 0.5 : 0.1;
  renderer.setClearColor(isDay ? 0x87CEEB : 0x0a0a0a); // Gündüz mavi, gece siyah arkaplan
});

// Klavye kontrolleri
const keys = { w: false, a: false, s: false, d: false, space: false };

window.addEventListener("keydown", (event) => keys[event.key.toLowerCase()] = true);
window.addEventListener("keyup", (event) => keys[event.key.toLowerCase()] = false);

// Oyun döngüsü
function animate() {
  requestAnimationFrame(animate);

  // Araba hareket kontrolleri
  if (keys.w) speed = Math.min(maxSpeed, speed + 1);
  if (keys.s) speed = Math.max(0, speed - 1);
  if (keys.space) speed = Math.max(0, speed - 3); // El freni
  if (keys.a) car.rotation.y += 0.03;
  if (keys.d) car.rotation.y -= 0.03;

  // Araba konumu
  if (car) {
    car.translateZ(speed / 100); // İleri hareket sağlıyoruz
    document.getElementById("speedometer").textContent = `Hız: ${Math.floor(speed)} km/h`;
  }

  renderer.render(scene, camera);
}

animate();
