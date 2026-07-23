// =======================
// LENIS
// =======================

const lenis = new Lenis({
duration:1.4,
smoothWheel:true
});

function raf(time){
lenis.raf(time);
requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// =======================
// PARTICLE BACKGROUND
// =======================

const canvas =
document.getElementById("webgl-canvas")

if(canvas){

const scene =
new THREE.Scene();

const camera =
new THREE.PerspectiveCamera(
75,
window.innerWidth /
window.innerHeight,
0.1,
1000
);

const renderer =
new THREE.WebGLRenderer({
canvas:canvas,
alpha:true,
antialias:true
});

renderer.setSize(
window.innerWidth,
window.innerHeight
);

const geometry =
new THREE.BufferGeometry();

const particleCount = 6000;

const positions =
new Float32Array(
particleCount * 3
);

for(
let i=0;
i<particleCount*3;
i++
){

positions[i] =
(Math.random()-0.5)*80;

}

geometry.setAttribute(
"position",
new THREE.BufferAttribute(
positions,
3
)
);

const material =
new THREE.PointsMaterial({
color:0x00e5ff,
size:0.05,
transparent:true,
opacity:0.8
});

const particles =
new THREE.Points(
geometry,
material
);

scene.add(
particles
);

camera.position.z = 25;

function animate(){

requestAnimationFrame(
animate
);

particles.rotation.y += 0.0005;
particles.rotation.x += 0.0002;

renderer.render(
scene,
camera
);

}

animate();

window.addEventListener(
"resize",
()=>{

camera.aspect =
window.innerWidth /
window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(
window.innerWidth,
window.innerHeight
);

}
);

}

// =======================
// GSAP ENTRANCE EFFECTS
// =======================

gsap.from(
".industry-card",
{
opacity:0,
y:50,
duration:1,
stagger:0.05
}
);

gsap.from(
".hero h1",
{
opacity:0,
y:100,
duration:1.5
}
);

gsap.from(
".search-section",
{
opacity:0,
y:50,
duration:1.2
}
);