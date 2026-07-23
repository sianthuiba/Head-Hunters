const canvas = document.getElementById("webgl-bg");

if(canvas){

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);

const renderer = new THREE.WebGLRenderer({
canvas:canvas,
alpha:true
});

renderer.setSize(
window.innerWidth,
window.innerHeight
);

const geometry =
new THREE.BufferGeometry();

const particleCount = 4000;

const positions =
new Float32Array(
particleCount * 3
);

for(let i=0;i<particleCount*3;i++){

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
size:0.05
});

const stars =
new THREE.Points(
geometry,
material
);

scene.add(stars);

camera.position.z = 25;

function animate(){

requestAnimationFrame(
animate
);

stars.rotation.y += 0.0003;

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
window.innerWidth/
window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(
window.innerWidth,
window.innerHeight
);

}
);

}