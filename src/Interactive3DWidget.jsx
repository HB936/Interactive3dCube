import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';

const Interactive3DWidget = () => {
    const mountRef = useRef(null);
    const sceneRef = useRef(null);
    const rendererRef = useRef(null);
    const cubeRef = useRef(null);
    const frameRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const rotationSpeedRef = useRef(0.01);

    const [isLoading, setIsLoading] = useState(true);
    const [rotationSpeed, setRotationSpeed] = useState(0.01);
    const [webglSupported, setWebglSupported] = useState(true);

    // Check WebGL support
    const checkWebGLSupport = useCallback(() => {
        try {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            return !!context;
        } catch (e) {
            return false;
        }
    }, []);

    // Mouse movement handler
    const handleMouseMove = useCallback((event) => {
        const rect = mountRef.current?.getBoundingClientRect();
        if (rect) {
            mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        }
    }, []);

    // Initialize Three.js scene
    useEffect(() => {
        if (!checkWebGLSupport()) {
            setWebglSupported(false);
            setIsLoading(false);
            return;
        }

        const container = mountRef.current;
        if (!container) return;

        // Scene setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0f0f0f);
        sceneRef.current = scene;

        // Camera setup
        const camera = new THREE.PerspectiveCamera(
            75,
            container.clientWidth / container.clientHeight,
            0.1,
            1000
        );
        camera.position.z = 4;
        // camera.position.x = -0.5;

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        rendererRef.current = renderer;

        container.appendChild(renderer.domElement);

        // Geometry and Material
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        // Create metallic material
        const material = new THREE.MeshStandardMaterial({
            color: 0x4f46e5,
            metalness: 0.8,
            roughness: 0.2,
            envMapIntensity: 1.0
        });

        // Add environment map for reflections
        const loader = new THREE.CubeTextureLoader();
        const envMap = loader.load([
            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojNjY2NjY2O3N0b3Atb3BhY2l0eToxIiAvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNhYWFhYWE7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgZmlsbD0idXJsKCNncmFkaWVudCkiLz4KPC9zdmc+',
            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojNjY2NjY2O3N0b3Atb3BhY2l0eToxIiAvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNhYWFhYWE7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgZmlsbD0idXJsKCNncmFkaWVudCkiLz4KPC9zdmc+',
            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojOTk5OTk5O3N0b3Atb3BhY2l0eToxIiAvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNkZGRkZGQ7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgZmlsbD0idXJsKCNncmFkaWVudCkiLz4KPC9zdmc+',
            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojNzc3Nzc3O3N0b3Atb3BhY2l0eToxIiAvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNiYmJiYmI7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgZmlsbD0idXJsKCNncmFkaWVudCkiLz4KPC9zdmc+',
            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojODg4ODg4O3N0b3Atb3BhY2l0eToxIiAvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNjY2NjY2M7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgZmlsbD0idXJsKCNncmFkaWVudCkiLz4KPC9zdmc+',
            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojNTU1NTU1O3N0b3Atb3BhY2l0eToxIiAvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM5OTk5OTk7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgZmlsbD0idXJsKCNncmFkaWVudCkiLz4KPC9zdmc+'
        ]);

        material.envMap = envMap;

        // Create cube with rounded edges effect
        const cube = new THREE.Mesh(geometry, material);
        cube.castShadow = true;
        cube.receiveShadow = true;
        cubeRef.current = cube;
        scene.add(cube);

        // Lighting setup
        const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 500;
        scene.add(directionalLight);

        // Additional accent lighting
        const pointLight = new THREE.PointLight(0x8b5cf6, 0.5, 100);
        pointLight.position.set(-5, -5, 5);
        scene.add(pointLight);

        // Ground plane for shadows
        const planeGeometry = new THREE.PlaneGeometry(20, 20);
        const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.2 });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = -Math.PI / 2;
        plane.position.y = -2;
        plane.receiveShadow = true;
        scene.add(plane);

        // Animation loop
        const animate = () => {
            frameRef.current = requestAnimationFrame(animate);

            if (cubeRef.current) {
                // Continuous Y-axis rotation
                cubeRef.current.rotation.y += rotationSpeedRef.current;

                // Mouse interaction - subtle tilting
                const targetRotationX = mouseRef.current.y * 0.2;
                const targetRotationZ = mouseRef.current.x * 0.2;

                cubeRef.current.rotation.x += (targetRotationX - cubeRef.current.rotation.x) * 0.05;
                cubeRef.current.rotation.z += (targetRotationZ - cubeRef.current.rotation.z) * 0.05;
            }

            renderer.render(scene, camera);
        };

        // Handle resize
        const handleResize = () => {
            if (container && camera && renderer) {
                camera.aspect = container.clientWidth / container.clientHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(container.clientWidth, container.clientHeight);
            }
        };

        window.addEventListener('resize', handleResize);
        container.addEventListener('mousemove', handleMouseMove);

        // Start animation after short delay to show loading
        setTimeout(() => {
            setIsLoading(false);
            animate();
        }, 800);

        // Cleanup
        return () => {
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }
            window.removeEventListener('resize', handleResize);
            container?.removeEventListener('mousemove', handleMouseMove);

            if (container && renderer.domElement) {
                container.removeChild(renderer.domElement);
            }

            // Dispose of Three.js resources
            geometry?.dispose();
            material?.dispose();
            renderer?.dispose();
        };
    }, [checkWebGLSupport, handleMouseMove]);

    // Update rotation speed
    useEffect(() => {
        rotationSpeedRef.current = rotationSpeed;
    }, [rotationSpeed]);

    // Loading spinner component
    const LoadingSpinner = () => (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm">
            <div className="flex flex-col items-center space-y-4">
                <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-white text-sm font-medium">Initializing 3D Experience...</p>
            </div>
        </div>
    );

    // WebGL not supported fallback
    const WebGLFallback = () => (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
            <div className="text-center p-8">
                <div className="w-24 h-24 mx-auto mb-6 bg-indigo-500 rounded-lg flex items-center justify-center">
                    <div className="w-16 h-16 border-4 border-white rounded-lg transform rotate-45"></div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">3D Not Supported</h3>
                <p className="text-gray-300 text-sm">Your browser doesn't support WebGL</p>
            </div>
        </div>
    );

    return (
        <div className="max-w-[1200px] h-vh mx-auto p-6 bg-white rounded-xl shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Interactive 3D Widget
            </h2>

            {/* 3D Canvas Container */}
            <div className="relative w-full h-96 bg-black rounded-lg overflow-hidden shadow-inner border-2 border-gray-200">
                <div ref={mountRef} className="w-full h-full" />

                {isLoading && <LoadingSpinner />}
                {!webglSupported && <WebGLFallback />}

                {/* Hover instruction */}
                {!isLoading && webglSupported && (
                    <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white text-xs px-3 py-2 rounded-full backdrop-blur-sm">
                        Move your mouse to interact
                    </div>
                )}
            </div>

            {/* Controls */}
            {webglSupported && (
                <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700">
                            Rotation Speed
                        </label>
                        <span className="text-xs text-gray-500">
                            {(rotationSpeed * 100).toFixed(1)}%
                        </span>
                    </div>

                    <div className="flex items-center space-x-4">
                        <span className="text-xs text-gray-400">Slow</span>
                        <input
                            type="range"
                            min="0"
                            max="0.05"
                            step="0.001"
                            value={rotationSpeed}
                            onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
                            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
                        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 
                        [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-indigo-500 
                        [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer
                        [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:transition-all
                        [&::-webkit-slider-thumb]:hover:bg-indigo-600 [&::-webkit-slider-thumb]:hover:scale-110"
                        />
                        <span className="text-xs text-gray-400">Fast</span>
                    </div>

                    <div className="flex justify-center space-x-3 pt-2">
                        <button
                            onClick={() => setRotationSpeed(0)}
                            className="px-4 py-2 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            Stop
                        </button>
                        <button
                            onClick={() => setRotationSpeed(0.01)}
                            className="px-4 py-2 text-xs font-medium text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 transition-colors"
                        >
                            Normal
                        </button>
                        <button
                            onClick={() => setRotationSpeed(0.03)}
                            className="px-4 py-2 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            Fast
                        </button>
                    </div>
                </div>
            )}

            {/* Info Panel */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-800 mb-2">Features</h3>
                <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Continuous Y-axis rotation</li>
                    <li>• Mouse interaction with subtle tilting</li>
                    <li>• Dynamic shadows and realistic lighting</li>
                    <li>• Responsive design with WebGL fallback</li>
                    <li>• Adjustable rotation speed controls</li>
                </ul>
            </div>
        </div>
    );
};

export default Interactive3DWidget;