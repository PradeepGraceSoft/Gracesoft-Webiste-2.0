import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Decorative, original architecture. Product content stays in server-rendered HTML.
gsap.registerPlugin(ScrollTrigger);

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const compactScreen = window.matchMedia('(max-width: 767px)');
const finePointer = window.matchMedia('(pointer: fine)');

function makeScene(host) {
  if (host.dataset.initialized) return;
  host.dataset.initialized = 'true';
  const stage = host.closest('.hero-stage') || host;
  const pauseButton = stage.querySelector('[data-scene-pause]');
  const disposables = new Set();
  const listeners = [];
  let renderer;
  let disposed = false;
  let frame = 0;
  let lastFrame = 0;
  let elapsed = 0;
  let visible = true;
  let userPaused = false;
  let contextLost = false;
  let scrollAnimation;
  const compact = compactScreen.matches;

  function listen(target, name, handler, options) {
    target.addEventListener(name, handler, options);
    listeners.push(() => target.removeEventListener(name, handler, options));
  }
  function own(resource) {
    disposables.add(resource);
    return resource;
  }
  function fallback() {
    host.dataset.state = 'fallback';
    stage.classList.remove('scene-ready');
    if (pauseButton) pauseButton.hidden = true;
  }

  try {
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !compact,
      powerPreference: 'low-power',
      failIfMajorPerformanceCaveat: false,
    });
  } catch {
    fallback();
    return;
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, compact ? 1.25 : 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.18;
  renderer.setClearColor(0x061a25, 0);
  renderer.domElement.setAttribute('aria-hidden', 'true');
  renderer.domElement.setAttribute('role', 'presentation');
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%;pointer-events:none;';
  host.append(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-6, 6, 5, -5, 0.1, 100);
  camera.position.set(10, 8, 12);
  camera.lookAt(0, 1.1, 0);
  const world = new THREE.Group();
  scene.add(world);
  const architecture = new THREE.Group();
  world.add(architecture);

  scene.add(new THREE.HemisphereLight(0xc9f2ff, 0x172a36, 2.65));
  const sun = new THREE.DirectionalLight(0xffe3b3, 3.7);
  sun.position.set(-5, 9, 6);
  scene.add(sun);
  const rim = new THREE.DirectionalLight(0x24cfc7, 2.4);
  rim.position.set(6, 4, -6);
  scene.add(rim);

  const material = (color, roughness = 0.65, metalness = 0.05, extras = {}) => own(new THREE.MeshStandardMaterial({ color, roughness, metalness, ...extras }));
  const palette = {
    limestone: material(0xe4e4d9, 0.78),
    edge: material(0xfaf6e9, 0.5),
    slate: material(0x16323d, 0.72),
    glass: material(0x164e5b, 0.16, 0.52, { emissive: 0x103542, emissiveIntensity: 0.35 }),
    darkGlass: material(0x183e4b, 0.22, 0.45),
    litGlass: material(0xc7aa72, 0.24, 0.2, { emissive: 0xe5b56b, emissiveIntensity: 0.32 }),
    railing: material(0x25424a, 0.42, 0.7),
    balconyGlass: material(0x7dbcc0, 0.18, 0.3, { transparent: true, opacity: 0.34, depthWrite: false }),
    brass: material(0xb38b55, 0.35, 0.65),
    deck: material(0xab9c7c, 0.8),
    path: material(0xe0ddcb, 0.8),
    ground: material(0x47665a, 0.95),
    leaves: material(0x347965, 0.9),
    lightLeaves: material(0x6e9d79, 0.9),
    trunk: material(0x65503a, 0.88),
    water: material(0x2acbc5, 0.19, 0.25, { emissive: 0x0e8f9b, emissiveIntensity: 0.28 }),
    cyan: own(new THREE.MeshBasicMaterial({ color: 0x61e6d0 })),
    poolRipple: own(new THREE.MeshBasicMaterial({ color: 0xb4fff1, transparent: true, opacity: 0.34 })),
  };
  const unitBox = own(new THREE.BoxGeometry(1, 1, 1));
  const sphere = own(new THREE.IcosahedronGeometry(1, compact ? 0 : 1));
  const trunkGeometry = own(new THREE.CylinderGeometry(0.045, 0.07, 1, 7));
  const nodeGeometry = own(new THREE.SphereGeometry(0.048, 8, 6));

  function box(x, y, z, width, height, depth, mat, group = architecture) {
    const object = new THREE.Mesh(unitBox, mat);
    object.position.set(x, y, z);
    object.scale.set(width, height, depth);
    group.add(object);
    return object;
  }

  function roundedSlab(width, depth, height, radius, mat, x, y, z) {
    const shape = new THREE.Shape();
    const left = -width / 2;
    const bottom = -depth / 2;
    shape.moveTo(left + radius, bottom);
    shape.lineTo(left + width - radius, bottom);
    shape.quadraticCurveTo(left + width, bottom, left + width, bottom + radius);
    shape.lineTo(left + width, bottom + depth - radius);
    shape.quadraticCurveTo(left + width, bottom + depth, left + width - radius, bottom + depth);
    shape.lineTo(left + radius, bottom + depth);
    shape.quadraticCurveTo(left, bottom + depth, left, bottom + depth - radius);
    shape.lineTo(left, bottom + radius);
    shape.quadraticCurveTo(left, bottom, left + radius, bottom);
    const geometry = own(new THREE.ExtrudeGeometry(shape, {
      depth: height,
      bevelEnabled: true,
      bevelSegments: 1,
      bevelSize: 0.025,
      bevelThickness: 0.025,
      steps: 1,
      curveSegments: compact ? 3 : 6,
    }));
    geometry.rotateX(-Math.PI / 2);
    const object = new THREE.Mesh(geometry, mat);
    object.position.set(x, y, z);
    architecture.add(object);
    return object;
  }

  // Three floating plinths give the resort a precise architectural-model silhouette.
  roundedSlab(8.35, 6.45, 0.18, 0.38, palette.slate, 0, -0.55, 0);
  roundedSlab(8.05, 6.15, 0.075, 0.32, palette.cyan, 0, -0.34, 0);
  roundedSlab(8.05, 6.15, 0.22, 0.32, palette.limestone, 0, -0.25, 0);
  roundedSlab(7.75, 5.85, 0.04, 0.3, palette.ground, 0, 0, 0);
  box(0, 0.075, 0.5, 7.35, 0.07, 4.5, palette.path);
  box(-1.3, 0.12, 1.55, 4.65, 0.05, 2.15, palette.deck);

  // Main wing and the shorter return wing share level heights and facade details.
  const buildings = [
    { x: -0.73, z: -0.95, w: 4.7, d: 2.15, levels: 3, rooms: 6 },
    { x: 2.05, z: 0.18, w: 1.8, d: 3.45, levels: 2, rooms: 2 },
  ];
  for (const wing of buildings) {
    box(wing.x, 0.58, wing.z, wing.w - 0.14, 0.94, wing.d - 0.14, palette.darkGlass);
    for (let n = 0; n <= wing.rooms; n++) {
      const x = wing.x - wing.w / 2 + n * wing.w / wing.rooms;
      box(x, 0.6, wing.z + wing.d / 2, 0.065, 1.02, 0.09, palette.brass);
    }
    for (let level = 0; level <= wing.levels; level++) {
      const floor = 1.1 + level * 0.89;
      roundedSlab(wing.w + 0.24, wing.d + 0.44, 0.115, 0.07, palette.edge, wing.x, floor, wing.z + 0.07);
      if (level === wing.levels) continue;
      const roomWidth = wing.w / wing.rooms;
      box(wing.x, floor + 0.46, wing.z, wing.w - 0.14, 0.76, wing.d - 0.08, palette.glass);
      for (let room = 0; room < wing.rooms; room++) {
        const cx = wing.x - wing.w / 2 + roomWidth * (room + 0.5);
        // Separate bays and warm interior planes add depth without transparent sorting.
        const windowMat = (room + level * 2) % 4 === 0 ? palette.litGlass : palette.glass;
        box(cx, floor + 0.47, wing.z + wing.d / 2 - 0.012, roomWidth - 0.1, 0.63, 0.025, windowMat);
        box(cx - roomWidth / 2 + 0.035, floor + 0.46, wing.z + wing.d / 2 + 0.05, 0.07, 0.8, 0.15, palette.limestone);
        box(cx, floor + 0.45, wing.z + wing.d / 2 + 0.02, 0.025, 0.68, 0.035, palette.railing);
        box(cx, floor + 0.27, wing.z + wing.d / 2 + 0.22, roomWidth - 0.04, 0.3, 0.025, palette.balconyGlass);
        box(cx, floor + 0.43, wing.z + wing.d / 2 + 0.22, roomWidth, 0.025, 0.035, palette.railing);
        box(cx - roomWidth / 2 + 0.02, floor + 0.28, wing.z + wing.d / 2 + 0.22, 0.02, 0.31, 0.025, palette.railing);
      }
      // Side windows remain modeled when the viewing angle changes.
      const sideCount = Math.max(2, Math.floor(wing.d / 0.62));
      for (let n = 0; n < sideCount; n++) {
        const z = wing.z - wing.d / 2 + (n + 0.5) * wing.d / sideCount;
        box(wing.x + wing.w / 2 - 0.01, floor + 0.47, z, 0.03, 0.62, wing.d / sideCount - 0.12, n % 3 === level % 3 ? palette.litGlass : palette.glass);
        box(wing.x + wing.w / 2 + 0.04, floor + 0.45, z - wing.d / sideCount / 2, 0.12, 0.8, 0.06, palette.limestone);
      }
    }
    // Set-back rooftop volumes leave a useful roof terrace around the edge.
    const roofY = 1.24 + wing.levels * 0.89;
    box(wing.x + 0.25, roofY + 0.19, wing.z - 0.26, wing.w * 0.48, 0.38, wing.d * 0.6, palette.slate);
    box(wing.x + 0.25, roofY + 0.4, wing.z - 0.26, wing.w * 0.5, 0.06, wing.d * 0.63, palette.edge);
  }

  // Porte-cochere, entry path and lobby lighting.
  box(0.2, 0.16, 0.9, 1.45, 0.08, 1.06, palette.edge);
  box(0.2, 1.08, 0.85, 1.65, 0.09, 1.2, palette.limestone);
  for (const x of [-0.52, 0.92]) box(x, 0.62, 1.35, 0.045, 0.92, 0.045, palette.brass);
  box(0.2, 0.59, 0.16, 0.5, 0.79, 0.045, palette.litGlass);
  box(0.2, 0.6, 0.2, 0.025, 0.8, 0.045, palette.brass);
  for (let i = 0; i < 5; i++) box(0.25, 0.12, 1.65 + i * 0.22, 0.85, 0.025, 0.15, palette.edge);

  // Pool cut into a light stone surround, with understated water highlights.
  roundedSlab(2.8, 1.45, 0.1, 0.16, palette.edge, -1.78, 0.13, 1.62);
  roundedSlab(2.53, 1.19, 0.024, 0.13, palette.water, -1.78, 0.235, 1.62);
  for (let i = 0; i < 5; i++) {
    const ripple = box(-2.5 + i * 0.34, 0.268, 1.55 + Math.sin(i) * 0.19, 0.42, 0.008, 0.012, palette.poolRipple);
    ripple.rotation.y = -0.18;
  }
  const lounge = (x, z, rotation = 0) => {
    const group = new THREE.Group();
    group.position.set(x, 0.2, z);
    group.rotation.y = rotation;
    architecture.add(group);
    box(0, 0.07, 0, 0.28, 0.06, 0.65, palette.edge, group);
    const back = box(0, 0.16, -0.26, 0.28, 0.035, 0.28, palette.edge, group);
    back.rotation.x = -0.5;
    box(0, 0.005, -0.18, 0.23, 0.11, 0.035, palette.brass, group);
    box(0, 0.005, 0.22, 0.23, 0.11, 0.035, palette.brass, group);
  };
  for (let i = 0; i < 3; i++) lounge(-2.6 + i * 0.57, 2.65);

  // A slender rooftop pergola creates a distinctive, readable hotel silhouette.
  for (const x of [-2.66, -1.48]) {
    for (const z of [-1.6, -0.45]) box(x, 4.11, z, 0.045, 0.48, 0.045, palette.brass);
  }
  for (let i = 0; i < 8; i++) box(-2.7 + i * 0.18, 4.36, -1.02, 0.07, 0.065, 1.4, palette.deck);
  box(-2.1, 3.96, -0.4, 1.1, 0.12, 0.12, palette.leaves);

  function tree(x, z, height, leafy = true) {
    const trunk = new THREE.Mesh(trunkGeometry, palette.trunk);
    trunk.position.set(x, height * 0.35, z);
    trunk.scale.y = height * 0.68;
    architecture.add(trunk);
    const crown = new THREE.Mesh(sphere, leafy ? palette.leaves : palette.lightLeaves);
    crown.position.set(x, height * 0.75, z);
    crown.scale.set(height * 0.29, height * 0.4, height * 0.28);
    architecture.add(crown);
    const under = new THREE.Mesh(sphere, palette.lightLeaves);
    under.position.set(x + height * 0.1, height * 0.57, z + 0.02);
    under.scale.set(height * 0.23, height * 0.28, height * 0.23);
    architecture.add(under);
  }
  [[-3.48, -2.18, 1.45], [-3.5, -0.95, 1.14], [3.47, -2.2, 1.48], [3.47, 1.8, 1.2], [2.9, 2.6, 0.95], [-3.5, 2.4, 0.8]].forEach(([x, z, h], i) => tree(x, z, h, i % 2 === 0));
  for (let i = 0; i < 8; i++) {
    const shrub = new THREE.Mesh(sphere, i % 2 ? palette.leaves : palette.lightLeaves);
    shrub.position.set(-2.9 + i * 0.62, 0.23, -2.57);
    shrub.scale.set(0.28, 0.22, 0.25);
    architecture.add(shrub);
  }
  for (const x of [-3.58, 3.58]) {
    for (const z of [-1.6, 0.4, 2.25]) {
      box(x, 0.24, z, 0.065, 0.4, 0.065, palette.slate);
      box(x, 0.46, z, 0.09, 0.055, 0.09, palette.litGlass);
    }
  }

  // Batch repeated facade, balcony, furniture and landscape geometry into GPU
  // instances. The architecture retains depth without hundreds of draw calls.
  architecture.updateMatrixWorld(true);
  const batches = new Map();
  architecture.traverse(object => {
    if (!object.isMesh) return;
    const key = `${object.geometry.uuid}:${object.material.uuid}`;
    if (!batches.has(key)) batches.set(key, []);
    batches.get(key).push(object);
  });
  const inverseArchitecture = new THREE.Matrix4().copy(architecture.matrixWorld).invert();
  for (const meshes of batches.values()) {
    if (meshes.length < 3) continue;
    const instances = own(new THREE.InstancedMesh(meshes[0].geometry, meshes[0].material, meshes.length));
    meshes.forEach((mesh, index) => {
      instances.setMatrixAt(index, new THREE.Matrix4().multiplyMatrices(inverseArchitecture, mesh.matrixWorld));
      mesh.removeFromParent();
    });
    instances.instanceMatrix.needsUpdate = true;
    instances.computeBoundingSphere();
    architecture.add(instances);
  }

  const orbitGroup = new THREE.Group();
  world.add(orbitGroup);
  const orbits = [];
  for (let i = 0; i < (compact ? 1 : 2); i++) {
    const vertices = [];
    for (let n = 0; n <= 120; n++) {
      const angle = n / 120 * Math.PI * 2;
      vertices.push(new THREE.Vector3(Math.cos(angle) * (5.05 + i * 0.22), 0.95 + i * 0.7 + Math.sin(angle + i) * 0.48, Math.sin(angle) * (3.75 + i * 0.2)));
    }
    const geometry = own(new THREE.BufferGeometry().setFromPoints(vertices));
    const lineMaterial = own(new THREE.LineBasicMaterial({ color: i ? 0x73b9d0 : 0x49cdb8, transparent: true, opacity: i ? 0.13 : 0.3 }));
    const line = new THREE.LineLoop(geometry, lineMaterial);
    orbitGroup.add(line);
    const pulse = new THREE.Mesh(nodeGeometry, palette.cyan);
    orbitGroup.add(pulse);
    orbits.push({ pulse, offset: i * 2.1, index: i });
  }

  // Sparse fixed stars provide scale. They never substitute for the 3D architecture.
  const particleGeometry = own(new THREE.BufferGeometry());
  const particleCount = compact ? 12 : 30;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    const seed = Math.sin(i * 127.1 + 21.4) * 43758.5453;
    const value = seed - Math.floor(seed);
    const angle = i * 2.399963;
    positions[i * 3] = Math.cos(angle) * (4.3 + value * 1.3);
    positions[i * 3 + 1] = -0.2 + value * 4.6;
    positions[i * 3 + 2] = Math.sin(angle) * (3.4 + value);
  }
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particleMaterial = own(new THREE.PointsMaterial({ color: 0x8de1dc, size: 0.026, transparent: true, opacity: 0.52, sizeAttenuation: true }));
  const particles = new THREE.Points(particleGeometry, particleMaterial);
  world.add(particles);

  const pointer = { x: 0, y: 0 };
  const scroll = { progress: 0 };
  const motionAllowed = () => !reducedMotion.matches && !compactScreen.matches && !userPaused;
  const canRun = () => !disposed && !contextLost && visible && !document.hidden && motionAllowed();

  function updateControls() {
    if (!pauseButton) return;
    const still = reducedMotion.matches || compactScreen.matches;
    pauseButton.hidden = still || contextLost;
    pauseButton.setAttribute('aria-pressed', String(userPaused));
    pauseButton.textContent = userPaused ? (pauseButton.dataset.resumeLabel || 'Resume animation') : (pauseButton.dataset.pauseLabel || 'Pause animation');
    stage.dataset.motion = still || userPaused ? 'paused' : 'playing';
  }

  function renderStill() {
    if (disposed || contextLost) return;
    renderer.render(scene, camera);
  }

  function animate(timestamp) {
    frame = 0;
    if (!canRun()) return;
    if (timestamp - lastFrame >= 1000 / 30) {
      const delta = Math.min((timestamp - lastFrame) / 1000, 0.07);
      lastFrame = timestamp;
      elapsed += delta;
      world.rotation.y = Math.sin(elapsed * 0.14) * 0.045 + pointer.x * 0.07 + scroll.progress * 0.12;
      world.rotation.x = pointer.y * 0.025 - scroll.progress * 0.025;
      world.position.y = Math.sin(elapsed * 0.7) * 0.035;
      for (const orbit of orbits) {
        const angle = elapsed * 0.23 + orbit.offset;
        const i = orbit.index;
        orbit.pulse.position.set(Math.cos(angle) * (5.05 + i * 0.22), 0.95 + i * 0.7 + Math.sin(angle + i) * 0.48, Math.sin(angle) * (3.75 + i * 0.2));
      }
      renderStill();
    }
    frame = requestAnimationFrame(animate);
  }

  function schedule() {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    lastFrame = performance.now();
    updateControls();
    if (canRun()) frame = requestAnimationFrame(animate);
    else renderStill();
  }

  function resize() {
    if (disposed || contextLost) return;
    const width = Math.max(1, host.clientWidth);
    const height = Math.max(1, host.clientHeight || width * 0.85);
    const aspect = width / height;
    const halfHeight = Math.max(4.45, 5.55 / aspect);
    camera.left = -halfHeight * aspect;
    camera.right = halfHeight * aspect;
    camera.top = halfHeight;
    camera.bottom = -halfHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    renderStill();
  }

  function configureScroll() {
    scrollAnimation?.scrollTrigger?.kill();
    scrollAnimation?.kill();
    scrollAnimation = undefined;
    if (!reducedMotion.matches && !compactScreen.matches) {
      scrollAnimation = gsap.to(scroll, {
        progress: 1,
        ease: 'none',
        scrollTrigger: { trigger: stage, start: 'top top', end: 'bottom top', scrub: true },
      });
    } else {
      world.rotation.set(0, 0, 0);
      world.position.y = 0;
      scroll.progress = 0;
    }
  }

  listen(stage, 'pointermove', (event) => {
    if (!finePointer.matches || !motionAllowed()) return;
    const bounds = stage.getBoundingClientRect();
    pointer.x = (event.clientX - bounds.left) / bounds.width - 0.5;
    pointer.y = (event.clientY - bounds.top) / bounds.height - 0.5;
  }, { passive: true });
  listen(stage, 'pointerleave', () => { pointer.x = 0; pointer.y = 0; });
  if (pauseButton) listen(pauseButton, 'click', () => { userPaused = !userPaused; schedule(); });
  listen(document, 'visibilitychange', schedule);
  const preferenceChanged = () => { configureScroll(); resize(); schedule(); };
  listen(reducedMotion, 'change', preferenceChanged);
  listen(compactScreen, 'change', preferenceChanged);

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);
  const intersectionObserver = new IntersectionObserver((entries) => {
    visible = entries[0].isIntersecting;
    schedule();
  }, { threshold: 0.05 });
  intersectionObserver.observe(host);

  listen(renderer.domElement, 'webglcontextlost', (event) => {
    event.preventDefault();
    contextLost = true;
    cancelAnimationFrame(frame);
    frame = 0;
    fallback();
  });
  listen(renderer.domElement, 'webglcontextrestored', () => {
    contextLost = false;
    host.dataset.state = 'ready';
    stage.classList.add('scene-ready');
    resize();
    schedule();
  });

  function dispose() {
    if (disposed) return;
    disposed = true;
    cancelAnimationFrame(frame);
    resizeObserver.disconnect();
    intersectionObserver.disconnect();
    listeners.forEach(remove => remove());
    scrollAnimation?.scrollTrigger?.kill();
    scrollAnimation?.kill();
    disposables.forEach(resource => resource.dispose());
    renderer.dispose();
    renderer.domElement.remove();
  }
  listen(window, 'pagehide', (event) => {
    if (!event.persisted) dispose();
    else { cancelAnimationFrame(frame); frame = 0; }
  });
  listen(window, 'pageshow', (event) => { if (event.persisted) schedule(); });

  // Populate node positions before the first still frame as well as animation.
  orbits.forEach(({ pulse, index: i, offset }) => pulse.position.set(Math.cos(offset) * (5.05 + i * 0.22), 0.95 + i * 0.7 + Math.sin(offset + i) * 0.48, Math.sin(offset) * (3.75 + i * 0.2)));
  configureScroll();
  resize();
  host.dataset.state = 'ready';
  stage.classList.add('scene-ready');
  schedule();
}

document.querySelectorAll('[data-hotel-scene]').forEach(makeScene);
