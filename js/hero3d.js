import { clamp, prefersReducedMotion } from './utils.js';

export const initHero3D = async () => {
  const canvas = document.querySelector('#hero-canvas');
  if (!canvas || prefersReducedMotion()) return null;

  const [{ default: THREE }, { EffectComposer }, { RenderPass }, { UnrealBloomPass }] = await Promise.all([
    import('https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js'),
    import('https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/postprocessing/EffectComposer.js'),
    import('https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/postprocessing/RenderPass.js'),
    import('https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/postprocessing/UnrealBloomPass.js'),
  ]);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  camera.position.set(0, 0, 5.4);

  const geometry = new THREE.IcosahedronGeometry(1.32, 2);
  const material = new THREE.MeshPhysicalMaterial({
    color: 0xbfc8ff,
    roughness: 0.06,
    metalness: 0.32,
    transmission: 1,
    thickness: 1.2,
    transparent: true,
    opacity: 0.96,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    envMapIntensity: 1.8,
  });
  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  const shell = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.56, 1),
    new THREE.MeshStandardMaterial({
      color: 0x0d1226,
      roughness: 0.22,
      metalness: 1,
      transparent: true,
      opacity: 0.2,
    }),
  );
  scene.add(shell);

  const ambient = new THREE.AmbientLight(0x7b8cff, 1.4);
  const directional = new THREE.DirectionalLight(0x8b5cf6, 2.4);
  directional.position.set(2, 3, 4);
  const point = new THREE.PointLight(0x00f5ff, 12, 16);
  point.position.set(-2.4, 1.8, 3.4);
  const pink = new THREE.PointLight(0xff4ecd, 8, 14);
  pink.position.set(2.8, -1.5, 2.2);

  scene.add(ambient, directional, point, pink);

  const particlesGeometry = new THREE.BufferGeometry();
  const particleCount = 600;
  const positions = new Float32Array(particleCount * 3);
  for (let index = 0; index < particleCount; index += 1) {
    const i3 = index * 3;
    positions[i3] = (Math.random() - 0.5) * 18;
    positions[i3 + 1] = (Math.random() - 0.5) * 18;
    positions[i3 + 2] = (Math.random() - 0.5) * 18;
  }
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particlesMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.016,
    transparent: true,
    opacity: 0.65,
    depthWrite: false,
  });
  const stars = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(stars);

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(
    new THREE.Vector2(canvas.clientWidth, canvas.clientHeight),
    0.9,
    0.5,
    0.12,
  );
  composer.addPass(bloom);

  const pointer = { x: 0, y: 0 };
  const targetRotation = { x: 0, y: 0 };

  const handlePointer = (event) => {
    const normalizedX = (event.clientX / window.innerWidth) * 2 - 1;
    const normalizedY = (event.clientY / window.innerHeight) * 2 - 1;
    targetRotation.x = clamp(-normalizedY * 0.35, -0.35, 0.35);
    targetRotation.y = clamp(normalizedX * 0.45, -0.45, 0.45);
    pointer.x = normalizedX;
    pointer.y = normalizedY;
  };

  window.addEventListener('pointermove', handlePointer, { passive: true });

  const resize = () => {
    const { clientWidth, clientHeight } = canvas;
    renderer.setSize(clientWidth, clientHeight, false);
    composer.setSize(clientWidth, clientHeight);
    camera.aspect = clientWidth / clientHeight;
    camera.updateProjectionMatrix();
  };

  window.addEventListener('resize', resize);

  const clock = new THREE.Clock();

  const animate = () => {
    const elapsed = clock.getElapsedTime();
    sphere.rotation.x = elapsed * 0.18 + targetRotation.x;
    sphere.rotation.y = elapsed * 0.28 + targetRotation.y;
    shell.rotation.x = -elapsed * 0.12;
    shell.rotation.y = elapsed * 0.16;
    sphere.position.y = Math.sin(elapsed * 0.9) * 0.18;
    shell.position.y = Math.sin(elapsed * 0.9 + 1) * 0.18;
    point.position.x = pointer.x * 2.2;
    point.position.y = -pointer.y * 1.5;
    stars.rotation.y = elapsed * 0.02;
    composer.render();
    requestAnimationFrame(animate);
  };

  animate();

  return { renderer, scene, camera };
};
