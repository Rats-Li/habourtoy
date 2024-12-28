import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { gsap } from 'gsap'
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xffffff)




/**
 * Loading Manager
 */
const loadingBarElement = document.querySelector('.loading-bar')
const loadingManager = new THREE.LoadingManager(
    // Loaded
    () =>
    {
        // Wait a little
        window.setTimeout(() =>
        {
            // Animate overlay
            gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 3, value: 0, delay: 1 })

            // Update loadingBarElement
            loadingBarElement.classList.add('ended')
            loadingBarElement.style.transform = ''
        }, 500)
    },

    // Progress
    (itemUrl, itemsLoaded, itemsTotal) =>
    {
        // Calculate the progress and update the loadingBarElement
        const progressRatio = itemsLoaded / itemsTotal
        loadingBarElement.style.transform = `scaleX(${progressRatio})`

        
    }
)
const loader = new OBJLoader(loadingManager)

console.log(loadingManager)

// loader.setOnLoad(()=>{
//     console.log('All assets loaded')
// })

// loader.setOnProgress((url, loaded, total) => {
//     const progress = loaded / total;
//     console.log(`Loading ${url}: ${Math.round(progress * 100)}%`);
// });
//const cubeTextureLoader = new THREE.CubeTextureLoader(loadingManager)

/**
 * Overlay
 */
const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)
const overlayMaterial = new THREE.ShaderMaterial({
    // wireframe: true,
    transparent: true,
    uniforms:
    {
        uAlpha: { value: 1 }
    },
    vertexShader: `
        void main()
        {
            gl_Position = vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform float uAlpha;

        void main()
        {
            gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
            
        }
    `
})
const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)
scene.add(overlay)




/**
 * Models
 */
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/')

const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)


let mixer = null



// gltfLoader.load(
//     '/models/Fox/glTF/Fox.gltf',
//     (gltf) =>
//     {
//         gltf.scene.scale.set(0.025, 0.025, 0.025)
//         scene.add(gltf.scene)

//         // Animation
//         mixer = new THREE.AnimationMixer(gltf.scene)
//         const action = mixer.clipAction(gltf.animations[2])
//         action.play()
//     }
// )

const materialGL = new THREE.MeshStandardMaterial({
    metalness: 0.5,
    roughness: 0.5
})


//console.log(scene)

/**
 * Floor
 */
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({
        color: '#444444',
        metalness: 0,
        roughness: 0.5
    })
)
floor.receiveShadow = true
floor.rotation.x = - Math.PI * 0.5
//scene.add(floor)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(- 5, 5, 0)
//directionalLight.roation.set(0, -5, -3)
scene.add(directionalLight)

/**
 * Gui
 */



/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0, 2, 2)
//camera.rotation.z += Math.PI
camera.lookAt(0,0,0)
scene.add(camera)

//audio
// Create the button
const playButton = document.createElement('button');
playButton.innerHTML = 'DANCE OF SEA!<br>CLICK ME!'
playButton.style.color = '#ffffff'

// Set some styles for visibility and interaction
playButton.style.position = 'absolute';
playButton.style.top = '20%';
playButton.style.left = '50%'
playButton.style.transform= 'translate(-50%, -50%)'
playButton.style.padding = '10px';
playButton.style.backgroundColor = '#16982b';
playButton.style.fontFamily = 'Impact';
playButton.style.fontSize = '26px';
playButton.style.zIndex = '100';
playButton.style.border = 'none';
playButton.style.opacity = '1'
document.body.appendChild(playButton)

const wait3 = document.createElement('h1');
wait3.innerText = '3'
wait3.style.fontFamily = 'Impact'
wait3.style.color = '#16982b'
wait3.style.position = 'absolute'
wait3.style.top = '30%'
wait3.style.left = '50%'
wait3.style.transform= 'translate(-50%, -50%)'
wait3.style.fontSize = '50px'
wait3.style.zIndex = '100';

const wait2 = document.createElement('h1');
wait2.innerText = '2'
wait2.style.fontFamily = 'Impact'
wait2.style.color = '#16982b'
wait2.style.position = 'absolute'
wait2.style.top = '30%'
wait2.style.left = '50%'
wait2.style.transform= 'translate(-50%, -50%)'
wait2.style.fontSize = '50px'
wait2.style.zIndex = '101';

const wait1 = document.createElement('h1');
wait1.innerText = '1'
wait1.style.fontFamily = 'Impact'
wait1.style.color = '#16982b'
wait1.style.position = 'absolute'
wait1.style.top = '30%'
wait1.style.left = '50%'
wait1.style.transform= 'translate(-50%, -50%)'
wait1.style.fontSize = '50px'
wait1.style.zIndex = '102';

playButton.addEventListener('click',()=>{
    setTimeout(()=>{
        document.body.removeChild(playButton)
    },3000)
    document.body.appendChild(wait3)
})
playButton.addEventListener('click',()=>{
    setTimeout(()=>{
        document.body.removeChild(wait3)
        document.body.appendChild(wait2)},900)
    setTimeout(()=>{
        document.body.removeChild(wait2)
        document.body.appendChild(wait1)
    },1800)
    setTimeout(()=>{
        document.body.removeChild(wait1)
    },2700)
})


// Set up audio context and sound
const listener = new THREE.AudioListener();
const sound = new THREE.Audio(listener);
const audioLoader = new THREE.AudioLoader();

// Detect if AudioContext is suspended (e.g., in Chrome)
const audioContext = listener.context;
if (audioContext.state === 'suspended') {
    playButton.addEventListener('click', function() {
        audioContext.resume().then(() => {
            // Now, resume audio context and load the music
            audioLoader.load('/music/Gorillaz - On Melancholy Hill.mp3', function(buffer) {
                sound.setBuffer(buffer);
                sound.setLoop(true);
                sound.setVolume(0.5);
                sound.play();
            });
        });
    });
} else {
    playButton.addEventListener('click', function() {
        // Audio context is already active, no need to resume
        audioLoader.load('/music/Gorillaz - On Melancholy Hill.mp3', function(buffer) {
            
            sound.pause();
        });
    });
}

loader.load(
    '/models/gl/3D model.obj',
    function(obj){
        const material = new THREE.MeshStandardMaterial({
            color: 0x00ff00
        })
        // obj.traverse((child)=>{
        //     if (child.isMesh){
        //         child.material = material
        //     }
        // })
        scene.add(obj)
        gui.addColor(material,'color')
        gui.add(obj.position, 'x', -5,5,0.01)
        gui.add(obj.position, 'y', -5,5,0.01)
        gui.add(obj.position, 'z', -5,5,0.01)
        gui.add(obj.rotation, 'x', -Math.PI,Math.PI,0.01).name('Rx')
        gui.add(obj.rotation, 'y', -Math.PI,Math.PI,0.01).name('Ry')
        gui.add(obj.rotation, 'z', -Math.PI,Math.PI,0.01).name('Rz')
        obj.position.set(0.51,3.11,-0.79)
        obj.rotation.z = -1.59
        obj.rotation.x = -1.52
        obj.rotation.y = 0.05
        obj.renderOrder = 10
        // obj.scale.set(8,8,8)
        const clock = new THREE.Clock();

        

        function animate() {
            requestAnimationFrame(animate);
        // Rotate the object based on elapsed time
            const t = clock.getElapsedTime();
            obj.rotation.y = 0.05 + Math.sin(t)/2;
            obj.rotation.z = -1.59 + Math.cos(t)/2;

        // Render the scene
            renderer.render(scene, camera);
        }
        playButton.addEventListener('click', ()=>{
            setTimeout(()=>{
                animate();
            },3000)

        })

        

        // // obj.position.z = 5
        // obj.position.y = 10
        // obj.position.x = 1
        //console.log(obj)
        //objectURLs.forEach( ( url ) => URL.revokeObjectURL( url ) )


    }
)

/**
 * bg
 */
const bgGeometry = new THREE.BoxGeometry(5, 5,0.1)
const bgMaterial = new THREE.ShaderMaterial({
    transparent: true,
    side: THREE.DoubleSide,
    uniforms: {
        uAlpha: { value: 1 },  // Alpha 值
        iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }, // 屏幕分辨率
        iTime: { value: 0 }  // 时间，用于动画
    },
    vertexShader: `
        varying vec2 vUv;

        void main() {
            vUv = uv;  // 传递纹理坐标给片元着色器
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform float uAlpha;
        uniform vec2 iResolution;  // 屏幕分辨率
        uniform float iTime;  // 时间，用于动画
        varying vec2 vUv;  // 顶点着色器传递过来的纹理坐标

        void main() {
            // 计算像素坐标
            vec2 fragCoord = vUv * iResolution.xy;
            
            // 归一化坐标
            vec2 st = fragCoord / iResolution.xy;
            st.x -= 0.25;
            st.x *= iResolution.x / iResolution.y;
            
            // 背景颜色
            vec3 color = vec3(0.0);
            float c = 0.0;
            st = st * 2.0 - 1.0;  // 转换为 [-1, 1] 坐标系
            
            c = length(st);  // 计算距离原点的距离
            c -= smoothstep(1.0, 0.5, c);
            c = 1.0 - c;  // 反转

            // 动画效果：根据时间变化
            st = fract(st * 3.0 + iTime);
            st -= 0.5;

            vec4 col = vec4(0.0);
            float d = 0.0;

            for (float i = 0.0; i < 5.0; i++) {
                // 计算波动效果
                d = length(abs(st) - 0.3 - sin(iTime));
                d = pow(d, 2.0 * sin(iTime)); 
                d -= c;

                // 创建颜色变化
                col = vec4(fract(d * 6.0) * 2.0, abs(cos(d)) * 1.2, d, 1.0);
            }

            // 设置片元颜色
            gl_FragColor = vec4(col.rgb, uAlpha);  // 透明度应用
        }
    `
});
const bg = new THREE.Mesh(bgGeometry, bgMaterial)
bg.renderOrder = -1000
bgMaterial.depthTest = true
bgMaterial.depthWrite = true
bg.scale.set(10,10,1)
bg.rotation.x = -0.78
bg.position.z = -5
playButton.addEventListener('click', ()=>{
    setTimeout(()=>{
        scene.add(bg)
    },3000)
    
})




// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 0.75, 0)
controls.enableDamping = true

console.log(overlayMaterial.uniforms.uAlpha)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

let alphaThrehold = 0.1

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    bgMaterial.uniforms.iTime.value = elapsedTime
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // Model animation
    if(mixer)
    {
        mixer.update(deltaTime)
    }

    // Update controls
    controls.update()

    const uAlphaValue = overlayMaterial.uniforms.uAlpha.value

    if (uAlphaValue>alphaThrehold){
        playButton.style.display = 'none'
    }else{
        playButton.style.display = 'block'
    }
    

    // bg.rotation.z = -1.59
    //bg.rotation.x = 1.52
    // bg.rotation.y = 0.05

    //t = elapsedTime

    //console.log(obj)

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()