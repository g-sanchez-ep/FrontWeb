import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import './CarModel.css';

const CarModel = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return;
        const currentMount = mountRef.current;

        // 1. Configuración de la Escena
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        currentMount.appendChild(renderer.domElement);

        // 2. Controles de Órbita
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.enableZoom = false;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.75;
        controls.target.set(0, 0, 0); // Asegura que los controles giren alrededor del centro

        // 3. Iluminación de Estudio
        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 2);
        hemiLight.position.set(0, 20, 0);
        scene.add(hemiLight);
        const dirLight = new THREE.DirectionalLight(0xffffff, 3);
        dirLight.position.set(10, 10, 10);
        scene.add(dirLight);

        // --- 4. POSICIÓN DE LA CÁMARA CORREGIDA ---
        camera.position.set(0, 1.5, 7); // La elevamos un poco
        camera.lookAt(0, 0, 0); // Hacemos que mire ligeramente hacia abajo

        // 5. Cargar el Modelo 3D
        const loader = new GLTFLoader();
        loader.load(
            '/models/car.glb',
            (gltf) => {
                const model = gltf.scene;
                model.scale.set(1.2, 1.2, 1.2);
                // --- POSICIÓN DEL MODELO CORREGIDA ---
                // Centramos el coche verticalmente en su escena
                model.position.y = 0;
                scene.add(model);
            },
            undefined,
            (error) => {
                console.error('An error happened while loading the model:', error);
            }
        );

        // 6. Bucle de Animación
        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        // 7. Limpieza
        const handleResize = () => {
            if (currentMount) {
                camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            if (currentMount) {
                currentMount.removeChild(renderer.domElement);
            }
        };
    }, []);

    return <div ref={mountRef} className="car-model-container"></div>;
};

export default CarModel;
