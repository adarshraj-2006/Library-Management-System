
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Torus, Cylinder, Box, Sphere } from '@react-three/drei';

const Rider = (props) => {
    return (
        <group {...props}>
            {/* Head */}
            <Sphere args={[0.25, 32, 32]} position={[0, 1.7, 0]}>
                <meshStandardMaterial color="#ffe0bd" />
            </Sphere>

            {/* Torso (Blue Uniform) */}
            <Box args={[0.5, 0.7, 0.3]} position={[0, 1.1, 0]}>
                <meshStandardMaterial color="#1E40AF" />
            </Box>

            {/* Arms */}
            <Cylinder args={[0.08, 0.08, 0.7]} position={[-0.35, 1.2, 0.3]} rotation={[0.5, 0, -0.2]}> {/* Reaching for handlebars */}
                <meshStandardMaterial color="#ffe0bd" />
            </Cylinder>
            <Cylinder args={[0.08, 0.08, 0.7]} position={[0.35, 1.2, 0.3]} rotation={[0.5, 0, 0.2]}>
                <meshStandardMaterial color="#ffe0bd" />
            </Cylinder>

            {/* Legs (Dark Blue Pants) */}
            <Cylinder args={[0.1, 0.1, 0.8]} position={[-0.2, 0.4, 0.1]} rotation={[-0.2, 0, 0]}>
                <meshStandardMaterial color="#1E3A8A" />
            </Cylinder>
            <Cylinder args={[0.1, 0.1, 0.8]} position={[0.2, 0.4, 0.1]} rotation={[-0.2, 0, 0]}>
                <meshStandardMaterial color="#1E3A8A" />
            </Cylinder>

            {/* Backpack (Red) */}
            <Box args={[0.4, 0.5, 0.25]} position={[0, 1.2, -0.25]}>
                <meshStandardMaterial color="#EF4444" />
            </Box>
        </group>
    );
};

const Wheel = ({ position }) => {
    const wheelRef = useRef();

    useFrame((state, delta) => {
        if (wheelRef.current) {
            wheelRef.current.rotation.z -= delta * 5; // Rotation on Z axis because cylinders are default Y-up? Wait, torus is complex.
            // Let's just rotate roughly correct. If moving +X, wheels rotate -Z (clockwise if looking from side? No, -Z is confusing in 3D).
            // Actually standard orientation: if moving right (+x), looking from +z, wheels rotate clockwise (negative z rotation).
            wheelRef.current.rotation.z -= delta * 4;
        }
    });

    return (
        <group ref={wheelRef} position={position}>
            {/* Tire */}
            <Torus args={[0.5, 0.1, 16, 32]} rotation={[0, Math.PI / 2, 0]}> {/* Rotate to face side */}
                <meshStandardMaterial color="#333" />
            </Torus>
            {/* Spokes/Hub */}
            <Cylinder args={[0.4, 0.4, 0.05, 8]} rotation={[0, Math.PI / 2, 0]}>
                <meshStandardMaterial color="#ccc" wireframe />
            </Cylinder>
        </group>
    );
};

const Bicycle = (props) => {
    const group = useRef();

    useFrame((state, delta) => {
        if (group.current) {
            // Move bicycle across screen
            group.current.position.x += delta * 2.5;

            // Loop
            if (group.current.position.x > 10) {
                group.current.position.x = -10;
            }

            // Gentle Bobbing
            group.current.position.y = Math.sin(state.clock.elapsedTime * 10) * 0.02;
        }
    });

    return (
        <group ref={group} {...props}>
            {/* Wheels */}
            <Wheel position={[-0.8, 0.5, 0]} />
            <Wheel position={[0.8, 0.5, 0]} />

            {/* Frame (Simple Geometry) */}
            <group position={[0, 0.5, 0]}>
                {/* Bottom Tube */}
                <Cylinder args={[0.04, 0.04, 1.6]} rotation={[0, 0, Math.PI / 2]} position={[0, 0, 0]}>
                    <meshStandardMaterial color="#22c55e" /> {/* Green Bike */}
                </Cylinder>
                {/* Seat Tube */}
                <Cylinder args={[0.04, 0.04, 1.2]} rotation={[0, 0, -0.3]} position={[-0.4, 0.5, 0]}>
                    <meshStandardMaterial color="#22c55e" />
                </Cylinder>
                {/* Handlebar Tube */}
                <Cylinder args={[0.04, 0.04, 1.2]} rotation={[0, 0, 0.3]} position={[0.5, 0.5, 0]}>
                    <meshStandardMaterial color="#22c55e" />
                </Cylinder>

                {/* Handlebars */}
                <Cylinder args={[0.03, 0.03, 0.8]} rotation={[Math.PI / 2, 0, 0]} position={[0.7, 1.1, 0]}>
                    <meshStandardMaterial color="#555" />
                </Cylinder>

                {/* Saddle */}
                <Box args={[0.4, 0.1, 0.3]} position={[-0.4, 1.1, 0]}>
                    <meshStandardMaterial color="#111" />
                </Box>
            </group>

            {/* Rider Positioned on Bike */}
            <Rider position={[-0.4, 0.5, 0]} />
        </group>
    );
};

const BicycleScene = () => {
    return (
        <div style={{ width: '100%', height: '100%', minHeight: '400px', borderRadius: '20px', overflow: 'hidden', background: 'linear-gradient(to bottom, #dbeafe 0%, #eff6ff 100%)' }}>
            <Canvas shadows camera={{ position: [0, 2, 8], fov: 40 }}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[10, 10, 5]} intensity={1} castShadow />

                {/* Road */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
                    <planeGeometry args={[50, 4]} />
                    <meshStandardMaterial color="#94a3b8" />
                </mesh>

                {/* Road Markings */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
                    <planeGeometry args={[50, 0.2]} />
                    <meshStandardMaterial color="#fff" />
                </mesh>

                <Bicycle position={[-10, 0, 0]} />

                {/* Environment - Simple Trees/Clouds could be added here later */}

                <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 2.5} />
            </Canvas>
        </div>
    );
};

export default BicycleScene;
