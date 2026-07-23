// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 1. INITIALIZE LENIS SMOOTH MOMENTUM SCROLL
// ==========================================
const lenis = new Lenis({
    duration: 1.6,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    smoothTouch: false
});

lenis.on('scroll', ScrollTrigger.update);

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);


// ==========================================
// 2. ADVANCED 3D CYLINDER CARD TRANSFORM
// ==========================================
const cards = document.querySelectorAll('.card');

cards.forEach((card, index) => {
    // Alternate initial paths to accentuate the circular, wrap-around feeling
    let sideDrift = 0;
    if (index % 2 === 0) sideDrift = -100; // Left curve entry
    if (index % 2 !== 0) sideDrift = 100;  // Right curve entry

    gsap.fromTo(card, 
        {
            rotationX: 35,                     // Tilts backward like the top edge of a barrel
            rotationY: index % 2 === 0 ? -20 : 20, // Angles inward toward center stage
            z: -250,                           // Pushes back deeply into the screen z-axis
            x: sideDrift,                      // Horizontal offset
            opacity: 0.2
        },
        {
            rotationX: -35,                    // Flips forward cleanly as it exits out the top
            rotationY: index % 2 === 0 ? 20 : -20,
            z: -150,
            x: sideDrift * -0.5,               // Swings across smoothly like an orbit track
            opacity: 1,
            scrollTrigger: {
                trigger: card,
                start: "top bottom-=5%",      // Activates the instant it breaches viewport bounds
                end: "bottom top+=5%",
                scrub: 1,                      // Hard ties the rotational vectors to the scrollbar position
            }
        }
    );
});


// ==========================================
// 3. THREE.JS 3D QUANTUM CORE BACKGROUND
// ==========================================
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('webgl-canvas'), alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const createQuantumCore = (particleCount, radius, colorHex, size) => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);

        positions[i] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i+1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i+2] = radius * Math.cos(phi);

        originalPositions[i] = positions[i];
        originalPositions[i+1] = positions[i+1];
        originalPositions[i+2] = positions[i+2];
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const material = new THREE.PointsMaterial({
        size: size,
        color: colorHex,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    return {
        mesh: new THREE.Points(geometry, material),
        original: originalPositions
    };
};

const core1 = createQuantumCore(3500, 2.2, 0x00E5FF, 0.02);
const core2 = createQuantumCore(2000, 2.2, 0xffffff, 0.015);
scene.add(core1.mesh);
scene.add(core2.mesh);

camera.position.z = 5;

let mouse = new THREE.Vector2(0, 0);
let targetMouse = new THREE.Vector2(0, 0);
let currentScrollProgress = 0;

window.addEventListener('mousemove', (event) => {
    targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    targetMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

const clock = new THREE.Clock();

const animate = () => {
    requestAnimationFrame(animate);
    const time = clock.getElapsedTime();

    mouse.x += (targetMouse.x - mouse.x) * 0.08;
    mouse.y += (targetMouse.y - mouse.y) * 0.08;

    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollTarget = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    currentScrollProgress += (scrollTarget - currentScrollProgress) * 0.08;

    // Fluid background grid/camera tracking loops
    if(currentScrollProgress <= 0.33) {
        const factor = currentScrollProgress / 0.33;
        camera.position.x = factor * 1.6; 
        camera.position.y = 0;
        core1.mesh.scale.set(1 - factor * 0.25, 1 - factor * 0.25, 1 - factor * 0.25);
    } else if (currentScrollProgress > 0.33 && currentScrollProgress <= 0.66) {
        const factor = (currentScrollProgress - 0.33) / 0.33;
        camera.position.x = 1.6 - (factor * 3.2);
        camera.position.y = factor * -0.5;
    } else {
        const factor = (currentScrollProgress - 0.66) / 0.34;
        camera.position.x = -1.6 + (factor * 1.6);
        camera.position.y = -0.5 + (factor * 0.5);
        const boomScale = 0.75 + (factor * 0.75);
        core1.mesh.scale.set(boomScale, boomScale, boomScale);
    }
    core2.mesh.scale.copy(core1.mesh.scale);

    core1.mesh.rotation.y = time * 0.04 + (currentScrollProgress * 2.0);
    core2.mesh.rotation.y = -time * 0.02 - (currentScrollProgress * 1.2);
    core1.mesh.rotation.x = time * 0.01 + (mouse.y * 0.2);

    const morphCore = (core) => {
        const positions = core.mesh.geometry.attributes.position.array;
        const originals = core.original;

        for (let i = 0; i < positions.length; i += 3) {
            const x = originals[i];
            const y = originals[i+1];
            const z = originals[i+2];

            const turbulence = 0.12 + (currentScrollProgress * 0.3);
            const wave = Math.sin(x * 2.5 + time) * Math.cos(y * 2.5 + time) * turbulence;
            const mouseDistortion = Math.sin(z + mouse.x * 2) * mouse.y * 0.15;

            positions[i] = x + (x * wave) + (x * mouseDistortion);
            positions[i+1] = y + (y * wave) + (y * mouseDistortion);
            positions[i+2] = z + (z * wave) + (z * mouseDistortion);
        }
        core.mesh.geometry.attributes.position.needsUpdate = true;
    };

    morphCore(core1);
    morphCore(core2);

    renderer.render(scene, camera);
};

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});