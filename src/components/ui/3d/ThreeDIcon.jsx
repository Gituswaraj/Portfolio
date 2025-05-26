'use client';

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Text,
  Box as DreiBox,
  Sphere,
  Torus,
  Cylinder,
  Cone,
  Plane,
  Circle,
  Ring,
  Tetrahedron,
  Octahedron,
  Dodecahedron,
  Icosahedron,
  Capsule,
  TorusKnot,
  Lathe,
  Tube,
  useContextBridge
} from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

// 3D shape that represents a skill icon
const IconShape = ({ shape = 'box', color = '#4285F4', hoverColor = '#5C9CFF' }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime()) * 0.3;
      meshRef.current.rotation.y += 0.01;
    }
  });

  const renderShape = () => {
    switch (shape.toLowerCase()) {
      case 'sphere':
        return <Sphere ref={meshRef} args={[1, 32, 32]} />;
      case 'torus':
        return <Torus ref={meshRef} args={[0.7, 0.3, 16, 32]} />;
      case 'cylinder':
        return <Cylinder ref={meshRef} args={[1, 1, 2, 32]} />;
      case 'cone':
        return <Cone ref={meshRef} args={[1, 2, 32]} />;
      case 'box':
        return <DreiBox ref={meshRef} args={[1.5, 1.5, 1.5]} />;
      case 'plane':
        return <Plane ref={meshRef} args={[5, 5]} />;
      case 'circle':
        return <Circle ref={meshRef} args={[1, 32]} />;
      case 'ring':
        return <Ring ref={meshRef} args={[0.5, 1, 32]} />;
      case 'tetrahedron':
        return <Tetrahedron ref={meshRef} args={[1, 0]} />;
      case 'octahedron':
        return <Octahedron ref={meshRef} args={[1, 0]} />;
      case 'dodecahedron':
        return <Dodecahedron ref={meshRef} args={[1, 0]} />;
      case 'icosahedron':
        return <Icosahedron ref={meshRef} args={[1, 0]} />;
      case 'capsule':
        return <Capsule ref={meshRef} args={[0.5, 1, 4, 8]} />;
      case 'torusknot':
        return <TorusKnot ref={meshRef} args={[0.6, 0.2, 100, 16]} />;
      case 'lathe':
        return (
          <Lathe
            ref={meshRef}
            args={[
              [...Array(10)].map(
                (_, i) =>
                  new THREE.Vector2(Math.sin(i * 0.2) * 0.5 + 0.5, (i - 5) * 0.2)
              ),
              32,
            ]}
          />
        );
      case 'tube':
        return (
          <Tube
            ref={meshRef}
            args={[
              new THREE.CurvePath().add(
                new THREE.CatmullRomCurve3([
                  new THREE.Vector3(-2, 0, 0),
                  new THREE.Vector3(0, 2, 0),
                  new THREE.Vector3(2, 0, 0),
                ])
              ),
              64,
              0.1,
              8,
              false,
            ]}
          />
        );
      case 'triangle':
        return (
          <mesh ref={meshRef}>
            <bufferGeometry attach="geometry">
              <bufferAttribute
                attach="attributes-position"
                count={3}
                array={new Float32Array([
                  0, 1, 0,
                  -1, -1, 0,
                  1, -1, 0
                ])}
                itemSize={3}
              />
            </bufferGeometry>
            <meshStandardMaterial color="orange" />
          </mesh>
        );
      default:
        return <DreiBox ref={meshRef} args={[1.5, 1.5, 1.5]} />;
    }
  };

  return (
    <mesh
      onPointerOver={() => {
        document.body.style.cursor = 'pointer';
        if (meshRef.current) {
          meshRef.current.material.color.set(hoverColor);
        }
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto';
        if (meshRef.current) {
          meshRef.current.material.color.set(color);
        }
      }}
    >
      {renderShape()}
      <meshStandardMaterial color={color} metalness={0.5} roughness={0.2} />
    </mesh>
  );
};

// Main component that wraps the 3D icon in a Canvas
const ThreeDIcon = ({
  shape = 'box',
  color = '#4285F4',
  hoverColor = '#5C9CFF',
  size = 100,
  className = '',
  skill = ''
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Set client-side flag
  useEffect(() => {
    setIsClient(true);
    
    // Preload Three.js resources
    const preloadThreeResources = async () => {
      try {
        // Force Three.js to initialize
        new THREE.Scene();
        // Wait a moment to ensure resources are loaded
        setTimeout(() => setIsLoaded(true), 100);
      } catch (error) {
        console.error('Error preloading Three.js resources:', error);
        // Still set as loaded even if there's an error
        setIsLoaded(true);
      }
    };
    
    preloadThreeResources();
  }, []);

  if (!isClient) {
    return (
      <div 
        className={`w-${size} h-${size} ${className} bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center`}
        style={{ width: size, height: size }}
      >
        <div className="text-sm text-gray-500 dark:text-gray-400">{skill}</div>
      </div>
    );
  }

  return (
    <motion.div
      className={`w-${size} h-${size} ${className}`}
      style={{ width: size, height: size }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.8 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.1 }}
    >
      {isLoaded && (
        <Canvas 
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={[1, 2]} // Limit pixel ratio for better performance
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <IconShape shape={shape} color={color} hoverColor={hoverColor} />
        </Canvas>
      )}
    </motion.div>
  );
};

// Map skill names to shapes and colors
export const getSkillIconProps = (skillName) => {
  const skillMap = {
    'Java': { shape: 'lathe', color: '#f89820', hoverColor: '#ffac33' },
    'C++': { shape: 'box', color: '#044F88', hoverColor: '#0A6BBD' },
    'JavaScript': { shape: 'sphere', color: '#F7DF1E', hoverColor: '#FFF04D' },
    'React.js': { shape: 'torusknot', color: '#61DAFB', hoverColor: '#8AE7FF' },
    'Next.js': { shape: 'tube', color: '#000000', hoverColor: '#333333' },
    'Data Structures': { shape: 'tetrahedron', color: '#9C27B0', hoverColor: '#BA68C8' },
    'Team Collaboration': { shape: 'octahedron', color: '#4CAF50', hoverColor: '#81C784' },
    'Problem Solving': { shape: 'cone', color: '#FF5722', hoverColor: '#FF8A65' },
    'Analytical Thinking': { shape: 'icosahedron', color: '#2196F3', hoverColor: '#64B5F6' },
  };

  return skillMap[skillName] || { shape: 'box', color: '#4285F4', hoverColor: '#5C9CFF' };
};

export default ThreeDIcon;
