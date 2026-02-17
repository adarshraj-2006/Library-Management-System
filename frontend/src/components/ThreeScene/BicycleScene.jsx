
import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
    OrbitControls,
    Torus,
    Cylinder,
    Box,
    Sphere,
    Environment,
    ContactShadows,
    PerspectiveCamera,
    Float,
    MeshDistortMaterial
} from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, Noise, ToneMapping } from '@react-three/postprocessing';
import * as THREE from 'three';
import './BicycleScene.css';

// --- Constants ---
const BIKE_SPEED = 2.8; // Slowed down from 5.2
const WHEEL_RADIUS = 0.5;
const CRANK_RADIUS = 0.22;
const THIGH_LEN = 0.58;
const SHIN_LEN = 0.56;

// --- Math Helpers ---
const solveIK = (targetX, targetY, thighLen, shinLen) => {
    const D = Math.sqrt(targetX * targetX + targetY * targetY);
    // Clamp D to prevent NaN
    const clampedD = Math.max(Math.abs(thighLen - shinLen), Math.min(thighLen + shinLen, D));

    const cKnee = (thighLen ** 2 + shinLen ** 2 - clampedD ** 2) / (2 * thighLen * shinLen);
    const kneeAngle = Math.acos(THREE.MathUtils.clamp(cKnee, -1, 1));

    const baseAngle = Math.atan2(targetY, targetX);
    const cThigh = (thighLen ** 2 + clampedD ** 2 - shinLen ** 2) / (2 * thighLen * clampedD);
    const thighOffset = Math.acos(THREE.MathUtils.clamp(cThigh, -1, 1));

    return {
        thigh: -(baseAngle + thighOffset - Math.PI / 2),
        knee: kneeAngle
    };
};

// --- Sub-Components ---

const Tree = ({ position }) => (
    <group position={position}>
        <mesh position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.08, 0.12, 1, 8]} />
            <meshStandardMaterial color="#5C4033" roughness={0.9} />
        </mesh>
        <mesh position={[0, 1.3, 0]}>
            <sphereGeometry args={[0.6, 8, 8]} />
            <meshStandardMaterial color="#22543d" roughness={0.8} />
        </mesh>
    </group>
);

const StudentModel = ({ color = "#2563eb" }) => {
    const chestRef = useRef();
    const neckRef = useRef();
    const hipsRef = useRef();
    const leftThigh = useRef();
    const leftKnee = useRef();
    const rightThigh = useRef();
    const rightKnee = useRef();

    useFrame((state) => {
        const time = state.clock.elapsedTime;
        const pedalSpeed = 8.5;
        const cycle = time * pedalSpeed;

        // 1. Torso Sway & Breath
        if (chestRef.current) {
            chestRef.current.rotation.z = 0.3 + Math.sin(cycle * 2) * 0.04;
            chestRef.current.rotation.y = Math.sin(cycle) * 0.02;
            chestRef.current.position.y = 1.5 + Math.sin(cycle * 2) * 0.01;
        }
        if (neckRef.current) {
            neckRef.current.rotation.z = -0.1 + Math.sin(cycle * 2) * 0.02;
        }

        // 2. Leg IK
        const hipPos = [-0.35, 1.05];
        // Pedals center is [0, 0] in bike space
        const leftAnkle = [Math.cos(cycle) * CRANK_RADIUS, Math.sin(cycle) * CRANK_RADIUS];
        const rightAnkle = [Math.cos(cycle + Math.PI) * CRANK_RADIUS, Math.sin(cycle + Math.PI) * CRANK_RADIUS];

        const leftSol = solveIK(leftAnkle[0] - hipPos[0], leftAnkle[1] - hipPos[1], THIGH_LEN, SHIN_LEN);
        const rightSol = solveIK(rightAnkle[0] - hipPos[0], rightAnkle[1] - hipPos[1], THIGH_LEN, SHIN_LEN);

        if (leftThigh.current) {
            leftThigh.current.rotation.z = leftSol.thigh;
            leftKnee.current.rotation.z = leftSol.knee;
        }
        if (rightThigh.current) {
            rightThigh.current.rotation.z = rightSol.thigh;
            rightKnee.current.rotation.z = rightSol.knee;
        }
    });

    return (
        <group position={[0, -0.1, 0]}>
            <group ref={hipsRef} position={[-0.35, 1.05, 0]}>
                <Box args={[0.35, 0.25, 0.35]}> <meshStandardMaterial color="#1e3a8a" roughness={0.7} /> </Box>
            </group>

            <group ref={chestRef} position={[-0.35, 1.45, 0]}>
                {/* Hoodie / Uniform */}
                <Box args={[0.42, 0.65, 0.38]}> <meshStandardMaterial color={color} roughness={0.8} /> </Box>
                {/* Backpack (Red) */}
                <Box args={[0.25, 0.55, 0.32]} position={[-0.25, 0, 0]}> <meshStandardMaterial color="#dc2626" roughness={0.9} /> </Box>

                {/* Neck & Head */}
                <group ref={neckRef} position={[0.2, 0.45, 0]}>
                    <Cylinder args={[0.06, 0.06, 0.15]} position={[0, -0.05, 0]}> <meshStandardMaterial color="#ffe0bd" /> </Cylinder>
                    <Sphere args={[0.22, 32, 32]} position={[0, 0.2, 0]}> <meshStandardMaterial color="#ffe0bd" roughness={0.4} /> </Sphere>
                    {/* Hair */}
                    <mesh position={[0, 0.25, 0]} scale={[1, 0.9, 1.1]}> <sphereGeometry args={[0.23, 16, 16]} /> <meshStandardMaterial color="#111" /> </mesh>
                </group>

                {/* Arms - Fixed to handlebars */}
                <group position={[0.1, 0.1, 0.3]}>
                    <mesh rotation={[0, 0, -1.05]} position={[0.2, 0, 0]}>
                        <cylinderGeometry args={[0.06, 0.05, 0.7]} />
                        <meshStandardMaterial color="#ffe0bd" />
                    </mesh>
                </group>
                <group position={[0.1, 0.1, -0.3]}>
                    <mesh rotation={[0, 0, -1.05]} position={[0.2, 0, 0]}>
                        <cylinderGeometry args={[0.06, 0.05, 0.7]} />
                        <meshStandardMaterial color="#ffe0bd" />
                    </mesh>
                </group>
            </group>

            {/* Left Leg */}
            <group position={[-0.35, 1.05, 0.25]} ref={leftThigh}>
                <mesh position={[0, -0.25, 0]}> <cylinderGeometry args={[0.1, 0.08, 0.5]} /> <meshStandardMaterial color="#1e3a8a" /> </mesh>
                <group position={[0, -0.5, 0]} ref={leftKnee}>
                    <mesh position={[0, -0.25, 0]}> <cylinderGeometry args={[0.08, 0.07, 0.5]} /> <meshStandardMaterial color="#1e3a8a" /> </mesh>
                    <mesh position={[0.08, -0.5, 0]}> <boxGeometry args={[0.25, 0.08, 0.15]} /> <meshStandardMaterial color="#222" /> </mesh>
                </group>
            </group>

            {/* Right Leg */}
            <group position={[-0.35, 1.05, -0.25]} ref={rightThigh}>
                <mesh position={[0, -0.25, 0]}> <cylinderGeometry args={[0.1, 0.08, 0.5]} /> <meshStandardMaterial color="#1e3a8a" /> </mesh>
                <group position={[0, -0.5, 0]} ref={rightKnee}>
                    <mesh position={[0, -0.25, 0]}> <cylinderGeometry args={[0.08, 0.07, 0.5]} /> <meshStandardMaterial color="#1e3a8a" /> </mesh>
                    <mesh position={[0.08, -0.5, 0]}> <boxGeometry args={[0.25, 0.08, 0.15]} /> <meshStandardMaterial color="#222" /> </mesh>
                </group>
            </group>
        </group>
    );
};

const HighDetailWheel = ({ position, rotationSpeed }) => {
    const ref = useRef();

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.z -= delta * rotationSpeed;
            // Slight Wobble
            ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 20) * 0.002;
        }
    });

    return (
        <group position={position} ref={ref}>
            <Torus args={[0.5, 0.08, 16, 64]} rotation={[0, Math.PI / 2, 0]}> <meshStandardMaterial color="#111" roughness={0.9} /> </Torus>
            <Torus args={[0.46, 0.03, 12, 64]} rotation={[0, Math.PI / 2, 0]}> <meshStandardMaterial color="#888" metalness={0.8} roughness={0.2} /> </Torus>
            {/* 36 Spokes */}
            {Array.from({ length: 18 }).map((_, i) => (
                <mesh key={i} rotation={[0, 0, (i * Math.PI) / 9]}>
                    <cylinderGeometry args={[0.005, 0.005, 0.95]} />
                    <meshStandardMaterial color="#aaa" metalness={0.9} />
                </mesh>
            ))}
            {/* Hub */}
            <Cylinder args={[0.08, 0.08, 0.22]} rotation={[Math.PI / 2, 0, 0]}> <meshStandardMaterial color="#444" metalness={0.8} /> </Cylinder>
            {/* Disc Brake */}
            <Cylinder args={[0.25, 0.25, 0.02]} position={[0, 0, 0.06]} rotation={[Math.PI / 2, 0, 0]}>
                <meshStandardMaterial color="#999" metalness={0.9} wireframe={false} />
            </Cylinder>
        </group>
    );
};

const CinematicBicycle = () => {
    const group = useRef();
    const frameRef = useRef();

    useFrame((state, delta) => {
        if (group.current) {
            // Smooth Horizontal Motion
            group.current.position.x += delta * BIKE_SPEED;
            if (group.current.position.x > 22) group.current.position.x = -22;

            // Natural Lean
            group.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.5) * 0.03;
            group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.02;

            // Suspension Bounce
            if (frameRef.current) {
                frameRef.current.position.y = Math.sin(state.clock.elapsedTime * 10) * 0.015;
            }
        }
    });

    const wheelRotationSpeed = BIKE_SPEED / WHEEL_RADIUS;

    return (
        <group ref={group} position={[-15, 0, 0]}>
            <group ref={frameRef}>
                {/* Frame - Diamond Geometry */}
                <mesh position={[0.15, 0.85, 0]} rotation={[0, 0, 0.8]}>
                    <cylinderGeometry args={[0.05, 0.05, 1.2]} />
                    <meshStandardMaterial color="#f59e0b" metalness={0.8} roughness={0.3} />
                </mesh>
                <mesh position={[0.1, 1.35, 0]} rotation={[0, 0, 1.57]}>
                    <cylinderGeometry args={[0.04, 0.04, 1.1]} />
                    <meshStandardMaterial color="#f59e0b" metalness={0.8} roughness={0.3} />
                </mesh>
                <mesh position={[-0.4, 1, 0]} rotation={[0, 0, -0.2]}>
                    <cylinderGeometry args={[0.045, 0.045, 1.3]} />
                    <meshStandardMaterial color="#f59e0b" metalness={0.8} roughness={0.3} />
                </mesh>
                {/* Front Fork */}
                <group position={[0.8, 0.8, 0]}>
                    <mesh position={[0, 0.1, 0.12]} rotation={[0, 0, -0.3]}> <cylinderGeometry args={[0.04, 0.03, 1.3]} /> <meshStandardMaterial color="#f59e0b" metalness={0.7} /> </mesh>
                    <mesh position={[0, 0.1, -0.12]} rotation={[0, 0, -0.3]}> <cylinderGeometry args={[0.035, 0.025, 1.3]} /> <meshStandardMaterial color="#f59e0b" metalness={0.7} /> </mesh>
                </group>
                {/* Drop Handlebars - Realistic Curved Look */}
                <group position={[0.72, 1.55, 0]}>
                    <mesh position={[0.02, 0.05, 0]}> <cylinderGeometry args={[0.045, 0.045, 0.2]} /> <meshStandardMaterial color="#111" /> </mesh> {/* Stem */}
                    <mesh position={[0.08, 0.1, 0]} rotation={[Math.PI / 2, 0, 0]}> <cylinderGeometry args={[0.025, 0.025, 0.4]} /> <meshStandardMaterial color="#222" metalness={0.8} /> </mesh> {/* Top Bar */}
                    {/* Left Drop */}
                    <group position={[0.08, 0.1, 0.2]}>
                        <mesh position={[0.1, -0.1, 0]} rotation={[0, 1.57, 0]}> <cylinderGeometry args={[0.025, 0.025, 0.2]} /> <meshStandardMaterial color="#222" /> </mesh>
                        <mesh position={[0.2, -0.25, 0]} rotation={[0, 1.57, 0]}><cylinderGeometry args={[0.025, 0.025, 0.3]} /> <meshStandardMaterial color="#222" /></mesh>
                    </group>
                    {/* Right Drop */}
                    <group position={[0.08, 0.1, -0.2]}>
                        <mesh position={[0.1, -0.1, 0]} rotation={[0, 1.57, 0]}> <cylinderGeometry args={[0.025, 0.025, 0.2]} /> <meshStandardMaterial color="#222" /> </mesh>
                        <mesh position={[0.2, -0.25, 0]} rotation={[0, 1.57, 0]}><cylinderGeometry args={[0.025, 0.025, 0.3]} /> <meshStandardMaterial color="#222" /></mesh>
                    </group>
                </group>

                {/* Drive Chain */}
                <mesh position={[0, 0.5, 0.08]} rotation={[0, 0, 1.57]}>
                    <cylinderGeometry args={[0.015, 0.015, 0.8]} />
                    <meshStandardMaterial color="#444" metalness={0.8} />
                </mesh>
                {/* Saddle */}
                <Box args={[0.35, 0.08, 0.22]} position={[-0.48, 1.62, 0]} rotation={[0, 0, 0.1]}> <meshStandardMaterial color="#111" roughness={1} /> </Box>

                {/* Student */}
                <StudentModel />

                {/* Pedals / Crankset */}
                <group position={[-0.35, 0.5, 0]}>
                    <Cylinder args={[0.15, 0.15, 0.08]} rotation={[Math.PI / 2, 0, 0]}> <meshStandardMaterial color="#222" metalness={0.9} /> </Cylinder>
                    {/* Simplified Pedaling Animation */}
                    <group rotation={[0, 0, -6 * (Date.now() / 1000)]}>
                        <Cylinder args={[0.02, 0.02, 0.5]} position={[0, 0.25, 0]}> <meshStandardMaterial color="#555" /> </Cylinder>
                        <Box args={[0.2, 0.05, 0.25]} position={[0, 0.5, 0]}> <meshStandardMaterial color="#333" /> </Box>
                    </group>
                </group>

                {/* High Detail Wheels */}
                <HighDetailWheel position={[-0.8, 0.5, 0]} rotationSpeed={wheelRotationSpeed} />
                <HighDetailWheel position={[1, 0.5, 0]} rotationSpeed={wheelRotationSpeed} />

                {/* Shadow Blob for grounding */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} scale={[2, 1, 1]}>
                    <circleGeometry args={[1.2, 32]} />
                    <meshBasicMaterial color="#000" opacity={0.15} transparent />
                </mesh>
            </group>
        </group>
    );
};

const CinematicCamera = () => {
    const { camera } = useThree();
    const vec = new THREE.Vector3();
    const targetVec = new THREE.Vector3();

    useFrame((state) => {
        // Track the imaginary center of the bike (roughly at 0, 1, 0 plus its current X offset)
        // Bike moves on X, starts at -15.
        const bikeX = (state.clock.elapsedTime * BIKE_SPEED - 15) % 44 - 22; // Approximation of bike's X

        // Target Camera Position (Side Tracking with Parallax)
        targetVec.set(bikeX + 1, 1.8, 7.5);
        camera.position.lerp(targetVec, 0.05);

        // Look slightly ahead of the bike
        vec.set(bikeX + 2, 1.2, 0);
        camera.lookAt(vec);
    });
    return null;
};

const CinematicScene = () => {
    return (
        <group>
            <ambientLight intensity={0.4} />
            <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={35} />
            <CinematicCamera />

            {/* Cinematic Lighting */}
            <directionalLight
                position={[10, 20, 10]}
                intensity={1.8}
                castShadow
                shadow-mapSize={[2048, 2048]}
                shadow-camera-far={50}
                shadow-camera-left={-25}
                shadow-camera-right={25}
                shadow-camera-top={25}
                shadow-camera-bottom={-25}
            />
            <pointLight position={[-10, 5, 20]} intensity={1} color="#7dd3fc" />

            <CinematicBicycle />

            {/* Environment & Ground */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
                <planeGeometry args={[200, 40]} />
                <meshStandardMaterial color="#334155" roughness={0.8} />
            </mesh>

            {/* Road Details (Stripes) */}
            {Array.from({ length: 40 }).map((_, i) => (
                <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[-100 + (i * 10), 0.01, 0]}>
                    <planeGeometry args={[4, 0.25]} />
                    <meshStandardMaterial color="#fff" opacity={0.4} transparent />
                </mesh>
            ))}

            <ContactShadows
                position={[0, 0, 0]}
                opacity={0.4}
                scale={100}
                blur={2}
                far={10}
                resolution={1024}
                color="#000000"
            />

            <Environment preset="city" />
        </group>
    );
};

const BicycleScene = () => {
    return (
        <div className="bicycle-scene-wrapper simple-mode">
            <Canvas shadows className="bicycle-canvas" gl={{ antialias: true, physicallyCorrectLights: true }}>
                <color attach="background" args={['#F8FAFC']} />
                <CinematicScene />
            </Canvas>
        </div>
    );
};

export default BicycleScene;
