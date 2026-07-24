function filterCompanies(){

const search =
document.getElementById("searchInput")
.value.toLowerCase();

const type =
document.getElementById("typeFilter")
.value;

document.querySelectorAll(".card")
.forEach(card=>{

const text =
card.innerText.toLowerCase();

const category =
card.dataset.type;

const matchesSearch =
text.includes(search);

const matchesType =
type==="all" || category===type;

card.style.display =
(matchesSearch && matchesType)
? "block"
: "none";

});

}
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".card").forEach((card,index)=>{

gsap.from(card,{

opacity:0,

rotationX:30,

rotationY:
index%2===0
? -20
: 20,

y:150,

duration:1.5,

scrollTrigger:{
trigger:card,
start:"top 85%",
toggleActions:
"play none none reverse"
}

});

});
const scene = new THREE.Scene();

const camera =
new THREE.PerspectiveCamera(
60,
window.innerWidth/window.innerHeight,
0.1,
1000
);

const renderer =
new THREE.WebGLRenderer({
canvas:
document.getElementById("webgl-canvas"),
alpha:true
});

renderer.setSize(
window.innerWidth,
window.innerHeight
);

camera.position.z = 5;

const geometry =
new THREE.BufferGeometry();

const count = 3000;

const positions =
new Float32Array(count * 3);

for(let i=0;i<count*3;i++){

positions[i] =
(Math.random()-0.5)*8;

}

geometry.setAttribute(
'position',
new THREE.BufferAttribute(
positions,
3
)
);

const material =
new THREE.PointsMaterial({
size:0.02,
color:0x00E5FF,
transparent:true,
opacity:0.7
});

const particles =
new THREE.Points(
geometry,
material
);

scene.add(particles);

function animate(){

requestAnimationFrame(animate);

particles.rotation.y += 0.0004;
particles.rotation.x += 0.0002;

renderer.render(scene,camera);

}

animate();