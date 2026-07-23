// ===============================
// LENIS SMOOTH SCROLL
// ===============================

const lenis = new Lenis({
    duration: 1.4,
    smoothWheel: true,
    smoothTouch: false
});

function raf(time){
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// ===============================
// THREE JS PARTICLE BACKGROUND
// ===============================

const canvas = document.getElementById("webgl-bg");

if(canvas){

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio,2)
    );

    const geometry =
        new THREE.BufferGeometry();

    const particlesCount = 5000;

    const positions =
        new Float32Array(
            particlesCount * 3
        );

    for(let i=0;i<particlesCount*3;i++){

        positions[i] =
            (Math.random()-0.5)*50;

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

    scene.add(particles);

    camera.position.z = 15;

    function animate(){

        requestAnimationFrame(
            animate
        );

        particles.rotation.x += 0.0005;
        particles.rotation.y += 0.001;

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