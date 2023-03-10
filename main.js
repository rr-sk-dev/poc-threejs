import gsap from 'gsap';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './style.css';

// Scene
const scene = new THREE.Scene();

// Create a sphere
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff83, roughness: 0.5 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Light
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 10, 10); // x, y, z
light.intensity = 1.25;
scene.add(light);

// Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 20;
scene.add(camera);

// Renderer
const canvas = document.getElementById('webgl');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.render(scene, camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;

// Resize
window.addEventListener('resize', () => {
  // Update Sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update Camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update Renderer Size
  renderer.setSize(sizes.width, sizes.height);
});

const loop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};

loop();

// Timeline magic
const tl = gsap.timeline({
  defaults: {
    duration: 1,
  },
});

tl.fromTo(mesh.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });
tl.fromTo('nav', { y: '-100%' }, { y: '0%' });
tl.fromTo('.title', { opacity: 0 }, { opacity: 1 });

// Mouse Animation Color
let mouseDown = false;
let rgb = []; // [red, green, blue]

window.addEventListener('mousedown', () => {
  mouseDown = true;
});

window.addEventListener('touchstart', () => {
  mouseDown = true;
});

window.addEventListener('mouseup', () => {
  mouseDown = false;
});

window.addEventListener('touchend', () => {
  mouseDown = false;
});

window.addEventListener('mousemove', (ev) => {
  if (mouseDown) {
    rgb = [
      Math.round((ev.pageX / sizes.width) * 255),
      Math.round((ev.pageY / sizes.height) * 255),
      150, // Math.floor(Math.random() * 255) + 1,
    ];

    // Let's Animate
    let newColor = new THREE.Color(`rgb(${rgb.join(',')})`);
    gsap.to(mesh.material.color, newColor);
    // gsap.to(mesh.material.color, { r: newColor.r, g: newColor.g, b: newColor.b });
  }
});

window.addEventListener('touchmove', (ev) => {
  if (mouseDown) {
    rgb = [
      Math.round((ev.pageX / sizes.width) * 255),
      Math.round((ev.pageY / sizes.height) * 255),
      150, // Math.floor(Math.random() * 255) + 1,
    ];

    // Let's Animate
    let newColor = new THREE.Color(`rgb(${rgb.join(',')})`);
    gsap.to(mesh.material.color, newColor);
    // gsap.to(mesh.material.color, { r: newColor.r, g: newColor.g, b: newColor.b });
  }
});
